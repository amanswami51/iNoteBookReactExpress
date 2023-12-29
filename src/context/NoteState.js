import React, { useState, createContext } from 'react';

const noteContext = createContext();

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([]);

    //*****************get all Note(or fetch all notes)*****************
    const getNotes = async ()=>{
      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers:{
          'content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json); //store response in "notes" array.
    }

    //*****************Add a Note*****************
    const addNote = async (title, description, tag)=>{
      //API call
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers:{
          'content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      setNotes(notes.concat(json))  //concat response  with "notes state", then change "notes state"
    }

    //******************Delete a Note******************
    const deleteNote = async (id)=>{
      //API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers:{
          'content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      // eslint-disable-next-line
      const json = response.json();

      //UI code
      const b = notes.filter((j)=>{return j._id!==id})
      setNotes(b);
    }

    //*******************Edit a Note*******************
    const editNote = async (id, title, description, tag)=>{
      //API call
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers:{
          'content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });

      //UI code
      //Logic to edit in client side
      let newNotes = JSON.parse(JSON.stringify(notes)) 
      for(let i=0; i<newNotes.length; i++){
        const element = notes[i];
        if(element._id === id){
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
          {props.children}
        </noteContext.Provider>
  )
}

export default NoteState;
export {noteContext};