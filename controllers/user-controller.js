import User from "../models/User.js";

//bcrypt
import bcrypt from "bcrypt";

//jwt
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const jwtkey = process.env.jwtkey;



export const addUser = async(request, response)=>{
    try{
        let exist = await User.findOne({userId: request.body.userId});
        if(exist){
            
            response.status(200).json({msg:'User already exists'});
            
            return;
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = {userId: request.body.userId, name: request.body.name, password: hashedPassword, role:request.body.role};
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json(newUser);
    }catch(error){
        return response.status(500).json(error.message);
    }
}

export const login = async(request, response)=>{
    try{
        let user = await User.findOne({userId: request.body.userId});
        if(!user){
            return response.status(400).json({msg: "Student not found in records"});
        }
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
            jwt.sign({user},jwtkey,{expiresIn:"2h"}, (err, token)=>{
                if(err){
                    return response.status(500).json({ result: "Something went wrong" });
                }
                response.status(200).json({ user, auth: token });
            })
        }

    }catch(error){
        return response.status(500).json(error.message);
    }
}

