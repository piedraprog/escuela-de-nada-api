import {Router} from 'express';
import { postEpisodes, listEpisodes, listEpByKey} from '../controllers/episode.controller';
import { tokenValidation } from '../middleware/jwtValidation';


const episodeRouter = Router();


episodeRouter.get('/list', listEpisodes);

episodeRouter.get('/listbykey', listEpByKey);

episodeRouter.post('/add',tokenValidation, postEpisodes);


export default episodeRouter;