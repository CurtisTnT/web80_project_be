import { Router } from "express";

import UserRouter from "./user.router.js";

const RootRouter = Router();

RootRouter.use("/users", UserRouter);

export default RootRouter;
