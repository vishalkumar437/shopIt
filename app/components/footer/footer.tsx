import React from 'react'
import "./footer.css"
import logo from "../assets/logo.png"
import Image from 'next/image'
function Footer() {
  return (
    <div className='Footer-mainContainer'>
        <div className='Footer-logo'>
            <Image className='Footer-logo' src={logo} alt="Vishal"/>
        </div>
    </div>
  )
}

export default Footer