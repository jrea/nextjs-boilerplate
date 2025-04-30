"use server";
import { User } from "@niledatabase/server";
import { nile } from "../api/[...nile]/nile";
import { headers as nextHeaders } from "next/headers";

export async function login(formData: FormData) {
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
  const headerList = await nextHeaders();
  nile.api.headers = headerList;

  const nileResponse = await nile.api.login(
    {
      email,
      password,
    },
    {
      returnResponse: true,
    }
  );

  // Login and get Set-Cookie from Nile
  if (!nileResponse || !(nileResponse instanceof Response)) {
    throw new Error("Invalid response from Nile");
  }
  const setCookie = nileResponse.headers.get("set-cookie");
  if (!setCookie) {
    throw new Error("Invalid response from Nile");
  }
  const [, token] =
    /((__Secure-)?nile\.session-token=.+?);/.exec(setCookie) ?? [];
  if (!token) {
    throw new Error("No Nile session cookie found");
  }

  // nile.api.headers = new Headers({ cookie: token });

  const user: User | Response = await nile.api.users.me();
  if (!user || user instanceof Response) {
    throw new Error("User not found");
  }
}
