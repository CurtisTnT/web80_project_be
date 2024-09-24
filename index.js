import express from "express";
import "dotenv/config";

import connectDatabase from "./src/database/db.js";
import RootRouter from "./src/routers/index.js";

const app = express();

//Connect database
connectDatabase();

//Middleware
app.use(express.json());

//Routers
app.use("/api/v1", RootRouter);

//Run server
app.listen(8080, () => {
  console.log("Server is running!");
});
