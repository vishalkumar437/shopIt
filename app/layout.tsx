"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from './components/footer/footer'
import { useState } from 'react'
import Navbar from './components/navbar'
import AuthenticationPage from './components/authentication/page'

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
const [isLoginOpen, setLoginOpen] = useState<boolean>(false);

const handleLoginClick = () => {
  setLoginOpen(!isLoginOpen);
};
  return (
    <html lang="en">
      <head>
        <title>ShopIT</title>
        <meta name='description' content='Buy and sell products' />
      </head>
      <body className={inter.className}>
        <div style={{ display: 'flex', flexDirection: 'column'  }}>
        <div>
        <Navbar isLoginClicked = {handleLoginClick}/>
        {isLoginOpen && (
          <div className="login-popup">
            <div className="login-popup-inner">
              <AuthenticationPage isLoginClicked = {handleLoginClick}/>
            </div>
          </div>
        )}
      </div>
          <div>
            {children}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
