import Router from 'express';
import Logos from '../../../controllers/logos';
const apiRouter = Router();

apiRouter.post('/logos', Logos.getLogos)
apiRouter.post('/remove-logo', Logos.removeLogo)
apiRouter.post('/add-logo', Logos.addLogo)

export default apiRouter;