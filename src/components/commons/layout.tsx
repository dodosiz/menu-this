import Head from "next/head";
import styles from "@/styles/components/commons/layout.module.css";
import NextLink from "next/link";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/core/supabase";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { LeaveAlert } from "./leave-alert";

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
  async function handleLogout() {
    setOpen(false);
    await supabase.auth.signOut();
    router.push("/api/logout");
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
            handleLogout={handleLogout}
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
                  handleLogout={handleLogout}
                  routeWithConfirm={routeWithConfirm}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
      {showConfirm && (
        <LeaveAlert
          confirmMessage={confirmMessage ?? ""}
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            discardUnsavedChanges?.();
            router.push(nextRoute);
          }}
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
  handleLogout: () => void;
  setOpen?: (b: boolean) => void;
  routeWithConfirm: (r: string) => void;
}

function MenuItems({
  user,
  handleLogout,
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
          <button className={styles.nav_item} onClick={handleLogout}>
            Sign Out
          </button>
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
