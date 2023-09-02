import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

    let navigate = useNavigate();

    //use to get value from input fields
    const [text, setText] = useState({email:"", password:""})
    const onChange = (e)=>{
        setText({...text, [e.target.name]: e.target.value})
    }
    
    //handle submit button
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //API call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers:{
              'content-Type': 'application/json'},
            body: JSON.stringify({email: text.email, password: text.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the auth token
            localStorage.setItem('token', json.authtoken);
            //redirect
            props.showAlert("Logged in successfully", "success");
            navigate("/");
        }
        else{
            props.showAlert("Invalid details", "danger");        }
    }


  return (
    <div style={{height:"100vh"}}>
        <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" value={text.email} onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value={text.password} onChange={onChange} className="form-control" id="password" name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login


//rafce
