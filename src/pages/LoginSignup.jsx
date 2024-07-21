import React, { useState } from 'react'
import Swal from 'sweetalert2'
import'./css/Login.css';
const LoginSignup = () => {


  const [state,setState]=useState("Login");

  const [formData,setFormaData]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler=(e)=>{
    setFormaData({...formData,[e.target.name]:e.target.value})
  }

  const login=async()=>{
    console.log("Login function executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:"POST",
      headers:{
        Accept:'application/form-data',
        "Content-Type":'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success)
    {
      localStorage.setItem('auth-token',responseData.token);
      Swal.fire({
        title: 'Login Successful',
        text: 'You have been successfully logged in.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.replace("/");
      });
    }
    else{
      Swal.fire({
        title: 'Login Failed',
        text: responseData.errors,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

  }

  const signup=async()=>{
    console.log("Signup function exceuted",formData);

    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:"POST",
      headers:{
        Accept:'application/form-data',
        "Content-Type":'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success)
    {
      localStorage.setItem('auth-token',responseData.token);
      Swal.fire({
        title: 'Signup Successful',
        text: 'You have been successfully registered.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.replace("/");
      });
    }
    else{
      Swal.fire({
        title: 'Signup Failed',
        text: responseData.errors,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      
    }
  }

  
  return (
    
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
       {state==='Sign Up'? <input  name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your name'/>:<></>}  
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address'/>
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='password'/>

        </div>
        <button onClick={()=>{state==='Login'?login():signup()}}>Continue</button>
        {state==='Sign Up'?<p >Already  an account?<span className='loginsignup-login' onClick={()=>{setState("Login")}}>Login here</span></p>
:<p >Create  an account <span className='loginsignup-login' onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
                <div className="logsig-agrre">
          <input type='checkbox' name='' id=''/>
          <p>By Continuing agree to terms and policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup