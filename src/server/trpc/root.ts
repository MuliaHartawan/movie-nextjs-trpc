import { router } from "./router";
import { helloRouter } from "./routers/hello";
import { movieRouter } from "./routers/movie";
import { screenScheduleRouter } from "./routers/screen-schedule";
import { studioRouter } from "./routers/studio";
import { userRouter } from "./routers/user";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  movie: movieRouter,
  studio: studioRouter,
  screenSchedule: screenScheduleRouter,
});

export type AppRouter = typeof appRouter;
