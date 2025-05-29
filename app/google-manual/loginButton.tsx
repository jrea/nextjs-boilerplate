"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "@niledatabase/react";

export default function GoogleManualButton() {
  return (
    <Button
      size="lg"
      onClick={() => {
        // tell the SDK where to get requests from, since we're manually doing it all
        // because this button is rended on the `/google-manual` route and we want it to work for all hosts
        // we use the window location
        signIn("google", {
          fetchUrl: `/google-manual/sso`,
          providersUrl: `/google-manual/providers`,
          csrfUrl: `/google-manual/csrf`,
          callbackUrl: "/google-manual?success=true",
        });
      }}
    >
      Entirely custom google button
    </Button>
  );
}
