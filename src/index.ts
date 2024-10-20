import "dotenv/config";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import connectToDB from "./db/connectToDB";
import ApiError from "./errors/ApiError";
import * as errors from "./middleware/error";
import router from "./routes";

const PORT = process.env.PORT || 5000;
const app: express.Application = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",").map(origin => origin),
    credentials: true,
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"]
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(router);

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send("Server Running");
});

// Custom 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, "Not Found", true));
});

// Convert Error to ApiError
app.use(errors.converter);

// Error Handler middleware
app.use(errors.handler);

app.listen(PORT, async () => {
  const dbStatus = await connectToDB();
  console.log(dbStatus);
  console.log(`=> Server is running on port ${PORT}`);
});
