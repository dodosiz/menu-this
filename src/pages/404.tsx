import { Layout } from "@/components/commons/layout";
import { auth } from "@/lib/config/firebase";
import { Heading } from "@chakra-ui/react";

export default function Custom404() {
  const user = auth.currentUser;
  return (
    <Layout user={user}>
      <Heading className="main_heading" size="xl" as="h1">
        404 - Page Not Found
      </Heading>
    </Layout>
  );
}
