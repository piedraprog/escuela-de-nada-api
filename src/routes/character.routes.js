import {Router} from 'express';
import * as momentctrl from '../controllers/moments.controller';
// import * as characterctrl from '../controllers/character.controller';
import { tokenValidation } from '@middleware/jwtValidation';

const characterRouter = Router();


characterRouter.get('/Moment/List', momentctrl.ListAllMoment);
characterRouter.get('/Moment/List/:id',momentctrl.ListOneMoment);


characterRouter.post('/Moment/Add', tokenValidation, momentctrl.PostMoment);


characterRouter.delete('/Moment/Delete/:id', momentctrl.DeleteMoment);

export default characterRouter;