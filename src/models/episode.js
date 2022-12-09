import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const Episode =  new Schema({
	id:{
		type: Number,
	},
	title:{
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	published: {
		type: Number,
		required: true
	},
	location:{
		type: String,
		required: true
	},
	platform:{
		type: String,
		required: true,
		trim: true
	},
	category:{
		type: String,
		required: true,
	},
},{
	versionKey: false
});


Episode.plugin(mongoosePaginate);
export default model('episode',Episode);