import { Server } from "@niledatabase/server";

// make a brand new server for nile since this is a special case where we are doing everything.
// Normally, just handle routes as routes, but anything is possible
export const nile = new Server({
  debug: true,
  routePrefix: "/google-manual",
});
