import Head from "next/head";
import styles from "@/styles/components/layout.module.css";

interface LayoutProps {
  children: React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
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
      <main className={styles.main}>{children}</main>
    </>
  );
}
