import React, { useContext } from 'react'
import {noteContext} from '../context/NoteState'

const Noteitem = (props)=>{
  const c = useContext(noteContext);
  const {deleteNote} = c;
  return (
      <div className="card my-3 mx-3" style={{maxWidth:"20vw"}}>
          <h4 className="card-title mx-2">{props.note.title}</h4>
          <h6 className="card-title mx-2">{props.note.tag}</h6>
          <p className="card-text mx-2">{props.note.description}</p>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(props.note._id); props.showAlert("note deleted successfully", "success")}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{props.editButton(props.note)}}></i>
      </div>
  )
}

export default Noteitem;