import {Router} from 'express';
import { createAdmin  } from '@controllers/auth.controller';
// import { tokenValidation } from '@middleware/jwtValidation';

const adminRouter = Router();

adminRouter.post('/admin/register', createAdmin);


export default adminRouter;