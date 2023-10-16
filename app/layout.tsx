"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { GridProvider } from './context/GridContext'

const quicksand = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Carcassonne',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} bg-slate-800 select-none`}>
        <GridProvider>
          {children}
        </GridProvider>
      </body>
    </html>
  )
}
