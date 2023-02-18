import { Layout } from "@/components/layout";
import { Auth } from "@supabase/auth-ui-react";

export default function Home() {
  const { user } = Auth.useUser();

  return (
    <Layout user={user}>
      <>
        <h1>Menu This</h1>
      </>
    </Layout>
  );
}
