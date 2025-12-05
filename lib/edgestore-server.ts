import { initEdgeStoreClient } from "@edgestore/server/core";
import { edgeStoreRouter } from "./edgeStoreRouter";

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});
