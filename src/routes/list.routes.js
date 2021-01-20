import {Router} from 'express';
import * as momentctrl from '../controllers/moments.controller';
import * as characterctrl from '../controllers/character.controller';

const router = Router();


//DEFINE OF THE ROUTES

// BEST MOMENTS / BEST MOMENTS / BEST MOMENTS / BEST MOMENTS / BEST MOMENTS / BEST MOMENTS 

// LIST BEST MOMENTS
router.get('/Moment/List', momentctrl.ListAllMoment);

router.get('/Moment/List/:id',momentctrl.ListOneMoment);


//INSERT INTO  DB
router.post('/Moment/Add',momentctrl.PostMoment);

//DELETE A MOMENT 
router.delete('/Moment/Delete/:id', momentctrl.DeleteMoment);




// CHARACTERS / CHARACTERS / CHARACTERS / CHARACTERS / CHARACTERS / CHARACTERS / CHARACTERS 

//LIST CHARACTERS 
router.get('/Character/List', characterctrl.ListCharacters);

//INSERT INTO DB
router.post('/Character/Add', characterctrl.PostCharacters);


export default router;