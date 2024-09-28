import { Router } from "express";

import UserRouter from "./user.route.js";
import AuthRoute from "./auth.route.js";

const RootRouter = Router();

RootRouter.use("", AuthRoute);

RootRouter.use("/users", UserRouter);

export default RootRouter;
