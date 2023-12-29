import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    let navigate = useNavigate();

    //use to get value from input fields
    const [text, setText] = useState({name:"", email:"", password:""})
    const handleOnChangefun = (e)=>{
        setText({...text, [e.target.name]: e.target.value})
    }

    //handle submit button
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //API call
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers:{'content-Type': 'application/json'},
            body: JSON.stringify({name:text.name, email: text.email, password: text.password})
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token', json.authtoken);  //save the auth token in localstorage
            navigate("/"); //redirect to home page
            props.showAlert("Account created successfully", "success");
        }
        else{
           props.showAlert(json.error, "danger");
        }
    }


  return (
    <div className='container' style={{height:"100vh"}}>
        <h2>Create an Account to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" onChange={handleOnChangefun} className="form-control" id="name" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" onChange={handleOnChangefun} className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" onChange={handleOnChangefun} className="form-control" id="password" minLength={3} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
