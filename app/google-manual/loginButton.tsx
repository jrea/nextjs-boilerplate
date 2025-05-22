"use client";
import { Button } from "@/components/ui/button";
import { getCsrfToken, signIn } from "@niledatabase/react";
import { useEffect, useMemo } from "react";

export default function GoogleManualButton() {
  useEffect(() => {
    // get the CSRF token when we mount, we need this to sign in.
    getCsrfToken(`${window.location.href}/csrf`);
  }, []);
  return (
    <Button
      size="lg"
      onClick={() => {
        // tell the SDK where to get requests from, since we're manually doing it all
        // because this button is rended on the `/google-manual` route and we want it to work for all hosts
        // we use the window location
        signIn("google", {
          fetchUrl: `${window.location.href}/sso`,
          providersUrl: `${window.location.href}/providers`,
          csrfUrl: `${window.location.href}/csrf`,
          callbackUrl: "/google-manual",
        });
      }}
    >
      Entirely custom google button
    </Button>
  );
}
