import { TENANT_COOKIE, User } from "@niledatabase/server";
import { nile } from "../api/[...nile]/nile";
import { TenantSelector, UserInfo } from "@niledatabase/react";
import { InviteUserToTenant } from "./InviteUserToTenant";
import InvitesTable from "./InvitesTable";
import MembersTable from "./MembersTable";
import { inviteUser, setActiveTenant } from "./actions";
import { cookies, headers } from "next/headers";

export default async function TenantsAndTables({ me }: { me: User }) {
  nile.setContext({ userId: me.id });
  // do some extra context setting if we're new
  if (!nile.getContext().tenantId) {
    nile.setContext(me.tenants[0]);
  }
  const [invites, users, tenants] = await Promise.all([
    nile.tenants.invites(),
    nile.tenants.users(),
    nile.tenants.list(),
  ]);

  return (
    <div className="w-2xl mx-auto p-10 flex flex-col gap-10">
      <UserInfo user={me} />
      <div className="flex flex-col gap-8">
        <div className="text-5xl font-bold">
          <TenantSelector
            tenants={tenants instanceof Response ? [] : tenants}
            activeTenant={nile.getContext().tenantId}
            onTenantChange={setActiveTenant}
          />
        </div>
        <div>
          <div className="text-2xl font-bold">Pending invites</div>
          <InviteUserToTenant action={inviteUser} />
          <InvitesTable invites={invites instanceof Response ? [] : invites} />
        </div>
        <div>
          <div className="text-2xl font-bold">Org members</div>
          <MembersTable
            users={users instanceof Response ? [] : users}
            me={me}
          />
        </div>
      </div>
    </div>
  );
}
