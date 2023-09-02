import React, { useState, useContext} from 'react';
import noteContext from "../context/notes/noteContext";

const UpdateNote = (props) => {
    //use universal state by using context api
    const c = useContext(noteContext);
    const {editNote} = c;
//***for update note***{
    const [text, setText] = useState({id: "", etitle:"", edescription:"", etag:""})

    //For editButton in Noteitem.js
    // eslint-disable-next-line
    const editButton = ()=>{
        setText({id: props.note._id, etitle: props.note.title, edescription: props.note.description, etag: props.note.tag})
    }
    
    //use to perform submit button in form to add new note
    const handleUpdateButton = ()=>{
        editNote(text.id, text.etitle, text.edescription, text.etag)
        // props.showAlert("Updated successfully", "success");
    }

    //use to get value from input fields
    const onChange = (e)=>{
        setText({...text, [e.target.name]: e.target.value})
    }
//***for update note***}

  return (
    <div>
        <div className="container my-3">
            <h2>Update the notes</h2>
            <form>
            <div className="form-group">
                <label htmlFor="etitle">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={text.etitle} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="edescription">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={text.edescription} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="etag">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" aria-describedby="emailHelp" value={text.etag} onChange={onChange} />
            </div>
            <button type="submit" disabled={text.etitle.length<5 || text.edescription.length<5} className="btn btn-primary my-3" onClick={handleUpdateButton}>Edit Note</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateNote
