import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    role:{
        type:Number,
        required:true
    }
});

const user = mongoose.model('user', userSchema);

export default user;