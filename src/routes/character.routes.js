import {Router} from 'express';
import { postCharacters, listCharacters, listCharBykey, deleteCharacter} from '../controllers/character.controller';
import { tokenValidation } from '../middleware/jwtValidation';


const characterRouter = Router();


characterRouter.get('/list', listCharacters);
characterRouter.get('/listby',listCharBykey);


characterRouter.post('/add', tokenValidation, postCharacters);


characterRouter.delete('/delete', deleteCharacter);

export default characterRouter;