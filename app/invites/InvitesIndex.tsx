import { User } from "@niledatabase/server";
import EnsureSignedIn from "./EnsureSignedIn";
import TenantsAndTables from "./TenantsAndTables";
import { nile } from "../api/[...nile]/nile";

export default async function InvitesIndex() {
  const me = await nile.users.getSelf<User>();
  nile.setContext({ userId: me.id });
  // do some extra context setting if we're new
  if (!nile.getContext().tenantId) {
    nile.setContext(me.tenants[0]);
  }

  return (
    <EnsureSignedIn me={me}>
      <TenantsAndTables me={me as User} />
    </EnsureSignedIn>
  );
}
