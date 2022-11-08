import { Router } from 'express';
import adminRouter from './admin.routes';
import momentRouter  from './moment.routes';
import characterRouter from './character.routes';

const router = Router();

router.use('/moments',momentRouter);
router.use('/characters',characterRouter);
router.use('/admin',adminRouter);

export default router;