import { headers } from "next/headers";
import { nile } from "../api/[...nile]/nile";

export default async function Dashboard() {
  const _headers = await headers();
  nile.setContext(_headers);
  const me = await nile.users.getSelf();
  console.log(me);
  return <div>{JSON.stringify(me)}</div>;
}
