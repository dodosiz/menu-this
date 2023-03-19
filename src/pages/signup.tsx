import { useRouter } from "next/router";
import { Button, Container, Heading, Input } from "@chakra-ui/react";
import { Layout } from "@/components/commons/layout";
import { FormEvent, useState } from "react";
import styles from "@/styles/signup.module.css";
import { PasswordInput } from "@/components/commons/passwordInput";
import { Notification } from "@/components/commons/notification";
import { validateEmail } from "@/components/utils";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@/lib/config/firebase";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  if (user && user.emailVerified) {
    router.push("/");
  }
  function isSubmitDisabled() {
    return (
      !validateEmail(email) ||
      password !== repeatPassword ||
      password.length < 6
    );
  }
  function signUp(e: FormEvent) {
    e.preventDefault();
    if (isSubmitDisabled()) {
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        sendEmailVerification(value.user).then(() => {
          setUser(value.user);
          setLoading(false);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }
  function signUpWithGoogle(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Failed to sign up");
      });
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
        {!!user && !user.emailVerified && (
          <Heading className={styles.signup_heading} size="xl" as="h1">
            Please confirm your email address.
          </Heading>
        )}
        {!user && (
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
              <PasswordInput
                placeholder="Enter password"
                value={password}
                setValue={setPassword}
              />
              <PasswordInput
                placeholder="Repeat password"
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
                Sign up
              </Button>
              <Button
                leftIcon={<FcGoogle />}
                variant="outline"
                colorScheme="teal"
                onClick={signUpWithGoogle}
              >
                Sign up with Google
              </Button>
            </form>
          </Container>
        )}
      </>
    </Layout>
  );
}
