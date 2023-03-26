import styles from "@/styles/components/commons/layout.module.css";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { linkActive } from "../utils";

interface ActionItemsProps {
  setOpen?: (_b: boolean) => void;
  routeWithConfirm: (_r: string) => void;
}

export function ActionItems({ setOpen, routeWithConfirm }: ActionItemsProps) {
  return (
    <>
      <Link
        onClick={(e) => {
          e.preventDefault();
          setOpen?.(false);
          routeWithConfirm("/createMenu");
        }}
        href="/"
        className={`${styles.nav_item} ${
          linkActive("/createMenu") ? styles.nav_item_active : ""
        }`}
        as={NextLink}
      >
        Create Menu
      </Link>
      <Link
        onClick={(e) => {
          e.preventDefault();
          setOpen?.(false);
          routeWithConfirm("/designMenu");
        }}
        href="/"
        className={`${styles.nav_item} ${
          linkActive("/designMenu") ? styles.nav_item_active : ""
        }`}
        as={NextLink}
      >
        Design Menu
      </Link>
    </>
  );
}
