import { Layout } from "@/components/layout";
import { Auth } from "@supabase/auth-ui-react";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  const { user } = Auth.useUser();

  return (
    <Layout user={user}>
      <>
        <Heading>Menu This</Heading>
      </>
    </Layout>
  );
}
