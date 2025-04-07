import { NextRequest } from "next/server";
import { nile, handlers } from "../../../[...nile]/nile";

export async function GET(req: NextRequest) {
  const postHandled = await handlers.GET(req);

  console.log("the handled post");
  if (postHandled) {
    const setCookie = postHandled.headers.getSetCookie();
    console.log(setCookie, "is this my cookie?");
    const hasSession = setCookie.filter((c) =>
      c.includes("nile.session-token")
    );
    console.log(hasSession);
    if (hasSession) {
      nile.api.headers = new Headers({ cookie: hasSession.toString() });
      console.log(hasSession, nile.api.headers, "what is this");
      const me = await nile.api.users.me();
      if ("id" in me) {
        console.log(me);
      }
    }
  }
  return postHandled;
}
