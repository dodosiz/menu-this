import { Auth } from "@supabase/auth-ui-react";
import { Button, Container, Heading } from "@chakra-ui/react";
import { Layout } from "@/components/commons/layout";
import styles from "@/styles/signup.module.css";
import { PasswordInput } from "@/components/commons/passwordInput";
import { useState, FormEvent } from "react";
import { Notification } from "@/components/commons/notification";
import { supabase } from "@/lib/core/supabase";

export default function UpdateUser() {
  const { user } = Auth.useUser();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  async function update(e: FormEvent) {
    e.preventDefault();
    if (isSubmitDisabled()) {
      return;
    }
    setLoading(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: user!!.email || "",
      password: password,
    });
    if (loginError) {
      setErrorMessage(loginError.message);
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setShowSuccess(true);
      setPassword("");
      setRepeatNewPassword("");
      setNewPassword("");
    }
  }
  function isSubmitDisabled() {
    return newPassword !== repeatNewPassword || newPassword.length < 6;
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
            Update Password
          </Heading>
          <form className={styles.signup_form} onSubmit={update}>
            <PasswordInput
              placeholder="Current password"
              value={password}
              setValue={setPassword}
            />
            <PasswordInput
              placeholder="New password"
              value={newPassword}
              setValue={setNewPassword}
            />
            <PasswordInput
              placeholder="Repeat new password"
              value={repeatNewPassword}
              setValue={setRepeatNewPassword}
              password={newPassword}
              isRepeat
            />
            <Button
              isDisabled={isSubmitDisabled()}
              variant="outline"
              colorScheme="teal"
              isLoading={loading}
              type="submit"
            >
              Update Password
            </Button>
          </form>
        </Container>
        {showSuccess && (
          <Notification
            status="success"
            message="Password has beeen updated."
            onClose={() => setShowSuccess(false)}
          />
        )}
      </>
    </Layout>
  );
}
