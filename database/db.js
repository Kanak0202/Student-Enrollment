import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async()=>{
    try{
        const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.mtjorld.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(URL, {useUnifiedTopology: true});
        console.log("Database connected successfully");
    }catch(error){
        console.log("Error while connecting with the database ",error.message);
    }
}

export default Connection;