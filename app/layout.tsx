import "./globals.css"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Dancing_Script, Satisfy } from "next/font/google"
import localFont from 'next/font/local'
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing-script" })
const satisfy = Satisfy({ subsets: ["latin"], variable: "--font-satisfy", weight: ["400"] })
const moontime = localFont({ src: '../public/fonts/Moontime-Regular.ttf', variable: "--font-moontime" })

export const metadata: Metadata = {
  title: 'HERNetworking Hub - A Community for Women in Business',
  description: 'A powerful community for women in business and aspiring entrepreneurs to connect, collaborate, and thrive together.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} ${satisfy.variable} ${moontime.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
