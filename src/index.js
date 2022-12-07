import app from './app';
import { logger }  from './libs/logger';
import'./database';


app.listen(app.get('port'));
logger.info({message:`server on port, ${app.get('port')}`, file: 'index.js'}); 
