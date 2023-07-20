import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {

    //Access universal state by using context api
    const c = useContext(noteContext);
    const {addNote} = c;

    //this is local state
    const [text, setText] = useState({title:"", description:"", tag:""})
    
    //use to perform submit button in form to add new note
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(text.title, text.description, text.tag);
        setText({title:"", description:"", tag:""}) //this is use to empty all the fields after adding notes.
        props.showAlert("Note added successfully", "success");
    }

    //use to get value from input fields
    const onChange = (e)=>{
        setText({...text, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
        <h2>Add the notes</h2>
        <form>
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={text.title} onChange={onChange} />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={text.description} onChange={onChange} />
        </div>
        <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" value={text.tag} onChange={onChange} />
        </div>
        <button type="submit" disabled={text.title.length<5 || text.description.length<5} className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
        </form>
  </div>
  )
}

export default AddNote


//rafc