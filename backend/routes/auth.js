const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');    //"npm i express-validator" package
const bcrypt = require('bcryptjs'); //use to protect password
const jwt = require('jsonwebtoken'); //use to give token to user as a response.
const fetchuser = require("../middleware/fetchuser");


const JWT_SECRET = "Harryisagoodb$oy"; //For jwt tokens

//ROUTE1:- create a user using post : '/api/auth/createuser', no login required
router.post('/createuser', [
    body('name', 'Enter the valid name').isLength({ min: 3 }), 
    body('email', 'Enter the valid email').isEmail(), 
    body('password','Enter the password atleat 5 lenght').isLength({ min: 5 })], 
    async (req, res)=>{
    
    let success = false;

    //***validation, If there are errors, return bad request and errors***.
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array() });
    }

    //for protect user passward we use the "bcrypt" npm package 
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    try{
        //check whether the user with this email exists already.
        var user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email already exists"});
        }

        user = await User.create({  //create a new user
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        // res.json(user);
        
        //we give the tokens to the user for login. For this we use "npm i jsonwebtoken" or jwt tokens
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
});



//ROUTE2 :- authenticate a user using post : '/api/auth/login', no login required
router.post('/login', [
    body('email', 'Enter the valid email').isEmail(), 
    body('password','password can not be blank').exists()], 
    async (req, res)=>{
    
    let success = false;
    //***validation, If there are errors, return bad request and errors***.
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    //If user follow the instruction of validation for enter the value, then check the user
    const {email, password} = req.body;
    try {
       var user = await User.findOne({email});
       if(!user){
            success = false;
            return res.status(400).json({success, error:"Please try to login with correct credentials"});
       } 

       //if user exist then compare the entered password(password) and stored password(user.password)
       const passwardcompare = await bcrypt.compare(password, user.password);
       if(!passwardcompare){
            success = false;
            return res.status(400).json({success, error:"Please try to login with correct credentials."});
       }
        //If passwardcompare is true, then we give the tokens to the user for login. For this we use "npm i jsonwebtoken" or jwt tokens
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//ROUTE3 :- get loggedin user datails using : POST : '/api/auth/getuser', Login required
router.post('/getuser',fetchuser , async (req, res)=>{
    try {
        var userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})


module.exports = router;