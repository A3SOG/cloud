import "dotenv/config";
import dotEnv from "dotenv";
import bunyan, { LogLevelString } from "bunyan";
import pjs from '../../package.json'

const { name, version } = pjs;

if (process.env.NODE_ENV !== "production") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

const AMQP_URL = process.env.AMQP_URL || "";
const APP_SECRET = process.env.APP_SECRET || "";
const DB_URL = process.env.MONGODB_URI || "";
const FRONTEND = process.env.FRONTEND || "";
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || "3002";
const QUEUE_NAME = process.env.QUEUE_NAME || "";

const getLogger = (
  serviceName: string,
  serviceVersion: string,
  level: LogLevelString,
) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

interface ConfigOptions {
  name: string;
  version: string;
  serviceTimeout: number;
  log: () => bunyan;
}

const config: Record<string, ConfigOptions> = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, "debug"),
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, "info"),
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, "fatal"),
  },
};

export { AMQP_URL, APP_SECRET, DB_URL, FRONTEND, NODE_ENV, PORT, QUEUE_NAME };
export default config;
