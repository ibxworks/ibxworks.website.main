import type React from "react"
import type { Metadata } from "next"
import { Nunito_Sans, Orbitron } from "next/font/google"
import "./globals.css"

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
})

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "IBX - Engineers and Scientists",
  description: "A group of eeengineers and scientists who build stuff, often cool or funny",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunitoSans.className} ${orbitron.variable}`}>{children}</body>
    </html>
  )
}
