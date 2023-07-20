import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem"
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props)=>{

    let navigate = useNavigate();

    //use universal state by using context api
    const c = useContext(noteContext);
    const {notes, getNotes, editNote} = c;

    //for fetch notes, useEffect is use to refresh the "getNotes()" repeatatly
    useEffect(()=>{
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

//***for update note***{
    const [text, setText] = useState({id: "", etitle:"", edescription:"", etag:""})
    const ref = useRef(null);
    const refClose = useRef(null);

    //For editButton in Noteitem.js
    const editButton = (currentNote)=>{
        ref.current.click();
        setText({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    
    //use to perform submit button in form to add new note
    const handleUpdateButton = (e)=>{
        refClose.current.click();
        editNote(text.id, text.etitle, text.edescription, text.etag)
        props.showAlert("Updated successfully", "success");
    }

    //use to get value from input fields
    const onChange = (e)=>{
        setText({...text, [e.target.name]: e.target.value})
    }
//***for update note***}
    return(
        <>
        <AddNote showAlert={props.showAlert} />


        {/* Give title, description, tag, id to editNote function which is inside "NoteState.js" */}
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" value={text.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" value={text.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" value={text.etag} className="form-control" id="etag" name="etag" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={text.etitle.length<5 || text.edescription.length<5} onClick={handleUpdateButton} className="btn btn-primary">Update Note</button>
            </div>
            </div>
        </div>
        </div>



        <h2>Your Notes</h2>
        <div className="row">
            <div className="container">
                {notes.length===0 && 'No notes to display'}
            </div>
            {notes.map((x)=>{
                return <Noteitem key={x._id} editButton={editButton} showAlert={props.showAlert} note={x}/>
            })}
        </div>
        </>
    );
}

export default Notes;

