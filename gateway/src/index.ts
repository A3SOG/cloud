import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import { FRONTEND, PORT } from "./config";
// import { AMQP_URL, QUEUE_NAME } from "./config";
// import createMQConsumer from "./utils/consumer";

const app = express();
// const consumer = createMQConsumer(AMQP_URL as string, QUEUE_NAME as string);

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200,
};

// consumer();
app.use(cors(corsOptions));
app.use("/users", proxy("http://auth:3000"));
app.use("/blog", proxy("http://blog:3001"));
app.use("/characters", proxy("http://characters:3002"));

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Welcome to the Gateway" });
});

app.listen(PORT, () => {
  console.log(`Gateway is Listening on Port ${PORT}`);
});
