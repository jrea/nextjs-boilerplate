import { UserInfo } from "@niledatabase/react";
import { nile } from "../api/[...nile]/nile";
import VerifyEmailForm from "./VerifyEmailForm";

export default async function VerifyEmail() {
  const me = await nile.users.getSelf();
  if (me instanceof Response) {
    return "You must be logged in to verify your email address.";
  }
  return (
    <div className="w-3xl mx-auto">
      <UserInfo user={me} />
      <VerifyEmailForm action={action} />
    </div>
  );
}
export async function action() {
  "use server";
  const res = await nile.users.verifySelf<Response>({
    callbackUrl: "/verify-email",
  });
  if (!res.ok) {
    return { ok: false, message: await res.text() };
  }
  return { ok: true, message: "email sent" };
}
