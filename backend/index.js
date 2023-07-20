//"npm init"
//"npm i express", then import express, then create app, then listen the app.
//"npm i mongoose", then create db file, then import connectToMongo function from db file, then run this function. 
//"npm i nodemon"
//make routes folder for endpoints : auth.js and notes.js, then add these routes in "index.js" by "app.use"
//make models folder for Schema and model : User.js and Notes.js, then use these models in routes.
//"npm i express-validator", this package is use for enter valide type of details.
//"npm i bcryptjs", for protect user passward we use the "bcrypt" npm package 
//"npm i jsonwebtoken", we give the tokens to the user for login. For this we use "npm i jsonwebtoken" or jwt tokens


const express = require('express');
const cors = require('cors');
const connectToMongo = require("./db");
connectToMongo();   //connect to mongodb

const app = express();  //create app using express
const port = 5000;

app.use(cors())
app.use(express.json()); //for use of res.json(object_name)
app.use('/api/auth', require('./routes/auth'));     //for use of auth.js routes
app.use('/api/notes', require('./routes/notes'));   //for use of notes.js routes

app.listen(port, ()=>{
    console.log(`server is listening at http://localhost:${port}`)
})