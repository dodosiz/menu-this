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

interface LayoutProps {
  children: React.ReactElement;
  user: User | null;
}

export function Layout({ children, user }: LayoutProps) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  async function handleLogout() {
    setOpen(false);
    await supabase.auth.signOut();
    router.push("/api/logout");
  }
  return (
    <>
      <Head>
        <title>Menu This</title>
        <meta
          name="description"
          content="Create the online menu for your business"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navigation}>
        <div className={styles.logo}>
          <Link as={NextLink} href="/">
            MENU THIS
          </Link>
        </div>
        <div className={styles.desktop_menu}>
          <MenuItems user={user} handleLogout={handleLogout} />
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
                  MENU THIS
                </Link>
              </DrawerHeader>
              <DrawerBody className={styles.drawer_body}>
                <MenuItems
                  setOpen={setOpen}
                  user={user}
                  handleLogout={handleLogout}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </>
  );
}

interface MenuItemsProps {
  user: User | null;
  handleLogout: () => void;
  setOpen?: (b: boolean) => void;
}

function MenuItems({ user, handleLogout, setOpen }: MenuItemsProps) {
  return (
    <>
      {user && (
        <>
          <Link
            onClick={() => setOpen?.(false)}
            className={styles.nav_item}
            as={NextLink}
            href="/designMenu"
          >
            Design Menu
          </Link>
          <Link
            onClick={() => setOpen?.(false)}
            className={styles.nav_item}
            as={NextLink}
            href="/createMenu"
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
    </>
  );
}