import React, { useState } from 'react'
import  Cookies from 'js-cookie'

function Login() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')




  function handleSubmit(e) {
    e.preventDefault()
    fetch("http://localhost:3000/user/login", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ email, password })
    })


      .then((response) => response.json())



      .then((data) => {
        console.log(data)
        Cookies.set('token', data.accessToken)

      })

     
  }



  return (
    <div>
      <h1>Login  Page</h1>
      <form action="" onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setemail(e.target.value)} type="text" />
        <br />
        <input value={password} onChange={(e) => setpassword(e.target.value)} type="text" />
        <br />
        <button>Send</button>
      </form>
    </div>
  )
}

export default Login
