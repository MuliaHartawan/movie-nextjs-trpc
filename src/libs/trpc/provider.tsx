"use client";

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import React, { useState } from "react";
import { trpc, trpcClient } from "./index";
import { transformTRPCError } from "@/utils/error";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            console.error("Query error:", transformTRPCError(error));
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            console.error("Mutation error:", transformTRPCError(error));
          },
        }),
      }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
