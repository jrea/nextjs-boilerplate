import { Nile } from "@niledatabase/server";

export const nile = Nile({
  debug: true,
});
export const { handlers } = nile;
