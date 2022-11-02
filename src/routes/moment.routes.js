import {Router} from 'express';
import * as momentctrl from '../controllers/moments.controller';
// import * as characterctrl from '../controllers/character.controller';
import { tokenValidation } from '@middleware/jwtValidation';

const momentRouter = Router();


momentRouter.get('/Moment/List', momentctrl.ListAllMoment);
momentRouter.get('/Moment/List/:id',momentctrl.ListOneMoment);


momentRouter.post('/Moment/Add', tokenValidation, momentctrl.PostMoment);


momentRouter.delete('/Moment/Delete/:id', momentctrl.DeleteMoment);

export default momentRouter;