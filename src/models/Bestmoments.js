import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const bestmoments = new Schema({
    title: {
        type:String, 
        required:true,
        trim:true
    },
    cap_name:{
        type:String, 
        required:true,
        trim:true
    } ,
    cap_num:{
        type:Number, 
        required:true,
        trim:true
    },
    min_start:{
        type:Number, 
        required:true,
        trim:true
    } ,
    min_end:{
        type:Number, 
        required:true,
        trim:true
    } ,
    tags:{
        type:String, 
        required:true,
        trim:true
    } 
},{

    versionKey:false,
    timestamps:true
});

bestmoments.plugin(mongoosePaginate);
export default model('Moment',bestmoments);