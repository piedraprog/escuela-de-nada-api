import {Router} from 'express';
import { listAllMoment, listByKey, postMoment, deleteByUser } from '../controllers/moments.controller';
// import * as characterctrl from '../controllers/character.controller';
import { tokenValidation } from '../middleware/jwtValidation';


const momentRouter = Router();

momentRouter.get('/list', listAllMoment);
momentRouter.get('/listby', listByKey);


momentRouter.post('/add', tokenValidation, postMoment);


momentRouter.delete('/deletebyuser',tokenValidation, deleteByUser );

export default momentRouter;