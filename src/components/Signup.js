import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    let navigate = useNavigate();

    //use to get value from input fields
    const [text, setText] = useState({name:"", email:"", password:"", cpassword:""})
    const onChange = (e)=>{
        setText({...text, [e.target.name]: e.target.value})
    }

    //handle submit button
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //API call
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers:{
                'content-Type': 'application/json'},
            body: JSON.stringify({name:text.name, email: text.email, password: text.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the auth token
            localStorage.setItem('token', json.authtoken);
            //redirect
            navigate("/");
            props.showAlert("Account created successfully", "success");
        }
        else{
           props.showAlert("Invalid credentials", "danger");
        }
    }


  return (
    <div className='container' style={{height:"100vh"}}>
        <h2>Create an Account to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" onChange={onChange} className="form-control" id="name" name="name" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" onChange={onChange} className="form-control" id="password" name="password" minLength={3} required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" onChange={onChange} className="form-control" id="cpassword" name="cpassword" minLength={3} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
