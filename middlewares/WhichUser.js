import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// import verifyToken from "../controllers/jwt-controller.js";

dotenv.config();
const jwtkey = process.env.jwtkey;

export const isStudent = async(request, response, next)=>{
    let token = request.headers['authorization'];

    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                response.status(401).send({ result: "Please provide valid token" });
            } else {
                if(valid.user.role==1){
                    response.locals.user=valid.user;
                    next();
                }
                else{
                    response.status(401).send({ result: "You are not authorized." });
                }
                
            }
        });
    } else {
        response.status(403).send({ result: "Please add token with header" });
    }
}

export const isDean = async(request, response, next)=>{
    let token = request.headers['authorization'];

    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                response.status(401).send({ result: "Please provide valid token" });
            } else {
                if(valid.user.role==2){
                    response.locals.user=valid.user;
                    next();
                }
                else{
                    response.status(401).send({ result: "You are not authorized." });
                }
                
            }
        });
    } else {
        response.status(403).send({ result: "Please add token with header" });
    }

}

