import express from "express";
import { init as initializeLoaders } from "./loaders";
import config from "./config";

async function startServer() {
  const app = express();

  await initializeLoaders({
    expressApp: app,
  });

  app.listen(config.port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready on port:${config.port} `);
  });
}
startServer();