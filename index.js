//import library for api
const express = require("express");
const cors = require("cors");
//import function used for api
const {isEmailValid}= require('./src/validateEmail')

const app = express();
app.use(cors()); //cross origin resource sharing
app.use(express.json()); //allow pass data in json format

//Routes
app.get("/email/validate", isEmailValid);//get tasks from DB 

app.get("/email/verify", isEmailValid);//get tasks from DB 
app.get("/email/verify/input", isEmailValid);//get tasks from DB 

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));