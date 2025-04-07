import { headers } from "next/headers";
import { nile } from "../api/[...nile]/nile";

export default async function Dashboard() {
  const _headers = await headers();
  const me = await nile.api.users.me(_headers);
  console.log(me, _headers, "this should have something");
  return <div>{JSON.stringify(me)}</div>;
}
