import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context-data';

function Login() {

let [logindata,setLoginData] = useState({
  email:'scott@test.com',password:'Scott123'
})

// navigate
let navi = useNavigate()

// context data
let {data,setdata} = useAuth()

// recieve navigate data from restricted routes
let location = useLocation()

let redirectPath = location.state?.path || '/'

let handleChange = (e)=>{
  setLoginData(
    {...logindata,[e.target.name]:e.target.value}
  )
}


// toatify
//success
let notifySuccess = () => toast.success('🦄 LOGIN SUCCESSFULL!', {

  position: "top-center",
  autoClose: 4999,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark"
  
  });

  let notifyfail = () => toast.error('🦄 LOGIN UNSUCCESSFULL!', {
    position: "top-center",
    autoClose: 4999,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  
    });





// onLoginClick

let onLoginClick = async() =>{
let response = await fetch(`http://localhost:4000/users?email=${logindata.email}&password=${logindata.password}`,{method:'GET'})
// console.log(response);
if(response.ok){
  let responseBody = await response.json()
  // console.log(responseBody);
  if(responseBody.length>0){
    // console.log(responseBody);

setdata({
...data, 
isLoggedIn:true,
currentUserName:responseBody[0]?.fullName,
currentUserId:responseBody[0]?.id
})
    // console.log('LOGIN SUCCESS');
    notifySuccess()
    setTimeout(() => {
      // navi(redirectPath,{replace:true})
      navi('/store',{replace:true})
    }, 2000);
  }else{
    // console.log('LOGIN FAILed');
    notifyfail()
  }
}
}


  return (
    <div>
      <h3 className='display-5 border-bottom border-4 border-success w-25 p-3'>Login</h3>
      <InputGroup className="mb-3 w-50 m-auto my-5">
        <InputGroup.Text id="basic-addon1"
        
        >UserEmail</InputGroup.Text>
        <Form.Control
        value={logindata.email}
        name='email'
        onChange={handleChange}
          placeholder="UserEmail"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3 w-50 m-auto my-5">
        <InputGroup.Text id="basic-addon1">UserPassword</InputGroup.Text>
        <Form.Control
          value={logindata.password}
          name='password'
          onChange={handleChange}
          placeholder="UserPassword"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <button 
      disabled={!logindata.password && !logindata.email}
      onClick={onLoginClick}
      className="btn btn-success d-block w-25 m-auto my-5 py-3 fs-4 ">LOGIN</button>
      <ToastContainer
position="top-center"
autoClose={4999}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>
    </div>
  )
}

export default Login