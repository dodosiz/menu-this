import { Layout } from "@/components/commons/layout";
import { Heading } from "@chakra-ui/react";
import styles from "@/styles/home.module.css";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { LoadingPage } from "@/components/commons/loadingPage";
import { auth } from "@/lib/config/firebase";
import { Notification } from "@/components/commons/notification";
import { CategoryProductCount, UserStatus } from "@/lib/data/user";
import { Suggestion } from "@/components/commons/suggestion";
import { UnauthorizedPage } from "@/components/commons/unauthorizedPage";

export default function Home() {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const [showVerificationInfo, setShowVerificationInfo] = useState(false);
  const [categoryProductCount, setCategoryProductCount] =
    useState<CategoryProductCount>({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setShowVerificationInfo(!user.emailVerified);
      if (user.emailVerified) {
        setLoading(true);
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
    }
  }, [user]);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      setLoading(false);
    });
  });

  function greeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  return (
    <Layout user={user}>
      <>
        {isLoading && <LoadingPage fullHeight={true} />}
        {!isLoading && !user && <UnauthorizedPage />}
        {!isLoading && user && !user.emailVerified && (
          <>
            <div className={styles.banner}>
              <Heading size="xl" className={styles.banner_header} as="h1">
                <span className={styles.coloured}>
                  Please verify your email address.
                </span>
              </Heading>
            </div>
          </>
        )}
        {!isLoading && user && (
          <>
            <div className={styles.banner}>
              <Heading size="xl" className={styles.banner_header} as="h1">
                <span className={styles.coloured}>{greeting()}</span>
              </Heading>
              <Suggestion data={categoryProductCount} />
            </div>
          </>
        )}
        {user && !user.emailVerified && showVerificationInfo && (
          <Notification
            status="info"
            message="Please verify your email address"
            onClose={() => setShowVerificationInfo(false)}
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
