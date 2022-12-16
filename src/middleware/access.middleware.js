import { infomsg } from '../libs/messages';
import config from '../config';

const allowedHost = config.host;

export const accessValidation = (req, res, next) => {
	if(!allowedHost.includes(req.get('origin')) && req.method === 'POST' || req.method === 'DELETE') {
		return res.status(401).json({message: infomsg.unauthorized});
	} else {
		next();
	}
};
