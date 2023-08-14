import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import ServiceHelper from "../utils/helper";
// import { FRONTEND } from "../config";
// import { AMQP_URL, QUEUE_NAME } from "./config";
// import createMQConsumer from "./utils/consumer";

const service = express();
// const consumer = createMQConsumer(AMQP_URL as string, QUEUE_NAME as string);

// var corsOptions = {
//   origin: FRONTEND,
//   optionsSuccessStatus: 200,
// };

export default (config: any) => {
  const log = config.log();

  if (service.get("env") === "development") {
    service.use((req: Request, res: Response, next: NextFunction) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  const StartServer = async () => {
    const serviceHelperConfig = {
      serviceRegistryUrl: "http://localhost:3000",
      serviceVersion: "0.0.1"
    }
    const serviceHelper = new ServiceHelper(serviceHelperConfig);

    // consumer();
    service.use(cors());

    service.get("/", (req: Request, res: Response) => {
      res.json({ msg: "Welcome to the Gateway" });
    });

    try {
      const authInfo = await serviceHelper.getServiceInfo("org.sog.hq.auth");
      const blogInfo = await serviceHelper.getServiceInfo("org.sog.hq.blog");
      const characterInfo = await serviceHelper.getServiceInfo("org.sog.hq.character");

      service.use("/users", proxy(`http://${authInfo.ip}:${authInfo.port}`));
      service.use("/blog", proxy(`http://${blogInfo.ip}:${blogInfo.port}`));
      service.use("/characters", proxy(`http://${characterInfo.ip}:${characterInfo.port}`));
    } catch (error) {
      log.error("Error setting up proxies:", error);
    }

    // consumer();
    // service.use(cors());
    // service.use("/users", proxy("http://auth:3000"));
    // service.use("/blog", proxy("http://blog:3001"));
    // service.use("/characters", proxy("http://characters:3002"));
    service.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        res.status(error.status || 500);
        log.error(error);
        return res.json({
          error: {
            message: error.message,
          },
        });
      },
    );
  };

  StartServer();

  return service;
};
