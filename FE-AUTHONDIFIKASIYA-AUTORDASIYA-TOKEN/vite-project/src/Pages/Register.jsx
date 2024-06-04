import React, { useState } from 'react'
 import {useNavigate} from "react-router-dom"
function Register() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate=useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    fetch("http://localhost:3000/user/register",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({email,password})
  })
  .then((response)=>response.json())
  .then((data)=>{console.log(data)})
  navigate("/login")
  }
  return (
    <div>
      <h1>Register Page</h1>
      <form action=""  onSubmit={handleSubmit}>
        <input value={email} onChange={(e)=>setemail(e.target.value)} type="text" />
        <br />
        <input value={password} onChange={(e)=>setpassword(e.target.value)} type="text" />
        <br />
        <button>Send</button>
      </form>
    </div>
  )
}

export default Register
