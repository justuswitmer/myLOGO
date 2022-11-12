import Router from 'express';
import Logos from '../../../controllers/logos';
const apiRouter = Router();

apiRouter.post('/logos', Logos.getLogos)

export default apiRouter;