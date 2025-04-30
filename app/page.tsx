import {
  Google,
  LinkedIn,
  signIn,
  SignOutButton,
  SignUpForm,
  UserInfo,
} from "@niledatabase/react";
import "@niledatabase/react/styles.css";
import { nile } from "./api/[...nile]/nile";
import { headers as nextHeaders } from "next/headers";
import { User } from "@niledatabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  // const headerList = await nextHeaders();
  // nile.api.headers = headerList;
  // console.log(nile.api.headers);
  nile.api.setContext(await nextHeaders());
  const me = await nile.api.users.me<User>();
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-5">
      {/* {me instanceof Response ? null : <UserInfo user={me} />} */}
      <Google />
      <LinkedIn />
      <SignUpForm callbackUrl="/dashboard" />
      <SignOutButton callbackUrl="/" />
      <Link href="/customLogin">
        <Button>Custom login</Button>
      </Link>
      <Link href="/interactive-sign-in">
        <Button>Interactive Signin/signup</Button>
      </Link>
    </div>
  );
}
