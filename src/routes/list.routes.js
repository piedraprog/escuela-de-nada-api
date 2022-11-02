import { Router } from 'express';
import adminRouter from './admin.routes';
import momentRouter  from './moment.routes';
import characterRouter from './character.routes';

const router = Router();

router.use(momentRouter);
router.use(characterRouter);
router.use(adminRouter);

export default router;