import { Nile } from "@niledatabase/server";

export const nile = await Nile({
  debug: true,
});
export const { handlers, handlersWithContext } = nile.api;
