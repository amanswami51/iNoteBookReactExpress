const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');


//ROUTE 1 :- Get All the Notes using: GET "api/notes/fetchallnotes". Login required 
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try{
        const notes = await Notes.find({user: req.user.id})
        res.json(notes);    
    } 
    catch(error){
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})


//ROUTE 2 :- add a new Note using: POST "api/notes/addnote". Login required 
router.post('/addnote', fetchuser, [
    body('title', 'Enter the valid title').isLength({ min: 3 }), 
    body('description','Enter the description atleat 5 lenght').isLength({ min: 5 })], 
    async (req, res)=>{

    try{
        //***validation, If there are errors, return bad request and errors***.
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {title, description, tag} = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);   
    } 
    catch(error){
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
});

//ROUTE 3 :- Update an existing Note using: PUT "api/notes/updatenote". Login required 
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    try {
        //Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){   //"note.user.toString()", This is that user which is in "Notes.js" model. "req.user.id", This is that user which is loged-in and extract from "authtoken" by using "fetchuser" function.
            return res.status(401).send("Note Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
            
    } 
    catch(error){
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }

});

//ROUTE 4 :- delete an existing Note using: DELETE "api/notes/deletenote". Login required 
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {
        //Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        //Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){   //"note.user.toString()", This gives the Id of notes. 
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({Success:"Note has been deleted",note:note});
            
    } 
    catch(error){
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }

});
module.exports = router;