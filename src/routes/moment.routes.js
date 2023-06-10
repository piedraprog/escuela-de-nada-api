import {Router} from 'express';
import { listAllMoment, listByKey, postMoment } from '../controllers/moments.controller';
import { tokenValidation } from '../middleware/jwtValidation';


const momentRouter = Router();

momentRouter.get('/', listAllMoment);

momentRouter.get('/list', listAllMoment);

momentRouter.get('/listby', listByKey);

momentRouter.post('/add', tokenValidation, postMoment);

export default momentRouter;