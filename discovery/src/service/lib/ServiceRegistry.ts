import semver from "semver";

interface Service {
  timestamp: number;
  ip: string;
  port: string;
  name: string;
  version: string;
}

class ServiceRegistry {
  private log: any;
  private services: { [key: string]: Service };
  private readonly timeout: number;

  constructor(log: any) {
    this.log = log;
    this.services = {};
    this.timeout = 30;
  }

  get(name: string, version: string, port: string): Service | undefined {
    this.cleanup();
    const candidates = Object.values(this.services).filter(
      (service) =>
        service.name === name &&
        semver.satisfies(service.version, version) &&
        service.port === port,
    );

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  find(name: string, version: string): Service | undefined {
    this.cleanup();
    const candidates = Object.values(this.services).filter(
      (service) =>
        service.name === name && semver.satisfies(service.version, version),
    );

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  register(name: string, version: string, ip: string, port: string): string {
    this.cleanup();
    const key = `${name}${version}${ip}${port}`;

    if (!this.services[key]) {
      this.services[key] = {
        timestamp: Math.floor(Date.now() / 1000),
        ip: ip,
        port: port,
        name: name,
        version: version,
      };
      this.log.debug(
        `Added services ${name}, version ${version} at ${ip}:${port}`,
      );
      return key;
    }

    this.services[key].timestamp = Math.floor(Date.now() / 1000);
    this.log.debug(
      `Updated services ${name}, version ${version} at ${ip}:${port}`,
    );
    return key;
  }

  unregister(name: string, version: string, ip: string, port: string): string {
    const key = `${name}${version}${ip}${port}`;
    delete this.services[key];
    this.log.debug(
      `Unregistered services ${name}, version ${version} at ${ip}:${port}`,
    );
    return key;
  }

  private cleanup(): void {
    const now = Math.floor(Date.now() / 1000);
    Object.keys(this.services).forEach((key) => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];
        this.log.debug(`Removed service ${key}`);
      }
    });
  }
}

export default ServiceRegistry;
