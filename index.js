//import library for api
const express = require("express");
const cors = require("cors");
//import function used for api
const {isEmailValid}= require('./src/validateEmail')
const{sendVerificationCode,isEmailVerified}=require('./src/verifyEmail')

const app = express();
app.use(cors()); //cross origin resource sharing
app.use(express.json()); //allow pass data in json format

//Routes
app.get("/email/validate", isEmailValid);//get tasks from DB 

app.post("/email/verify", sendVerificationCode);//get tasks from DB 
app.get("/email/verify/input", isEmailVerified);//get tasks from DB 

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));