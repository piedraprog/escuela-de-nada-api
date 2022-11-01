import {Schema, model} from 'mongoose';


const Character =  new Schema({
    Name:{
        type:String,
        required:true,
        trim:true,
    },
    Description:{
        type:String,
        required:true,
        trim:true    },
    EpisodeAparition:{
        type:Number,
        required:true,
        trim:true
    }
})

export default model('Character',Character);