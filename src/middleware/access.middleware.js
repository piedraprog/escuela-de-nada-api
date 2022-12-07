import { infomsg } from '../libs/messages';

const allowedHost = ['http://localhost:4200'];

export const accessValidation = (req, res, next) => {

	if(!allowedHost.includes(req.get('origin')) && req.method === 'POST' || req.method === 'DELETE') {
		return res.status(401).json({message: infomsg.unauthorized});
	} else {
		next();
	}
};
