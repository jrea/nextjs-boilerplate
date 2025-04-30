import { NextRequest } from "next/server";
import {
  handlersWithContext,
  nile as globalNile,
} from "../../../[...nile]/nile";
import { User } from "@niledatabase/server";

export async function GET(req: NextRequest) {
  const { response, nile } = await handlersWithContext.GET(req);
  const me = await nile.api.users.me<User>();
  // add user to tenant or something
  globalNile.db.query("insert into todos... ");
  nile.tenantId = me.tenants[0].id;
  nile.db.query("select * from todos;");
  return response;
}
