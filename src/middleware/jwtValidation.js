import jwt from 'jsonwebtoken';
import config from '@config';


export const tokenValidation = async (req, res, next) => {

	const token = req.body.key;
	
	
	if(!token){
		return res.status(401).json({message:'acceso denegado'});
	}else{
		jwt.verify(token, config.jwtKey, ( err, decode) => {
			if(err){
				return res.status(401).json({message:'acceso denegado', err});
			}

			console.log(decode);
			return 0;
			// next();
			// if()
		});
	}
};
