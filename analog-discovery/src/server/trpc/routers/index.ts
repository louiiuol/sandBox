import { router } from '../trpc';
import { helloRouter } from './hello';
import { noteRouter } from './notes';

export const appRouter = router({
  note: noteRouter,
  hello: helloRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
