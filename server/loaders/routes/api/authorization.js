import Router from 'express';
import Authorization from '../../../controllers/authorization';
const apiRouter = Router();

apiRouter.post('/authorize', Authorization.authorizeUser)
apiRouter.post('/register-user', Authorization.registerUser)

export default apiRouter;