import { nile } from "../localizedNile";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await nile.auth.signIn("google", req);
}
