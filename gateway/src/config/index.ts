import "dotenv/config";
import dotEnv from "dotenv";

const AMQP_URL: string | undefined = process.env.AMQP_URL;
const APP_SECRET: string | undefined = process.env.APP_SECRET;
const DB_URL: string | undefined = process.env.MONGODB_URI;
const FRONTEND: string | undefined = process.env.FRONTEND;
const NODE_ENV: string | undefined = process.env.NODE_ENV;
const PORT: string | undefined = process.env.PORT;
const QUEUE_NAME: string | undefined = process.env.QUEUE_NAME;

if (NODE_ENV !== "production") {
  const configFile = `./.env.${NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

export { AMQP_URL, APP_SECRET, DB_URL, FRONTEND, PORT, QUEUE_NAME };
