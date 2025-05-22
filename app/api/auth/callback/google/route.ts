import { NextRequest } from "next/server";
import { handlers, nile as globalNile } from "../../../[...nile]/nile";
import { Tenant, User } from "@niledatabase/server";

export async function GET(req: NextRequest) {
  const { response, nile } = await handlers.withContext.GET(req);
  const me = await nile.users.getSelf<User>();

  if (me instanceof Response) {
    console.error("going home, this failed");
    // the user clicked on "cancel" or something
    // in this case, we could have been logged in (sso vs credential)
    // so manually clear the session
    const error = new URL(req.url).searchParams.get("error");
    if (error) {
      console.log(
        "got some error, but I am ignoring it. Maybe something cooler should happen",
        error
      );
    }

    const signOutRes = await nile.auth.signOut();
    // pass along the cookie invalidation headers, but also redirect
    const newHeaders = new Headers(signOutRes.headers);
    newHeaders.set("location", "/");

    const ssoClearingHeaders = response?.headers.get("set-cookie");
    if (ssoClearingHeaders) {
      newHeaders.set("set-cookie", ssoClearingHeaders);
    }

    console.log(newHeaders, ssoClearingHeaders);
    return new Response(null, {
      status: 302,
      headers: newHeaders,
    });
  }
  // add user to tenant - this is a terrible place to do this
  await globalNile.db.query(`CREATE TABLE IF NOT EXISTS "todos2" (
    "id" uuid DEFAULT gen_random_uuid(),
    "tenant_id" uuid,
    "title" varchar(256),
    "complete" boolean,
    CONSTRAINT todos2_tenant_id_id PRIMARY KEY("tenant_id","id")
  );`);

  let tenantId = me.tenants[0];
  if (!tenantId) {
    const tenant = await nile.tenants.create<Tenant>("myTenant1");
    tenantId = tenant.id;
  }
  nile.setContext({ tenantId });

  await nile.db.query(
    "insert into todos2 (title, complete, tenant_id) values ('a title', false, $1)",
    [tenantId]
  );

  return response;
}
