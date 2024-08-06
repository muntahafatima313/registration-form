import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({firstName:"",lastName:"",email:"",password:"",conPassword:""});
  const [errors,setErrors]=useState({})
  function handleChange(event){
    const {name,value}=event.target
    setFormData({
            ...formData,
            [name]:value
    })
  }

  
  function handleSubmit(event){
    event.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validationErrors={}
    if(!formData.firstName){
      validationErrors.firstName="FirstName is required"
    }

    if(!formData.lastName){
      validationErrors.lastName="LastName is required"
    }

    if(!formData.email){
      validationErrors.email="Email is required"
    }
    else if(!emailRegex.test(formData.email)){
      validationErrors.email="Email is not valid"
    }

    if(!formData.password){
      validationErrors.password="Password is required"
    }
    else if(formData.password.length<5){
      validationErrors.password="Password should be at least 5 char"
    }

    if(!formData.conPassword){
      validationErrors.conPassword="Confirm Password is required"
    }
    else if(formData.conPassword !== formData.password){
      validationErrors.conPassword="Password doesn't match"
    }

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length===0){
      fetch('http://localhost:3001/submit',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response=>{
        if(response.ok){
          return response.text();
        }
        throw new Error('Netwrok response not ok')
      })
      .then(message=>{
        alert(message);
        setFormData({firstName:'',lastName:'',email:'',password:'',conPassword:''})
      })
      .catch(error=>{
        console.error('Fetch error:', error);
      }
      )
    }
  }


  return (
    <form className="regForm" onSubmit={handleSubmit}>
      <h1>Registration Form</h1>
      <input type="text" placeholder="First Name" name="firstName" value={formData.firstName}  onChange={handleChange}/>
      {errors && <span>{errors.firstName}</span>}
      <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName}  onChange={handleChange}/>
      {errors && <span>{errors.lastName}</span>}
      <input type="email" placeholder="Email Address" name="email" value={formData.email}  onChange={handleChange}/>
      {errors && <span>{errors.email}</span>}
      <input type="password" placeholder="Password" name="password" value={formData.password}  onChange={handleChange}/>
      {errors && <span>{errors.password}</span>}
      <input type="password" placeholder="Confirm Password" name="conPassword" value={formData.conPassword}  onChange={handleChange}/>
      {errors && <span>{errors.conPassword}</span>}
      <button>Submit</button>
    </form>
  );
}
