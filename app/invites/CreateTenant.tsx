import { headers } from "next/headers";
import { nile } from "../api/[...nile]/nile";
import { Tenant, User } from "@niledatabase/server";
import { Google, UserInfo } from "@niledatabase/react";
import { CreateTenantForm } from "./CreateTenantForm";
import { tenantPlaceholder } from "./placeholderNames";
import { DataTable } from "./InviteUserTable";
import { ColumnDef } from "@tanstack/react-table";
import { InviteUserToTenant } from "./InviteUserToTenant";
import InvitesTable from "./InvitesTable";
import { Invite } from "./actions";

type ServerResponse = {
  ok: boolean;
  message?: string;
  data?: Invite;
};
export default async function CreateTenant() {
  nile.setContext(await headers());
  const me = await nile.users.getSelf<User | Response>();

  if (me instanceof Response) {
    return (
      <div>
        <div className="text-7xl text-red-500">
          You need to log in before you can invite users.
        </div>
        <Google callbackUrl="/invites" />
      </div>
    );
  }
  nile.setContext({ tenantId: me.tenants[0] });
  // const invites = await nile.tenants.invites();
  const users = await nile.tenants.users();

  return (
    <div className="w-2xl mx-auto p-10 flex flex-col gap-10">
      <UserInfo user={me} />
      <div className="flex flex-col gap-8">
        <div className="text-5xl font-bold">
          {
            (
              await nile.tenants.get<Tenant>(
                nile.getContext().tenantId as string
              )
            ).name
          }
        </div>
        <div>
          <div className="text-2xl font-bold">Pending invites</div>
          <InviteUserToTenant action={inviteUser} />
          {/* <InvitesTable invites={invites instanceof Response ? [] : invites} /> */}
        </div>
        <div>
          <div className="text-2xl font-bold">Org members</div>
          <DataTable
            columns={userColumns}
            data={users instanceof Response ? [] : users}
          />
        </div>
      </div>
      <CreateTenantForm
        action={createTenant}
        placeholder={tenantPlaceholder()}
      />
    </div>
  );
}
async function createTenant(
  _: unknown,
  formData: FormData
): Promise<ServerResponse> {
  "use server";

  const name = formData.get("tenantName") as string;
  const placeholder = formData.get("placeholder") as string;
  const tenant = name ? name : placeholder;
  const response = await nile.tenants.create<Response>(tenant, true);

  if (response.ok) {
    return { ok: true, message: "Password reset" };
  }

  const message = await response.text();
  return { ok: false, message };
}
async function inviteUser(
  _: unknown,
  formData: FormData
): Promise<ServerResponse> {
  "use server";

  const email = formData.get("email") as string;
  const response = await nile.tenants.invite(email);
  if (response instanceof Response) {
    return { ok: false, message: "Failed to create invite for user" };
  }

  return { ok: true, data: response };
}

const userColumns: ColumnDef<User>[] = [
  { accessorKey: "email", header: "email" },
  { accessorKey: "name", header: "name" },
];
