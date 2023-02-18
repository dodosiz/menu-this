import Head from "next/head";
import styles from "@/styles/components/layout.module.css";
import NextLink from "next/link";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Link } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactElement;
  user: User | null;
}

export function Layout({ children, user }: LayoutProps) {
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
        {user && (
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        )}
        {!user && (
          <Link as={NextLink} href="/login">
            Sign In
          </Link>
        )}
      </nav>
      <main className={styles.main}>{children}</main>
    </>
  );
}
