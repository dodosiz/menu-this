import { Layout } from "@/components/layout";
import {
  Container,
  Heading,
  IconButton,
  Input,
  Link,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { Auth } from "@supabase/auth-ui-react";
import styles from "@/styles/createMenu.module.css";
import NextLink from "next/link";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NextApiRequest } from "next";
import { supabase } from "@/lib/supabase";
import { getCategories } from "@/lib/categories";
import { User } from "@supabase/supabase-js";
import { Category } from "@prisma/client";
import { getTokenFromCookie } from "@/lib/cookies";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const token = await getTokenFromCookie(req);

  if (!token) {
    return {
      props: {
        authorized: false,
      },
    };
  }

  const { data } = await supabase.auth.getUser(token.access_token);
  if (!data.user) {
    return {
      props: {
        authorized: false,
      },
    };
  }
  const categories = await getCategories(data.user.id);

  return {
    props: {
      authorized: true,
      user: data.user,
      categories,
    },
  };
}

interface CreateMenuProps {
  authorized: boolean;
  user: User;
  categories: Category[];
}

export default function CreateMenu({
  authorized,
  user,
  categories,
}: CreateMenuProps) {
  return (
    <Layout user={user}>
      <Container className={styles.create_menu}>
        {!authorized && (
          <Heading size="xl" as="h1">
            You need to{" "}
            <Link href="/login" as={NextLink}>
              log in
            </Link>{" "}
            first
          </Heading>
        )}
        {authorized && (
          <>
            <Heading size="xl" as="h1">
              Create Menu
            </Heading>
            <Tabs variant="soft-rounded" colorScheme="teal">
              <TabList>
                {categories.map((category) => {
                  return (
                    <Tab key={category.id} className={styles.category}>
                      <span className={styles.category_label}>
                        {category.title}{" "}
                      </span>
                      <IconButton
                        colorScheme="teal"
                        variant="ghost"
                        aria-label="Create new"
                        className={styles.delete_icon}
                        icon={<RiDeleteBin6Line />}
                      />
                    </Tab>
                  );
                })}
                <Tab>
                  <Input variant="unstyled" placeholder="Unstyled" />
                </Tab>
                <IconButton
                  colorScheme="teal"
                  variant="ghost"
                  aria-label="Create new"
                  icon={<IoMdAdd />}
                />
              </TabList>
            </Tabs>
          </>
        )}
      </Container>
    </Layout>
  );
}
