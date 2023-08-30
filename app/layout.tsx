"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import Footer from './components/footer/footer'
import Home from './home/page'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>ShopIT</title>
        <meta name='description' content='Buy and sell products' />
      </head>
      <body className={inter.className}>
        <div style={{ display: 'flex', flexDirection: 'column'  }}>
          <div>
            <Navbar />
          </div>
          <div>
            <Home/>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
