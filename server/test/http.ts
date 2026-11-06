import type { Express } from "express";
import { createServer, request } from "node:http";
import type { AddressInfo } from "node:net";

export type TestRequest = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

/** Integration tests use only a temporary loopback server, never external URLs. */
export async function requestApp(
  app: Express,
  pathname: string,
  options: TestRequest = {}
) {
  const server = createServer(app);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  try {
    return await new Promise<{
      status: number;
      headers: Record<string, any>;
      body: string;
    }>((resolve, reject) => {
      const req = request(
        {
          hostname: "127.0.0.1",
          port: (server.address() as AddressInfo).port,
          path: pathname,
          method: options.method ?? "GET",
          headers: options.headers,
        },
        res => {
          const chunks: Buffer[] = [];
          res.on("data", chunk => chunks.push(Buffer.from(chunk)));
          res.on("end", () =>
            resolve({
              status: res.statusCode!,
              headers: res.headers,
              body: Buffer.concat(chunks).toString("utf8"),
            })
          );
        }
      );
      req.on("error", reject);
      req.end(options.body);
    });
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close(error => (error ? reject(error) : resolve()))
    );
  }
}
