import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import connectToMongoDB from "./database/MongoDB";
import { FRONTEND, PORT } from "./config";
import blogRoutes from "./routes/blog";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200,
};

const StartServer = async () => {
  app.use(cors(corsOptions));
  app.use(errorMiddleware);
  app.use(express.json());
  app.use("/", blogRoutes);

  await connectToMongoDB();

  app.listen(PORT, () => {
    console.log(`Blog Micro-Service is Listening on Port ${PORT}`);
  });
};

StartServer();
