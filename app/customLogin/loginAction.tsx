"use server";
import { parse, splitCookiesString } from "set-cookie-parser";
import { nile } from "../api/[...nile]/nile";
import { cookies, cookies as nextCookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { parseToken, User } from "@niledatabase/server";

export type LoginResponse = {
  message: string;
  user?: User;
};
export async function login(
  prevState: LoginResponse | null,
  formData: FormData
): Promise<LoginResponse> {
  const email = formData.get("email");
  const password = formData.get("password");
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email ||
    !password
  ) {
    throw new Error("Email and password are required");
  }

  const nileResponse = await nile.auth.signIn(
    "credentials",
    {
      email,
      password,
    },
    true
  );

  if (!nileResponse.ok) {
    // need to also set these cookies automatically in the extension
    await nile.auth.signOut();
    return { message: await nileResponse.clone().text() };
  }

  const token = parseToken(nileResponse.headers);
  if (!token) {
    throw new Error("No Nile session cookie found");
  }

  const user: User | Response = await nile.users.getSelf();

  if (!user || user instanceof Response) {
    throw new Error("User not found");
  }
  // holy crap nextjs. this is terrible.
  const cooks = await nextCookies();
  const browserCookies = parse(
    splitCookiesString(nileResponse.headers.get("set-cookie") as string)
  );
  if (browserCookies) {
    for (const parsed of browserCookies) {
      cooks.set(
        parsed.name as string,
        parsed.value as string,
        parsed as Partial<ResponseCookie>
      );
    }
  }

  return { message: "Login successful", user };
}
