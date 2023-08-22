"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import { useState } from 'react'
import User from "./Login/page"
import Login from './Login/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopIT',
  description: 'Buy and sell products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeComponent, setActiveComponent] = useState<String>("landing");
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Navbar setActiveComponent={setActiveComponent} />
        </div>
        <div>{activeComponent === "login" && <Login/>}</div>
        <div>{children}</div>
       
        </body>
    </html>
  )
}
