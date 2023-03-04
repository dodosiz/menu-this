import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoadingPage } from "./loadingPage";

export function UnauthorizedPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  });
  return <LoadingPage fullHeight={true} />;
}
