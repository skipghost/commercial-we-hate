import { initEdgeStore } from "@edgestore/server";
import { z } from "zod";

const es = initEdgeStore.create();

export const edgeStoreRouter = es.router({
  myPublicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1, // 1MB
    })
    .input(
      z.object({
        type: z.enum(["post", "profile"]),
      })
    )
    .path(({ input }) => [{ type: input.type }])
    .beforeDelete(({ ctx, fileInfo }) => {
      return true;
    }),

  publicFiles: es.fileBucket(),
});
