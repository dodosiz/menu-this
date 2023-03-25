import { Button, Container, Heading, Input } from "@chakra-ui/react";
import { Layout } from "@/components/commons/layout";
import styles from "@/styles/signup.module.css";
import { validateEmail } from "@/components/utils";
import { useState, FormEvent } from "react";
import { Notification } from "@/components/commons/notification";
import { auth } from "@/lib/config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  function sendLink(e: FormEvent) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmail("");
        setShowMessage(true);
      })
      .catch(() => {
        setErrorMessage("Something went wrong.");
      });
  }
  function isSubmitDisabled() {
    return !validateEmail(email);
  }

  return (
    <Layout user={null}>
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
            Send link to reset password
          </Heading>
          <form className={styles.signup_form} onSubmit={sendLink}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pr="4.5rem"
              focusBorderColor="teal.200"
              type="email"
              placeholder="Email"
            />
            <Button
              isDisabled={isSubmitDisabled()}
              variant="outline"
              colorScheme="teal"
              type="submit"
            >
              Send link
            </Button>
          </form>
        </Container>
        {showMessage && (
          <Notification
            status="info"
            message="Check your email for a verification link."
            onClose={() => setShowMessage(false)}
          />
        )}
      </>
    </Layout>
  );
}
