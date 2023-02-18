import { supabase } from "@/lib/supabase";
import "@/styles/globals.css";
import { Auth } from "@supabase/auth-ui-react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  );
}
