import jwt from 'jsonwebtoken';
import config from '@config';
import { verifyAdmin } from '@controllers/auth.controller';
import { infomsg } from '@libs/messages';

export const tokenValidation = (req, res, next) => {

	const token = req.body.key;
	if(!token){
		return res.status(401).json({
			message: infomsg.tokenNotFound
		});

	}else{
		jwt.verify(token, config.jwtKey, async (err, decode) => {
			if(err){
				
				return res.status(401).json({
					message: infomsg.accessDenied,
					error: err
				});
			}

			if(await verifyAdmin(decode.name)) {
				req.body = req.body.data;
				next();
			} else {
				return res.status(401).json({
					message: infomsg.accessDenied
				});
			}

		});
	}
};
