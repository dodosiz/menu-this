import Head from "next/head";
import styles from "@/styles/components/commons/layout.module.css";
import NextLink from "next/link";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/core/supabase";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { LeaveAlert } from "./leave-alert";
import { UserStatus } from "@/lib/data/user";
import { Notification } from "./notification";

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
  const [showDeleteUserConfirm, setShowDeleteUserConfirm] = useState(false);
  const [nextRoute, setNextRoute] = useState("");
  const [deletionRequested, setDeletionRequested] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showCancelDeleteNotification, setShowCancelDeleteNotification] =
    useState(false);
  useEffect(() => {
    if (user) {
      fetch(`/api/user/${user.id}`)
        .then((res) => res.json())
        .then((data: UserStatus) => {
          setDeletionRequested(data.requested);
        });
    }
  }, [user]);
  async function handleLogout() {
    setOpen(false);
    await supabase.auth.signOut();
    router.push("/api/logout");
  }
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
        <div className={styles.logo}>
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
          <MenuItems
            user={user}
            deletionRequested={deletionRequested}
            handleCancelDeleteUser={handleCancelDeleteUser}
            handleLogout={handleLogout}
            handleDeleteUser={() => setShowDeleteUserConfirm(true)}
            routeWithConfirm={routeWithConfirm}
          />
        </div>
        <div className={styles.mobile_menu}>
          <IconButton
            colorScheme="teal"
            variant="outline"
            size="sm"
            aria-label="mobile menu"
            icon={<RxHamburgerMenu />}
            onClick={() => setOpen(true)}
          />
          <Drawer onClose={() => setOpen(false)} isOpen={isOpen} size="xl">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader
                fontSize="1.5em"
                textAlign="center"
                className={styles.logo}
              >
                <Link onClick={() => setOpen(false)} as={NextLink} href="/">
                  DEINLOG
                </Link>
              </DrawerHeader>
              <DrawerBody className={styles.drawer_body}>
                <MenuItems
                  setOpen={setOpen}
                  user={user}
                  deletionRequested={deletionRequested}
                  handleCancelDeleteUser={handleCancelDeleteUser}
                  handleLogout={handleLogout}
                  handleDeleteUser={() => setShowDeleteUserConfirm(true)}
                  routeWithConfirm={routeWithConfirm}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
      {showConfirm && (
        <LeaveAlert
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
      {showDeleteUserConfirm && (
        <LeaveAlert
          title="Request delete profile"
          confirmMessage="Are you sure you want to request a profile deletion?"
          isOpen={showDeleteUserConfirm}
          onClose={() => setShowDeleteUserConfirm(false)}
          onConfirm={() => {
            handleDeleteUser(user!.id);
          }}
        />
      )}
      {showDeleteNotification && (
        <Notification
          status="info"
          message="Your profile will be deleted in the next hours, you can change your decission anytime before."
          onClose={() => setShowDeleteNotification(false)}
        />
      )}
      {showCancelDeleteNotification && (
        <Notification
          status="info"
          message="The profile deletion has been canceled, we are happy to have you back!"
          onClose={() => setShowCancelDeleteNotification(false)}
        />
      )}
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>
          <Link href="/privacyPolicy">Privacy Policy</Link>
        </p>
        <p>&copy; {new Date().getFullYear()} deinlog.com</p>
      </footer>
    </>
  );
}

interface MenuItemsProps {
  user: User | null;
  deletionRequested: boolean;
  handleLogout: () => void;
  handleDeleteUser: (userId: string) => void;
  handleCancelDeleteUser: (userId: string) => void;
  setOpen?: (b: boolean) => void;
  routeWithConfirm: (r: string) => void;
}

function MenuItems({
  user,
  deletionRequested,
  handleLogout,
  handleDeleteUser,
  handleCancelDeleteUser,
  setOpen,
  routeWithConfirm,
}: MenuItemsProps) {
  return (
    <>
      {user && (
        <>
          <Link
            onClick={(e) => {
              e.preventDefault();
              setOpen?.(false);
              routeWithConfirm("/designMenu");
            }}
            href="/"
            className={styles.nav_item}
            as={NextLink}
          >
            Design Menu
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();
              setOpen?.(false);
              routeWithConfirm("/createMenu");
            }}
            href="/"
            className={styles.nav_item}
            as={NextLink}
          >
            Create Menu
          </Link>
          <Menu>
            <MenuButton
              leftIcon={<CgProfile />}
              fontWeight="normal"
              variant="none"
              className={styles.nav_item}
              as={Button}
            >
              Profile
            </MenuButton>
            <MenuList>
              <MenuItem
                color="red"
                onClick={() => {
                  if (deletionRequested) {
                    handleCancelDeleteUser(user.id);
                  } else {
                    handleDeleteUser(user.id);
                  }
                }}
              >
                {deletionRequested
                  ? "Cancel delete profile request"
                  : "Request delete profile"}
              </MenuItem>
              <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
      {!user && (
        <Link
          onClick={() => setOpen?.(false)}
          className={styles.nav_item}
          as={NextLink}
          href="/login"
        >
          Sign In
        </Link>
      )}
      {!user && (
        <Link
          onClick={() => setOpen?.(false)}
          className={styles.nav_item}
          as={NextLink}
          href="/signup"
        >
          Sign Up
        </Link>
      )}
    </>
  );
}
