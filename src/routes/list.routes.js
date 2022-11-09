import { Router } from 'express';
import adminRouter from './admin.routes';
import momentRouter  from './moment.routes';
import characterRouter from './character.routes';
import episodeRouter from './episode.routes';


const router = Router();

router.use('/moments',momentRouter);
router.use('/characters',characterRouter);
router.use('/admin',adminRouter);
router.use('/episodes',episodeRouter);

export default router;