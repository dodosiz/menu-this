import Head from "next/head";
import styles from "@/styles/components/layout.module.css";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

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
      <nav>
        {user && (
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        )}
        {!user && <Link href="/login">Sign In</Link>}
      </nav>
      <main className={styles.main}>{children}</main>
    </>
  );
}
