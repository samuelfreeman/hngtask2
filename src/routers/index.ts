import { Router } from "express";

const appRouter = Router();

import userRouter from "./user.router";
import orgRouter from "./org.router";

appRouter.use(userRouter);
appRouter.use(orgRouter)
export default appRouter;