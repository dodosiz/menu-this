import { Layout } from "@/components/layout";
import { Heading } from "@chakra-ui/react";

export default function Custom500() {
  return (
    <Layout>
      <Heading className="main_heading" size="xl" as="h1">
        500 - Server-side error occurred
      </Heading>
    </Layout>
  );
}
