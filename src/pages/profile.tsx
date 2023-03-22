import {
  Avatar,
  Button,
  Grid,
  GridItem,
  Heading,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layout } from "@/components/commons/layout";
import { UnauthorizedPage } from "@/components/commons/unauthorizedPage";
import { useEffect, useState } from "react";
import {
  CategoryProductCount,
  deleteUserData,
  UserStatus,
} from "@/lib/data/user";
import { LeaveAlert } from "@/components/commons/leave-alert";
import { Notification } from "@/components/commons/notification";
import { LoadingPage } from "@/components/commons/loadingPage";
import { Router, useRouter } from "next/router";
import { RiDeleteBin6Line, RiLockPasswordFill } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import styles from "@/styles/profile.module.css";
import { CATEGORY_LIMIT, PRODUCT_LIMIT } from "@/constants";
import { auth } from "@/lib/config/firebase";
import { deleteUser } from "firebase/auth";

export default function Profile() {
  const user = auth.currentUser;
  const [categoryProductCount, setCategoryProductCount] =
    useState<CategoryProductCount>({});
  const [showDeleteUserConfirm, setShowDeleteUserConfirm] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isRouteLoading, setRouteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  function getNumberOfCategories() {
    return Object.keys(categoryProductCount).length;
  }

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch(`/api/user/${user.uid}`)
        .then((res) => res.json())
        .then((data: UserStatus) => {
          setCategoryProductCount(data.categoryProductCount);
          setLoading(false);
        })
        .catch(() => {
          setErrorMessage("Failed to fetch user data");
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setRouteLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setRouteLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      setRouteLoading(false);
    });
  });

  async function handleDeleteUser() {
    if (!user) {
      setErrorMessage("User is undefined");
      return;
    }
    setShowDeleteUserConfirm(false);
    setLoading(true);
    try {
      await deleteUserData(user.uid);
      await deleteUser(user);
      setLoading(false);
    } catch {
      setErrorMessage("Failed to delete user, try to log in again");
      setLoading(false);
    }
  }

  async function handleLogout() {
    await auth.signOut();
    router.push("/api/logout");
  }

  return (
    <Layout user={user}>
      <>
        {(isLoading || isRouteLoading) && <LoadingPage fullHeight={true} />}
        {(!user || !user.emailVerified) && !isLoading && !isRouteLoading && (
          <UnauthorizedPage />
        )}
        {user && !isLoading && !isRouteLoading && (
          <Grid templateColumns="repeat(6, 1fr)" gap={4}>
            <GridItem className={styles.grid_item} colSpan={{ base: 6, md: 2 }}>
              <Stack spacing={2}>
                <Avatar alignSelf="center" size="xl" bg="teal.500" />
                <Text>
                  Logged in as: <Text as="i">{user.email}</Text>
                </Text>
                <Button
                  width="100%"
                  color="red.500"
                  variant="outline"
                  leftIcon={<RiDeleteBin6Line />}
                  onClick={() => {
                    setShowDeleteUserConfirm(true);
                  }}
                >
                  Delete User
                </Button>
                <Button
                  width="100%"
                  color="teal"
                  variant="outline"
                  leftIcon={<RiLockPasswordFill />}
                  onClick={() => router.push("/updateUser")}
                >
                  Change Password
                </Button>
                <Button
                  width="100%"
                  color="teal"
                  variant="outline"
                  leftIcon={<GoSignOut />}
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </Stack>
            </GridItem>
            <GridItem className={styles.grid_item} colSpan={{ base: 6, md: 4 }}>
              <Heading className={styles.heading} size="xl" as="h1">
                Profile data
              </Heading>
              <Stack gap={1} marginTop={5}>
                <Progress
                  colorScheme="teal"
                  size="lg"
                  value={(getNumberOfCategories() / CATEGORY_LIMIT) * 100}
                />
                <Text fontSize="sm">{`Categories created: ${getNumberOfCategories()} out of ${CATEGORY_LIMIT}`}</Text>
              </Stack>
              {Object.keys(categoryProductCount).map((categoryId) => {
                return (
                  <Stack key={categoryId} gap={1} marginTop={5}>
                    <Progress
                      colorScheme="teal"
                      size="lg"
                      value={
                        (categoryProductCount[categoryId].count /
                          PRODUCT_LIMIT) *
                        100
                      }
                    />
                    <Text fontSize="sm">
                      {`Products created for category "${categoryProductCount[categoryId].title}": ${categoryProductCount[categoryId].count} out of ${PRODUCT_LIMIT}`}
                    </Text>
                  </Stack>
                );
              })}
            </GridItem>
          </Grid>
        )}
        {showDeleteUserConfirm && user && (
          <LeaveAlert
            title="Delete Profile"
            confirmMessage="Are you sure you want to delete your profile? All your data will be lost."
            isOpen={showDeleteUserConfirm}
            onClose={() => setShowDeleteUserConfirm(false)}
            onConfirm={() => {
              handleDeleteUser();
            }}
          />
        )}
        {!!errorMessage.length && (
          <Notification
            status="error"
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
      </>
    </Layout>
  );
}
