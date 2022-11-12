import Router from "express";
import Authorization from "./authorization";
import Logos from "./logos";

const apiRouter = Router();
apiRouter.use(Authorization);
apiRouter.use(Logos);

export default apiRouter;