import { Nile } from "@niledatabase/server";

export const nile = Nile({
  debug: true,
  secureCookies: false,
});
export const { handlers } = nile;
