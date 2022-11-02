import {Schema, model} from 'mongoose';


const Character =  new Schema({
	name:{
		type:String,
		required:true,
		trim:true,
	},
	description:{
		type:String,
		required:true,
		trim:true    
	},
	episodeAparition:{
		type:Number,
		required:true,
		trim:true
	}
});

export default model('character',Character);