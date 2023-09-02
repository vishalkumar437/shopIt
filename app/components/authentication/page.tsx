import React, { useState } from 'react'
import Register from './Register';
import Login from './login';
export default function AuthenticationPage({isLoginClicked}:any) {
    const [isLoginPage,setPage] = useState<boolean>(true);
    const handleauthPage = ()=>{
        setPage(!isLoginPage);
    }
  return (
    <div>
        {isLoginPage?<Login isLogin={handleauthPage} isLoginClicked={isLoginClicked}/>:<Register isLogin={handleauthPage} isLoginClicked={isLoginClicked}/>}
    </div>
  )
}
