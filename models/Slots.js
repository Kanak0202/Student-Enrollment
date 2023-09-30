import mongoose from "mongoose";
import user from "./User.js";

const slotSchema = mongoose.Schema({
    userId:{
        type: mongoose.ObjectId,
        ref: 'user',
        required:true
    },
    day:{
        type:String,
        enum: ['Friday', 'Thursday'],
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        enum: ['10:00:00'],
        required:true
    },
    bookedBy:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        default:null
    }
});

const slot = mongoose.model('slot', slotSchema);

export default slot;