"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from './components/footer/footer'
import Components from './Components'

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
          <Components/>
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
