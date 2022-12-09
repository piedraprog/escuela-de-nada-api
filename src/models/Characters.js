import mongoose, {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import AutoIncrementFactory from 'mongoose-sequence';


const Character =  new Schema({
	_id:{
		type:Number
	},
	name:{
		type:String,
		required:true,
		trim:true,
		unique: true
	},
	status: {
		type: String,
		required: true
	},
	bornEp:{
		type:Number,
		required:true,
		trim:true
	},
	apparition:{
		type:[Number],
		required:true,
		trim:true
	},
	createBy: {
		type: String,
		required: true,

	}
},{
	_id: false,
	versionKey: false
});

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

// eslint-disable-next-line camelcase
Character.plugin(AutoIncrement, {inc_field:'_id', start_seq: 1});
Character.plugin(mongoosePaginate);
export default model('character',Character);