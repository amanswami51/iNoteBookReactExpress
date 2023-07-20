const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserNotes = mongoose.Schema({
    user:{  //add the user for only access own data not use data of another user.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' //collection of User.js schema.
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("notes", UserNotes);