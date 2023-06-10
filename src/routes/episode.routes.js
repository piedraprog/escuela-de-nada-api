import {Router} from 'express';
import { postEpisodes, listEpisodes, listEpByKey} from '../controllers/episode.controller';
import { tokenValidation } from '../middleware/jwtValidation';


const episodeRouter = Router();


episodeRouter.get('/', listEpisodes);

episodeRouter.get('/list', listEpisodes);

episodeRouter.get('/listby', listEpByKey);

episodeRouter.post('/add',tokenValidation, postEpisodes);


export default episodeRouter;