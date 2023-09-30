//packages
import express from "express";
import bodyParser from "body-parser";

//Connection
import Connection from "./database/db.js";

//Route
import Route from "./routes/route.js";

const app = express();

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', Route);

const PORT = 8000;
Connection();

app.listen(PORT, ()=>{
    console.log(`Server started successfully at ${PORT}`);
})



