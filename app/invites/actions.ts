"use server";

import { headers } from "next/headers";
import { nile } from "../api/[...nile]/nile";
export type Invite = any;
// import { Invite } from "@niledatabase/server";

export async function resend(invite: Invite) {
  nile.setContext(await headers());
  nile.setContext({ tenantId: invite.tenant_id });
  await nile.tenants.invite(invite.identifier);
}

export async function deleteInvite(invite: Invite) {
  nile.setContext(await headers());
  nile.setContext({ tenantId: invite.tenant_id });
  // delete does not work, need to make it work
  await nile.tenants.deleteInvite(invite.id);
}
