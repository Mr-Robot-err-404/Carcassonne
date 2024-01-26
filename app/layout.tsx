"use client"

import './globals.css'
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} bg-slate-800 select-none`}>
          {children}
      </body>
    </html>
  )
}
