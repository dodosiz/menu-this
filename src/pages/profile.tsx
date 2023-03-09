import { Auth } from "@supabase/auth-ui-react";
import {
  Avatar,
  Box,
  Button,
  Container,
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
import { CategoryProductCount, UserStatus } from "@/lib/data/user";
import { LeaveAlert } from "@/components/commons/leave-alert";
import { Notification } from "@/components/commons/notification";
import { LoadingPage } from "@/components/commons/loadingPage";
import { supabase } from "@/lib/core/supabase";
import { Router, useRouter } from "next/router";
import { RiDeleteBin6Line, RiLockPasswordFill } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { TiCancel } from "react-icons/ti";
import styles from "@/styles/profile.module.css";
import { CATEGORY_LIMIT, PRODUCT_LIMIT } from "@/constants";

export default function Profile() {
  const { user } = Auth.useUser();
  const [deletionRequested, setDeletionRequested] = useState(false);
  const [categoryProductCount, setCategoryProductCount] =
    useState<CategoryProductCount>({});
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showCancelDeleteNotification, setShowCancelDeleteNotification] =
    useState(false);
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
      fetch(`/api/user/${user.id}`)
        .then((res) => res.json())
        .then((data: UserStatus) => {
          setDeletionRequested(data.requested);
          setCategoryProductCount(data.categoryProductCount);
          setLoading(false);
        })
        .catch(() => {
          setErrorMessage("Internal server error");
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

  async function handleDeleteUser(userId: string) {
    const JSONdata = JSON.stringify({ id: userId });
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setShowDeleteUserConfirm(false);
    const response = await fetch("/api/user/request-delete", options);
    if (response.status === 200) {
      setDeletionRequested(true);
      setShowDeleteNotification(true);
    }
  }

  async function handleCancelDeleteUser(userId: string) {
    const JSONdata = JSON.stringify({ id: userId });
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch("/api/user/cancel-delete", options);
    if (response.status === 200) {
      setDeletionRequested(false);
      setShowCancelDeleteNotification(true);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/api/logout");
  }

  return (
    <Layout user={user}>
      <>
        {(isLoading || isRouteLoading) && <LoadingPage fullHeight={true} />}
        {!user && !isLoading && !isRouteLoading && <UnauthorizedPage />}
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
                  color={deletionRequested ? "teal.500" : "red.500"}
                  variant="outline"
                  leftIcon={
                    deletionRequested ? <TiCancel /> : <RiDeleteBin6Line />
                  }
                  onClick={() => {
                    if (deletionRequested) {
                      handleCancelDeleteUser(user.id);
                    } else {
                      setShowDeleteUserConfirm(true);
                    }
                  }}
                >
                  {deletionRequested
                    ? "Cancel delete profile request"
                    : "Request delete profile"}
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
            title="Request delete profile"
            confirmMessage="Are you sure you want to request a profile deletion?"
            isOpen={showDeleteUserConfirm}
            onClose={() => setShowDeleteUserConfirm(false)}
            onConfirm={() => {
              handleDeleteUser(user.id);
            }}
          />
        )}
        {showDeleteNotification && user && (
          <Notification
            status="info"
            message="Your profile will be deleted in the next hours, you can change your decission anytime before."
            onClose={() => setShowDeleteNotification(false)}
          />
        )}
        {showCancelDeleteNotification && user && (
          <Notification
            status="info"
            message="The profile deletion has been canceled, we are happy to have you back!"
            onClose={() => setShowCancelDeleteNotification(false)}
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
