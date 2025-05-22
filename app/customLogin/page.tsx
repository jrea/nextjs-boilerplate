import { nile } from "../api/[...nile]/nile";
import { headers as nextHeaders } from "next/headers";
import Form from "./Form";
import { User } from "@niledatabase/server";

export default async function CustomLogin() {
  nile.setContext(await nextHeaders());
  const user = await nile.users.getSelf();

  return <Form user={user instanceof Response ? undefined : user} />;
}
