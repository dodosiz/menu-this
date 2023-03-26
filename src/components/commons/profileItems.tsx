import styles from "@/styles/components/commons/layout.module.css";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { linkActive } from "../utils";

interface ProfileItemsProps {
  user: User | null;
  setOpen?: (_b: boolean) => void;
  routeWithConfirm: (_r: string) => void;
}

export function ProfileItems({
  user,
  setOpen,
  routeWithConfirm,
}: ProfileItemsProps) {
  return (
    <>
      {user && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            setOpen?.(false);
            routeWithConfirm("/profile");
          }}
          href="/"
          className={`${styles.nav_item} ${
            linkActive("/profile") ? styles.nav_item_active : ""
          }`}
          as={NextLink}
        >
          Profile
        </Link>
      )}
      {!user && (
        <Link
          onClick={() => setOpen?.(false)}
          className={`${styles.nav_item} ${
            linkActive("/login") ? styles.nav_item_active : ""
          }`}
          as={NextLink}
          href="/login"
        >
          Log In
        </Link>
      )}
      {!user && (
        <Link
          onClick={() => setOpen?.(false)}
          className={`${styles.nav_item} ${
            linkActive("/signup") ? styles.nav_item_active : ""
          }`}
          as={NextLink}
          href="/signup"
        >
          Sign Up
        </Link>
      )}
    </>
  );
}
