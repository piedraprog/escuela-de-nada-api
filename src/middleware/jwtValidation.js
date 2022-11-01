import config from "@config";
import jwt from 'jsonwebtoken';


export const TokenValidation = async (req, res, next) =>{

    const token = req.headers['token'];
    
    if(!token){
        return res.status(401).json({message:'acceso denegado'});
    }else{
        jwt.verify(token,config.key,(err,decoded) =>{
            if(err){
                return res.status(401).json({message:'acceso denegado', err});
            }else{
                next();
            }
        })
    }
}
