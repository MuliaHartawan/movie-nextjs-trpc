import { inferAsyncReturnType } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext(opts: FetchCreateContextFnOptions) {
  return {
    // You can add any context properties here
    // For example, you might want to add user authentication info
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
