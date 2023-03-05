import { Auth } from "@supabase/auth-ui-react";
import { Avatar, Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import { Layout } from "@/components/commons/layout";
import { UnauthorizedPage } from "@/components/commons/unauthorizedPage";
import { useEffect, useState } from "react";
import { UserStatus } from "@/lib/data/user";
import { LeaveAlert } from "@/components/commons/leave-alert";
import { Notification } from "@/components/commons/notification";
import { LoadingPage } from "@/components/commons/loadingPage";
import { supabase } from "@/lib/core/supabase";
import { useRouter } from "next/router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { TiCancel } from "react-icons/ti";
import styles from "@/styles/profile.module.css";

export default function Profile() {
  const { user } = Auth.useUser();
  const [deletionRequested, setDeletionRequested] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showCancelDeleteNotification, setShowCancelDeleteNotification] =
    useState(false);
  const [showDeleteUserConfirm, setShowDeleteUserConfirm] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch(`/api/user/${user.id}`)
        .then((res) => res.json())
        .then((data: UserStatus) => {
          setDeletionRequested(data.requested);
          setLoading(false);
        })
        .catch(() => {
          setErrorMessage("Internal server error");
          setLoading(false);
        });
    }
  }, [user]);

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
        <Container>
          {isLoading && <LoadingPage fullHeight={true} />}
          {!user && !isLoading && <UnauthorizedPage />}
          {user && !isLoading && (
            <Box className={styles.profile_page}>
              <Avatar bg="teal.500" />
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
                color="grey"
                variant="outline"
                leftIcon={<GoSignOut />}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Box>
          )}
        </Container>
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
