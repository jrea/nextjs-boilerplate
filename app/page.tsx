import { Google, SignUpForm, UserInfo } from "@niledatabase/react";
import "@niledatabase/react/styles.css";
import { nile } from "./api/[...nile]/nile";
import { headers as nextHeaders } from "next/headers";
import { User } from "@niledatabase/server";

export default async function Home() {
  const headerList = await nextHeaders();
  const me = await nile.api.users.me<User>(headerList);
  console.log(me, "me is ok?");
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-5">
      {me instanceof Response ? null : <UserInfo user={me} />}
      <Google />
      <SignUpForm callbackUrl="/dashboard" />
    </div>
  );
}
