//1. "npm i react-router-dom concurrently"
//then go to "package.json" of react and then write { "both": "concurrently \"npm run start\" \"nodemon backend/index.js\"" } in the scripts, 
//for running both "react app" and "backend api". Then write in the console "npm run both".
//2. add css and js in "public/index.html" from bootstramp.
//3. Make "components" folder in "src", for making useable components like Home.js, Navbar.js, About.js
//4. "context api" : It have two methods :- createContext(), useContext()
//Make "context" folder, then inside it make "notes" folder, then inside notes folder make two file are "noteContext.js" and "NoteState.js".
//then in "NoteState.js" file we make and provide five thing :-
//i). notes : this state is use to store all notes in frontend and then we render this state by using "map"(notes state is an array) data-
//            structure in "Notes.js" component and then render "Noteitem.js". 
//ii). addNote(c) :- We call api (backend routers) by giving them desire value(method, headers, body). 
//                   Inside body we give 'title, description, tag' we take these value from "AddNote.js" components.
//                   Then we take response from api and concate that response with "notes state" such that we take refresh value of notes at fronend. 
//                   Then use "AddNote.js" in "Notes.js" component.
//iii). getNotes(r) :-  We call fetchallnotes api and give them value(method, headers). 
//                      Then take response from this api and store response in the "notes state". 
//iv). editNote(u) :- We call updatenote api and give them value(method, headers, body) by "editNote state". 
//                    Inside body we give "title, description, tag" by "handleUpdateButton" which is inside "Notes.js" components.
//                    Then write "UI code" and update value in "notes state".
//v). deleteNote(d) :- We call deletenote api and give them value(method, headers). Then write "UI code" and then update value in "notes state".
//4. Make "Login.js" components :- call login api and give them value(method, headers, body). 
//                                  Inside body we give "email, password" we take these from "login form" by using "text state".
//                                  We store token inside "localStorage.setItem()".
//                                  We use "useNavigate()" hook to move one page to another.
//5. Make "Signup.js" components :- call createuser api and give them value(method, headers, body). 
//                                  Inside body we give "name, email, password" we take these from "signUp form" by using "text state".
//                                  We store token inside "localStorage.setItem()".
//                                  We use "useNavigate()" hook to move one page to another.
//6. Then use "Alert.js" componet in "app.js".


import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';
import './App.css';

function App() {

    //For Alert
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type)=>{
        setAlert({
          msg : message,
          type : type 
        })
        setTimeout(() => {
          setAlert(null);
        }, 1500);
    }

  return (
    <div className='app__class'>
      <NoteState>
        <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
            <Routes>
                <Route path="/" element={ <Home showAlert={showAlert}/> } />
                <Route path="/about" element={ <About /> } />
                <Route path="/login" element={ <Login showAlert={showAlert} /> } />
                <Route path="/signup" element={ <Signup showAlert={showAlert} /> } />
            </Routes>
            </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
