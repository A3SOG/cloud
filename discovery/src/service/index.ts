import express, { Request, Response, NextFunction, Express } from "express";
import ServiceRegistry from "./lib/ServiceRegistry";

const service: Express = express();

export default (config: any) => {
  const log = config.log();
  const serviceRegistry = new ServiceRegistry(log);

  if (service.get("env") === "development") {
    service.use((req: Request, res: Response, next: NextFunction) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.put(
    "/register/:servicename/:serviceversion/:serviceport",
    (req: Request, res: Response) => {
      const { servicename, serviceversion, serviceport } = req.params;
      const serviceip = req.socket.remoteAddress!.includes("::")
        ? `[${req.socket.remoteAddress}]`
        : req.socket.remoteAddress;
      const serviceKey = serviceRegistry.register(
        servicename,
        serviceversion,
        serviceip!,
        serviceport,
      );
      return res.json({ result: serviceKey });
    },
  );

  service.delete(
    "/unregister/:servicename/:serviceversion/:serviceport",
    (req: Request, res: Response) => {
      const { servicename, serviceversion, serviceport } = req.params;
      const svc = serviceRegistry.get(servicename, serviceversion, serviceport);
      if (!svc) return res.status(404).json({ result: "Service not found" });
      const serviceip = req.socket.remoteAddress!.includes("::")
        ? `[${req.socket.remoteAddress}]`
        : req.socket.remoteAddress;
      const serviceKey = serviceRegistry.unregister(
        servicename,
        serviceversion,
        serviceip!,
        serviceport,
      );
      return res.json({ result: `Deleted ${serviceKey}` });
    },
  );

  service.get(
    "/find/:servicename/:serviceversion",
    (req: Request, res: Response) => {
      const { servicename, serviceversion } = req.params;
      const svc = serviceRegistry.find(servicename, serviceversion);
      if (!svc) return res.status(404).json({ result: "Service not found" });
      return res.json(svc);
    },
  );

  service.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });

  return service;
};