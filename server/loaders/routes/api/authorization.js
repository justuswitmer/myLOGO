import Router from 'express';
import Authorization from '../../../controllers/authorization';
const apiRouter = Router();

apiRouter.post('/authorize', Authorization.authorizeUser)
apiRouter.post('/register-user', Authorization.registerUser)
apiRouter.post('/delete-user', Authorization.deleteUser)
apiRouter.post('/update-user', Authorization.updateUser)


export default apiRouter;