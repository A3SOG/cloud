import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { FRONTEND, PORT } from "./config";
import characterRoutes from "./routes/character";
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
  app.use("/", characterRoutes);

  app.listen(PORT, () => {
    console.log(`Character Micro-Service is Listening on Port ${PORT}`);
  });
};

StartServer();
