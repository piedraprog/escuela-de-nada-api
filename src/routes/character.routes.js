import {Router} from 'express';
import { postCharacters, listCharacters, listCharBykey} from '../controllers/character.controller';
import { tokenValidation } from '../middleware/jwtValidation';


const characterRouter = Router();


characterRouter.get('/', listCharacters);

characterRouter.get('/list', listCharacters);

characterRouter.get('/listby',listCharBykey);

characterRouter.post('/add', tokenValidation, postCharacters);


export default characterRouter;