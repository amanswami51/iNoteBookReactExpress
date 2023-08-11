//1. "npm init"
//2. "npm i express", then import express, then create app, then listen the app.
//3. "npm i mongoose", then create db file, then import connectToMongo function from db file, then run this function. 
//4. "npm i nodemon", this is use for running and updating file concurrently. For this, use a command in terminal:- "nodemon index.js".
//5. make models folder for Schema and model : User.js and Notes.js, then use these models in routes.
//6. make routes folder for endpoints : auth.js and notes.js, then add these routes in "index.js" by "app.use".
//      a). In auth.js we use three router:- "/creteuser"(signUp), "/login", "/getuser" 
//      b). In notes.js we use four router:- "/addnote"(createnote), "/fetchallnotes"(readnotes), "/updatenote/:id", "/deletenote/:id"
//7. "npm i express-validator", this package is use for enter valide type of details.
//      a). const { body, validationResult } = require('express-validator');
//      b). make validation array in function header like [body('name').isLength({min:3}), body('email').isEmail(), body('password').exists()]
//      c). const error = validationResult(req);
//          if(!error.isEmpty()){
//              return res.status(400).json({error:"Please enter valid type information"});
//          }
//8. "npm i bcryptjs", for protect user passward we use the "bcrypt" npm package 
//      a). const bcrypt = require('bcryptjs');
//      b). const salt = await bcrypt.genSalt(10);
//          const store_this_hash_in_database = await bcrypt.hash(req.body.password, salt);
//      c). const passwardcompare = await bcrypt.compare(req.body.password, use_hash_store_in_database);
//9. "npm i jsonwebtoken", we give the tokens to the user when he login and signup.
//      a). const jwt = require('jsonwebtoken');   
//          const JWT_SECRET = "mehudon";      
//      b). const data = {  user:{id: user.id}  }
//          const authtoken = jwt.sign(data, JWT_SECRET);
//      c). const data = jwt.verify(authtoken, JWT_SECRET);
//          const userId = data.user.id
//          const user = await User.findById(userId).select("-password")
//          res.send(user);
//10. make middleware folder, for using common files and functions. In this project we use "fetchuser.js" file as a middleware.


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