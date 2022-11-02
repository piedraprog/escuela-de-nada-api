import adminUser from '@models/admin';


export const createAdmin = async(req, res) => {

	// console.log(req.body);
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
		// console.log()
		res.json(adminSaved);
	} catch (error) {
		res.status(500).json({
			message: error.message || 'something goes wrong',
		});
	}
};


export const verifyAdmin = (id) => {
	adminUser.findOne({name: id}, (err, adminUser) => {
		if(err) return false;
		if(adminUser) return true;
	});
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