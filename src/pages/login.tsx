import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { Button, Container, Heading, Input } from "@chakra-ui/react";
import { Layout } from "@/components/commons/layout";
import styles from "@/styles/signup.module.css";
import { PasswordInput } from "@/components/commons/passwordInput";
import { validateEmail } from "@/components/utils";
import { useState, FormEvent } from "react";
import { Notification } from "@/components/commons/notification";
import { supabase } from "@/lib/core/supabase";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { user } = Auth.useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  if (user) {
    router.push("/");
  }
  async function logIn(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    }
  }
  async function logInWithGoogle(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    }
  }
  function isSubmitDisabled() {
    return !validateEmail(email) || password.length < 6;
  }
  return (
    <Layout user={user}>
      <>
        {!!errorMessage.length && (
          <Notification
            status="error"
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
        <Container alignContent="center">
          <Heading className={styles.signup_heading} size="xl" as="h1">
            Log In
          </Heading>
          <form className={styles.signup_form} onSubmit={logIn}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pr="4.5rem"
              focusBorderColor="teal.200"
              type="email"
              placeholder="Email"
            />
            <PasswordInput value={password} setValue={setPassword} />
            <Button
              isDisabled={isSubmitDisabled()}
              variant="outline"
              colorScheme="teal"
              isLoading={loading}
              type="submit"
            >
              Log in
            </Button>
            <Button
              leftIcon={<FcGoogle />}
              variant="outline"
              colorScheme="teal"
              isLoading={loading}
              onClick={logInWithGoogle}
            >
              Log in with Google
            </Button>
          </form>
        </Container>
      </>
    </Layout>
  );
}
