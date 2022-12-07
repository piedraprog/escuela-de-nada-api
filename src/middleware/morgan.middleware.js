import morgan from 'morgan';
import { logger } from '../libs/logger';
import config from '../config';

const stream = {
	write:  (message) => logger.http({message, file:'morgan'}),
};

const skip = () => {
	const env = config.env; 
	return env != 'dev';
};

const newMorgan = morgan(
	':method :url [:status] [:res[content-length] kb] - :response-time ms',
	{stream, skip}
);

export const morganMiddleware = newMorgan;