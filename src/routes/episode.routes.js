import {Router} from 'express';
import { postEpisodes, listEpisodes, listEpByKey, deleteEpisodes} from '@controllers/episode.controller';
// import { tokenValidation } from '@middleware/jwtValidation';


const episodeRouter = Router();


episodeRouter.get('/list', listEpisodes);
episodeRouter.get('/listbykey', listEpByKey);


episodeRouter.post('/add',postEpisodes);


episodeRouter.delete('/delete', deleteEpisodes);

export default episodeRouter;