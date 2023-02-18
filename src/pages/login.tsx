import { supabase } from "@/lib/supabase";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";

export default function Login() {
  const { user } = Auth.useUser();
  const router = useRouter();
  if (user) {
    router.push("/");
  }
  return (
    <Auth
      appearance={{ theme: ThemeSupa }}
      supabaseClient={supabase}
      view="sign_in"
      socialLayout="horizontal"
    />
  );
}
