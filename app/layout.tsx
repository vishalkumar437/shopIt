"use client"// Import necessary dependencies
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import { useState } from 'react'
import Login from './login/page'
import Footer from './components/footer/footer'

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
  return (
    <html lang="en">
      <head>
        {/* Include metadata and other head elements */}
      </head>
      <body className={inter.className}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '92.2vh' }}>
          <div>
            <Navbar />
          </div>
          <div style={{ backgroundColor:"lightgrey", flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
