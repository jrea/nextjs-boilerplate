import { Nile } from "@niledatabase/server";
export const nile = await Nile({
  api: {
    secureCookies: true,
  },
});
export const { handlers } = nile.api;
