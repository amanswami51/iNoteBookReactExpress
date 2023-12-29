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
            headers:{'content-Type': 'application/json'},
            body: JSON.stringify({email: text.email, password: text.password})
        });
        const json = await response.json();
        
        if(json.success){
            localStorage.setItem('token', json.authtoken);  //save the auth token in localstorage
            navigate("/");  //redirect to home page
            props.showAlert("Logged in successfully", "success");
        }
        else{
            props.showAlert(json.error, "danger");   
        }
    }


  return (
    <div className='container' style={{height:"100vh"}}>
        <h2>Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" onChange={onChange} className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login


//rafce
