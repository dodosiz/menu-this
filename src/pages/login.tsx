import { useRouter } from "next/router";
import {
  Button,
  Container,
  Heading,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "@/components/commons/layout";
import styles from "@/styles/signup.module.css";
import { PasswordInput } from "@/components/commons/passwordInput";
import { validateEmail } from "@/components/utils";
import { useState, FormEvent } from "react";
import { Notification } from "@/components/commons/notification";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "@/lib/config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import NextLink from "next/link";

export default function Login() {
  const user = auth.currentUser;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  if (user) {
    router.push("/");
  }
  function logIn(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message);
      });
  }
  function logInWithGoogle(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Failed to login with Google");
      });
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
          <Heading className="main_heading" size="xl" as="h1">
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
            <PasswordInput
              placeholder="Enter password"
              value={password}
              setValue={setPassword}
            />
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
              onClick={logInWithGoogle}
            >
              Log in with Google
            </Button>
          </form>
          <VStack alignItems="left">
            <Link as={NextLink} href="/signup">
              {"Don't have an account? Sign up first."}
            </Link>
            <Link as={NextLink} href="/resetPassword">
              {"Forgot your password? Click here to reset your password."}
            </Link>
          </VStack>
        </Container>
      </>
    </Layout>
  );
}
