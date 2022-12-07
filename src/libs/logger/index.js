import { buildDevLog } from './dev.logger';
import { buildProdLogger } from './prod.logger'; 

import config from '../../config';

let newLogger;

if (config.env === 'dev') {
	newLogger = buildDevLog;
} else {
	newLogger = buildProdLogger;
}


export const logger = newLogger; 