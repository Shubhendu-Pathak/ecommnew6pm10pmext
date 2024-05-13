import { Field, Form, Formik } from 'formik'

import React from 'react'
import { Button } from 'react-bootstrap'
import * as yup from 'yup' 
import ReadInputErrorRegister from './ReadInputErrorRegister'
import { useAuth } from '../context-data'

function Register() {

  //context data
  let {data,setdata} = useAuth()

  let countryData=[
    {id:1,countryname:'India'},
    {id:2,countryname:'Nepal'},
    {id:3,countryname:'Bhutan'},
    {id:4,countryname:'Maldives'},
    {id:5,countryname:'Qatar'}
   
  ]

  let formValidation = yup.object({
    fullName:yup.string().required(),
    email:yup
    .string()
    .required()
    .matches( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Invalid Email Address'),
    password:yup.string().required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'),
    gender:yup.string().required('Select Any One'),
    country:yup.string().required('Select Any One'),
    receiveNewsLetters:yup.string().required('Select Any One'),
    dateOfBirth:yup.string().required()

  })

// register click
let onRegisterClick = async(para)=>{
let response = await fetch(`http://localhost:4000/users`,{method:"POST",body:JSON.stringify(para),headers:{"Content-type":"application/json"}})
if(response.ok){
  let responseBody = await response.json()
  setdata({
    ...data, 
    isLoggedIn:true,
    currentUserName:responseBody?.fullName,
    currentUserId:responseBody?.id
    })
  alert('Registration Successfull')
  // console.log(responseBody);
}else{
  alert('Registration UnSuccessfull')
}
}

  return (
    <div>
      <Formik 
validationSchema={formValidation}
initialValues={
  {email:'',
  password:'',
  fullName:'',
  gender:'',
  dateOfBirth:'',
  country:'',
  receiveNewsLetters:''}
}
onSubmit={(values)=>{
  console.log(values);
  onRegisterClick(values)
}}
 >
<Form>
  {/* name */}
  <div className="my-5">
    <label htmlFor="">UserName :: </label>
<Field type='text' name="fullName" />
<ReadInputErrorRegister name={`fullName`}/>
  </div>
  {/* email */}
  <div className="my-5">
    <label htmlFor="">UserEmail :: </label>
<Field type='text' name="email" />
<ReadInputErrorRegister name={`email`}/>
  </div>
  {/* pass */}
  <div className="my-5">
    <label htmlFor="">UserPassword :: </label>
<Field type='text' name="password" />
<ReadInputErrorRegister name={`password`}/>
  </div>
  {/* dateOfBirth */}
  <div className="my-5">
    <label htmlFor="">UserAge :: </label>
<Field type='date' name="dateOfBirth" />
<ReadInputErrorRegister name={`dateOfBirth`}/>
  </div>
  {/* country */}
  <div className="my-3">
    <label htmlFor="">Country ::</label>
    <Field name="country" as='select'>
{/* <option value=''>Select Any One</option> */}
{
  countryData.map(ele=>{
    return <option key={ele.id} value={ele.countryname}>{ele.countryname}</option>
  })
}

    </Field>
    <ReadInputErrorRegister name={`country`}/>
  </div>
  {/* gender */}
  <div className="my-5">
    <label htmlFor="">Gender :: </label>
    <label htmlFor="">MALE </label>
    <Field type='radio'  name='gender' value='male' className='ms-2 me-4'/>
    <label htmlFor="">FEMALE </label>
    <Field type='radio' name='gender'  value='female' className='ms-2 me-4'/>
    <ReadInputErrorRegister name={`gender`}/>
  </div>
  {/* recieveNewsLetter */}
  <div className="my-3">
    <label htmlFor="" className='me-3'>ReceiveNewsLetters::</label>
    <label htmlFor="">Yes</label>
    <Field className='mx-3 ' 
    type='radio' 
    name='receiveNewsLetters' 
    value='true'/>
    <label htmlFor="">No</label>
        <Field className='mx-3' 
    type='radio' 
    name='receiveNewsLetters' 
    value='false'/>
    <ReadInputErrorRegister name={`receiveNewsLetters`}/>
  </div>
{/* submit */}
<Button type='submit' variant='info' className='d-block m-auto w-75 text-light fw-bold'>RegisTER</Button>
</Form>


      </Formik>
    </div>
  )
}

export default Register