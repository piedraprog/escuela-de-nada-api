import { Schema, model } from 'mongoose';

const adminUser =  new Schema({
	name:{
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	jwt:{
		type: String,
		required: true,
		trim: true,
		unique: true
	},
},{
	versionKey: false,
	timestamps: true,
	unique: true
});


export default model('admin', adminUser);