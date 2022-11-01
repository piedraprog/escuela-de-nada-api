import app from './app';
import { logger }  from '@logger';
import'./database';


app.listen(app.get('port'));
logger.warn(new Error(`server on port, ${app.get('port')}`)); 
