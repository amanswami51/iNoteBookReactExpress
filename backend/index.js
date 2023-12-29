//1. "npm init"
//2. create "index.js" file.
//      --npm install express
//      --Import express through "const express = require("express")" .
//      --create server through "const app = express()" method. 
//      --then run server through "app.listen(port,hostname, callback)" method.
//3. use "express.json()" for "res.json(object_name)" method. Use "cors()" method for changing the ports
//4. "npm i mongoose". Use "mongoose.connect(URI)" method in "db.js" file, then import function in index.js
//5.make models folder for Schema and model : User.js and Notes.js, then use these models in routes.
//6.make routes folder, create auth.js and notes.js file, "const router = express.Router()" method, "router.post(path,callback)" 
//  then "module.exports = router" then use these routes in "index.js" through "app.use(initial-path,require-router)".
//   a).In auth.js we use three router:- "/creteuser"(signUp), "/login", "/getuser".  
//   b).In notes.js we use four router:-"/addnote"(createnote), "/fetchallnotes"(readnotes),"/updatenote/:id", "/deletenote/:id"
//7. "npm i express-validator", this package is use for enter valide type of details.
//    a). const { body, validationResult } = require('express-validator');
//    b). make validation array in function header like [body('name').isLength({min:3}), body('email').isEmail(), body('password').exists()]
//    c). const error = validationResult(req);
//        if(!error.isEmpty()){return res.status(400).json({error:"Please enter valid type information"});}
//8. "npm i bcryptjs", for protect user passward we use the "bcrypt" npm package 
//      a). const bcrypt = require('bcryptjs');
//      b). const salt = await bcrypt.genSalt(10); const store_this_hash_in_database = await bcrypt.hash(req.body.password, salt);
//      c). const passwardcompare = await bcrypt.compare(req.body.password, use_hash_store_in_database);
//9. "npm i jsonwebtoken", we give the tokens to the user when he login and signup.
//      a). const jwt = require('jsonwebtoken'); const JWT_SECRET = "mehudon";      
//      b). const data = {  user:{id: user.id}  }; const authtoken = jwt.sign(data, JWT_SECRET);
//      c). const data = jwt.verify(authtoken, JWT_SECRET);
//          const userId = data.user.id
//          const user = await User.findById(userId).select("-password"); res.send(user);
//10. make middleware folder, for using common files and functions. In this project we use "fetchuser.js" file as a middleware.


const express = require('express');
const cors = require('cors');

//connect to database
const connectToMongo = require("./db");
connectToMongo(); 

const port = 5000;
const app = express();  //create server

app.use(cors()) //for changing the ports
app.use(express.json()); //for use of res.json(object_name)
app.use('/api/auth', require('./routes/auth'));     //for use of auth.js routes
app.use('/api/notes', require('./routes/notes'));   //for use of notes.js routes

//listen server**********************
app.listen(port, ()=>{
    console.log(`server is listening at http://localhost:${port}`)
})