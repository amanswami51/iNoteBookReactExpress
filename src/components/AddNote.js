import React, { useContext, useState } from "react";
import {noteContext} from "../context/NoteState";

const AddNote = (props) => {

    //Access variable and functionn from noteContext
    const c = useContext(noteContext);
    const {addNote} = c;

    //use to get value from input fields
    const [text, setText] = useState({title:"", description:"", tag:""})
    const onChange = (e)=>{
        setText({...text, [e.target.name]: e.target.value})
    }
    
    //use to perform submit button in form to add new note
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(text.title, text.description, text.tag);
        
        setText({title:"", description:"", tag:""}) //this is use to empty all the fields after adding notes.
        props.showAlert("Note added successfully", "success");
    }

  return (
    <div className="container my-3">
        <h2>Add the notes</h2>
        <form>
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" onChange={onChange} value={text.title} id="title" className="form-control"  aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" onChange={onChange} value={text.description} className="form-control" id="description"/>
        </div>
        <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" name="tag" onChange={onChange} value={text.tag} className="form-control" id="tag" aria-describedby="emailHelp" />
        </div>
        <button type="submit" disabled={text.title.length<5 || text.description.length<5} className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
        </form>
  </div>
  )
}

export default AddNote


//rafc