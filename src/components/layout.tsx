import Head from "next/head";
import styles from "@/styles/layout.module.css";
import NextLink from "next/link";
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
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
  const [isOpen, setOpen] = useState(false);
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
          <Link as={NextLink} href="/">
            DEINLOG
          </Link>
        </div>
        <div className={styles.desktop_menu}>
          <MenuItems />
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
                className="logo"
              >
                <Link onClick={() => setOpen(false)} as={NextLink} href="/">
                  DEINLOG
                </Link>
              </DrawerHeader>
              <DrawerBody className={styles.drawer_body}>
                <MenuItems />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>
          <Link as={NextLink} href="/privacyPolicy">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link as={NextLink} href="/cookiePolicy">
            Cookie Policy
          </Link>{" "}
          |{" "}
          <Link as={NextLink} href="/whoWeAre">
            Who we are
          </Link>
        </p>
        <p>&copy; {new Date().getFullYear()} deinlog.com</p>
      </footer>
    </>
  );
}

function MenuItems() {
  return (
    <>
      <Link as={NextLink} href="/whoWeAre" className={styles.nav_item}>
        Who we are
      </Link>
      <Link
        as={NextLink}
        href="https://www.app.deinlog.com/"
        className={styles.nav_item}
      >
        Try Deinlog
      </Link>
    </>
  );
}
