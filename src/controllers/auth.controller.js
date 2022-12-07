import adminUser from '../models/admin';
import { logger } from '../libs/logger';


export const createAdmin = async(req, res) => {

	if (!req.body.name) {
		return res.status(400).send({ message: 'Content cannot be empty'});
	}

	const { name, jwt} = req.body;

	try {
		const newAdmin = await new adminUser({
			name: name,
			jwt: jwt
		});

		const adminSaved = await newAdmin.save();
		res.json(adminSaved);
	} catch (error) {
		logger.warn(error);
		res.status(500).json({
			message: error.message || 'something goes wrong',
		});
	}
};


export const verifyAdmin = async(id) => {

	const exist = await adminUser.findOne({name: id},'name');
	if(!exist) return false;
	return true;

};

export const deleteAdmin = async(req, res) => {
	try {
		await adminUser.findByIdAndDelete(req.params.id);
		res.json({
			message: 'Moment Delete Successfully',
		});
	} catch (error) {
		res.status(500).json({
			message: error.message || 'something goes wrong',
		});
	}
};