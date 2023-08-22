import React from 'react'
import "./Login.css"

function Login() {
  return (
    <div className='Login-mainDiv'>
      <input type='text' placeholder='Email'></input>
      <input type='password' placeholder='Password'></input>
    </div>
  )
}

export default Login