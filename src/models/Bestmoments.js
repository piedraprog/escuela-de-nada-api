import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const bestMoments = new Schema({
	title: {
		type: String, 
		required: true,
	},
	episode:{
		type: Schema.ObjectId, 
		ref: 'episode',
		required: true
	},
	minStart:{
		type: Number, 
		required: true,
		trim: true
	},
	minEnd:{
		type: Number, 
		required: true,
		trim: true
	},
	postedBy:{
		type: String,
		required: true,
	}
},{
	versionKey:false,
	timestamps:true
});

bestMoments.plugin(mongoosePaginate);
export default model('Moment',bestMoments);