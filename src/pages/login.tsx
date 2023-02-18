import { supabase } from "@/lib/supabase";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";
import { LOGO_COLOR, LOGO_COLOR_LIGHT } from "@/styles/constants";

export default function Login() {
  const { user } = Auth.useUser();
  const router = useRouter();
  if (user) {
    router.push("/");
  }
  return (
    <Container>
      <Auth
        supabaseClient={supabase}
        view="sign_in"
        socialLayout="horizontal"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: LOGO_COLOR,
                brandAccent: LOGO_COLOR_LIGHT,
              },
            },
          },
        }}
      />
    </Container>
  );
}
