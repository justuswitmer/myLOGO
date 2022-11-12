import Router from "express";
import apiRouter from "./api";

const expressRouter = Router();
expressRouter.get("/", (req, res) => {
  res.send();
});
expressRouter.use("/api", apiRouter);

export default expressRouter;
