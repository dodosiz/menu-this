import { Layout } from "@/components/layout";
import { Heading } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <Layout>
      <Heading className="main_heading" size="xl" as="h1">
        404 - Page Not Found
      </Heading>
    </Layout>
  );
}
