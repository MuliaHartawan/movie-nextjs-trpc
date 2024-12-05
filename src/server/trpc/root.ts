import { router } from "./router";
import { helloRouter } from "./routers/hello";
import { movieRouter } from "./routers/movie";
import { userRouter } from "./routers/user";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  movie: movieRouter,
});

export type AppRouter = typeof appRouter;
