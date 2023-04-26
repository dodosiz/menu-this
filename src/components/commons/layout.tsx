import Head from "next/head";
import styles from "@/styles/components/commons/layout.module.css";
import NextLink from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  IconButton,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { ConfirmDialog } from "./confirm-dialog";
import { User } from "firebase/auth";
import { ProfileItems } from "./profileItems";
import { ActionItems } from "./actionItems";

interface LayoutProps {
  children: React.ReactElement;
  user: User | null;
  unsavedChanges?: boolean;
  discardUnsavedChanges?: () => void;
  confirmMessage?: string;
}

export function Layout({
  children,
  user,
  confirmMessage,
  unsavedChanges,
  discardUnsavedChanges,
}: LayoutProps) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nextRoute, setNextRoute] = useState("");
  function routeWithConfirm(route: string) {
    if (unsavedChanges) {
      setShowConfirm(true);
      setNextRoute(route);
    } else {
      router.push(route);
    }
  }
  return (
    <>
      <Head>
        <title>Deinlog</title>
        <meta
          name="description"
          content="Create the online menu for your business"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navigation}>
        <div className="logo">
          <Link
            as={NextLink}
            onClick={(e) => {
              e.preventDefault();
              routeWithConfirm("/");
            }}
            href="/"
          >
            DEINLOG
          </Link>
        </div>
        <div className={styles.desktop_menu}>
          <ProfileItems user={user} routeWithConfirm={routeWithConfirm} />
        </div>
        <div className={styles.mobile_menu}>
          <IconButton
            color="#f5f4f3"
            variant="outline"
            size="sm"
            aria-label="mobile menu"
            icon={<RxHamburgerMenu />}
            onClick={() => setOpen(true)}
          />
          <Drawer onClose={() => setOpen(false)} isOpen={isOpen} size="xl">
            <DrawerOverlay />
            <DrawerContent className={styles.drawer_mobile}>
              <DrawerCloseButton color="#f5f4f3" />
              <DrawerHeader
                fontSize="1.5em"
                textAlign="center"
                className="logo"
              >
                <Link onClick={() => setOpen(false)} as={NextLink} href="/">
                  DEINLOG
                </Link>
              </DrawerHeader>
              <DrawerBody className={styles.drawer_body}>
                {user && (
                  <ActionItems
                    routeWithConfirm={routeWithConfirm}
                    setOpen={setOpen}
                  />
                )}
                <ProfileItems
                  setOpen={setOpen}
                  user={user}
                  routeWithConfirm={routeWithConfirm}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
      {showConfirm && (
        <ConfirmDialog
          title="Unsaved changes"
          confirmMessage={confirmMessage ?? ""}
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            discardUnsavedChanges?.();
            router.push(nextRoute);
          }}
        />
      )}
      <Grid templateColumns="repeat(9, 1fr)" gap={4}>
        {user && (
          <GridItem colSpan={{ base: 0, md: 1 }} className={styles.sidebar}>
            <VStack alignItems="baseline" className={styles.sidebar_items}>
              <ActionItems
                routeWithConfirm={routeWithConfirm}
                setOpen={setOpen}
              />
            </VStack>
          </GridItem>
        )}
        <GridItem colSpan={{ base: 9, md: 8 }}>
          <main className={styles.main}>{children}</main>
        </GridItem>
      </Grid>
      <footer className={styles.footer}>
        <p className={styles.footer_item}>
          <Link
            as={NextLink}
            className={styles.footer_item}
            onClick={(e) => {
              e.preventDefault();
              setOpen?.(false);
              routeWithConfirm("/privacyPolicy");
            }}
            href="/privacyPolicy"
          >
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link
            as={NextLink}
            className={styles.footer_item}
            onClick={(e) => {
              e.preventDefault();
              setOpen?.(false);
              routeWithConfirm("/cookiePolicy");
            }}
            href="/cookiePolicy"
          >
            Cookie Policy
          </Link>
        </p>
        <p>&copy; {new Date().getFullYear()} Theodosios Asvestopoulos</p>
      </footer>
    </>
  );
}
