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
const FRONTEND = process.env.FRONTEND || "";
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || "3003";
const QUEUE_NAME = process.env.QUEUE_NAME || "";
const REDIS_HOST = process.env.REDIS_HOST || "";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
const REDIS_PORT = process.env.REDIS_PORT || "";

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

export {
  AMQP_URL,
  APP_SECRET,
  FRONTEND,
  NODE_ENV,
  PORT,
  QUEUE_NAME,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
};
export default config;
