import {
  Google,
  LinkedIn,
  signIn,
  SignInForm,
  SignOutButton,
  SignUpForm,
  UserInfo,
} from "@niledatabase/react";

import { nile } from "./api/[...nile]/nile";
import { cookies, headers as nextHeaders } from "next/headers";
import { User } from "@niledatabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tenant } from "@niledatabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

export default async function Home() {
  nile.setContext(await nextHeaders());
  const activeSession = await nile.auth.getSession();
  if (activeSession) {
    console.log(activeSession, "this is the session");
    // nile.api.headers = headerList;                 #
    // console.log(nile.api.headers);                 #
    // nile.setContext(await nextHeaders());          #
    // console.log(await nile.auth.getCsrf());
    // console.log(await nile.auth.listProviders());
    // console.log(await nile.auth.getSession());
    // await globalNile.auth.getCsrf();
    /*
  await nile.auth.signIn("credentials", {
    email: "no@no.com",
    password: "no@no.com",
  });
  */
    const me = await nile.users.getSelf<User>();
    // console.log(me);
    const tenant = await nile.tenants.create<Tenant>("myTenant1");

    // console.log(tenant);
    console.log(await nile.tenants.get(tenant.id));
    console.log(await nile.tenants.update({ ...tenant, name: "mytenant2" }));

    // console.log(await nile.tenants.delete(tenant.id));
    // console.log(await nile.db.query("select * from todos;").rows);
  }

  return (
    <div className="flex-1 flex justify-center flex-col">
      <div className="text-7xl m-40 text-center">The Kitchen Sink</div>
      <div className="flex flex-col gap-10 max-w-2xl container mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <div>
            <Google callbackUrl="/google" />
          </div>
          <div>
            <LinkedIn />
          </div>
        </div>
        <div className="flex flex-row gap-10 items-center">
          <hr className="w-full" />
          or
          <hr className="w-full" />
        </div>
        <Tabs defaultValue="signup">
          <TabsList className="w-full">
            <TabsTrigger value="signup">Sign up</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <SignUpForm callbackUrl="/dashboard" />
          </TabsContent>
          <TabsContent value="signin">
            <SignInForm callbackUrl="/dashboard" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
