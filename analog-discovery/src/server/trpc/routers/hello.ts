import { router, publicProcedure } from "../trpc";

export const helloRouter = router({
  hello: publicProcedure.query(() => {
    return 'Hello World'
  })
})
