import { supabase } from "@/lib/core/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { Button, Container, Heading, Input } from "@chakra-ui/react";
import { Layout } from "@/components/commons/layout";
import { FormEvent, useState } from "react";
import styles from "@/styles/signup.module.css";
import { PasswordInput } from "@/components/commons/passwordInput";
import { Notification } from "@/components/commons/notification";

export default function SignUp() {
  const { user, session } = Auth.useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  if (user) {
    router.push("/");
  }
  function isSubmitDisabled() {
    return (
      !validateEmail(email) ||
      password !== repeatPassword ||
      password.length < 6
    );
  }
  async function signUp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
    }
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
        {!!user && !session && (
          <Heading className={styles.signup_heading} size="xl" as="h1">
            Please verify your email address,
          </Heading>
        )}
        {!user && !session && (
          <Container alignContent="center">
            <Heading className={styles.signup_heading} size="xl" as="h1">
              Sign Up
            </Heading>
            <form className={styles.signup_form} onSubmit={signUp}>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pr="4.5rem"
                focusBorderColor="teal.200"
                type="email"
                placeholder="Email"
              />
              <PasswordInput value={password} setValue={setPassword} />
              <PasswordInput
                value={repeatPassword}
                setValue={setRepeatPassword}
                password={password}
                isRepeat
              />
              <Button
                isDisabled={isSubmitDisabled()}
                variant="outline"
                colorScheme="teal"
                isLoading={loading}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
          </Container>
        )}
      </>
    </Layout>
  );
}

function validateEmail(email: string) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
