import {Schema, model} from 'mongoose';

const adminUser =  new Schema({
	name:{
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	jwt:{
		type: String,
		required: true,
		trim: true,
		unique: true 
	},
});

// adminUser.plugin(mongoosePaginate);
export default model('admin', adminUser);