import { router } from "./router";
import { helloRouter } from "./routers/hello";
import { userRouter } from "./routers/user";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
