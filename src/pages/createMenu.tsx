import { Layout } from "@/components/layout";
import { Heading, IconButton, Link, TabList, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import styles from "@/styles/createMenu.module.css";
import { IoMdAdd } from "react-icons/io";
import { NextApiRequest } from "next";
import { supabase } from "@/lib/supabase";
import { getCategories } from "@/lib/categories";
import { User } from "@supabase/supabase-js";
import { Category } from "@prisma/client";
import { getTokenFromCookie } from "@/lib/cookies";
import { CategoryForm } from "@/components/categoryForm";
import { CategoryTab } from "@/components/categoryTab";
import { UnauthorizedPage } from "@/components/unauthorizedPage";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const token = await getTokenFromCookie(req);
  const unauthenticatedProps = {
    props: {
      authorized: false,
    },
  };
  if (!token) {
    return unauthenticatedProps;
  }

  const { data } = await supabase.auth.getUser(token.access_token);
  if (!data.user) {
    return unauthenticatedProps;
  }

  const initialCategories = await getCategories(data.user.id);

  return {
    props: {
      authorized: true,
      user: data.user,
      initialCategories,
    },
  };
}

interface CreateMenuProps {
  authorized: boolean;
  user: User;
  initialCategories: Category[];
}

export default function CreateMenu({
  authorized,
  user,
  initialCategories,
}: CreateMenuProps) {
  const [isCreateMode, setCreate] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  return (
    <Layout user={user}>
      <div className={styles.create_menu}>
        {!authorized && <UnauthorizedPage />}
        {authorized && (
          <>
            <Heading size="xl" as="h1">
              Create Menu
            </Heading>
            <Tabs variant="soft-rounded" colorScheme="teal">
              <TabList className={styles.tablist}>
                {categories.map((category) => (
                  <CategoryTab
                    categories={categories}
                    category={category}
                    setCategories={setCategories}
                    key={"tab-" + category.id}
                  />
                ))}
                {isCreateMode && (
                  <CategoryForm
                    categories={categories}
                    handleCancel={() => setCreate(false)}
                    setCategories={setCategories}
                    setCreate={setCreate}
                    user={user}
                    key="create-form"
                  />
                )}
                <IconButton
                  colorScheme="teal"
                  variant="ghost"
                  aria-label="Create new"
                  icon={<IoMdAdd />}
                  isDisabled={isCreateMode}
                  onClick={() => setCreate(true)}
                  size="xs"
                />
              </TabList>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
}
