import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDatabase from "./src/database/db.js";
import RootRouter from "./src/routes/index.js";

const app = express();

//Connect database
connectDatabase();

//Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Authorization"],
  })
);

//Routers
app.use("/api/v1", RootRouter);

//Run server
app.listen(8080, () => {
  console.log("Server is running!");
});
