import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Playfair_Display } from "next/font/google";
import TopBar from "@/components/TopBar/TopBar";
import NavBar from "@/components/NavBar/NavBar";
import { AuthProvider } from "@/context/AuthContext";
import Head from 'next/head'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stroberi Writes",
  description: "A personal blog sharing original English literature, creative writing, poetry, and short stories. Explore heartfelt stories and literary musings.",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // Choose the weights you need
  variable: "--font-playfair", // Optional: for use with CSS variables
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/STRAWBERRY.png" />
      <body
        className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider>
          <TopBar />
          <NavBar />
          {children}
        </AuthProvider>
      </body>
      </head>
    </html>
  );
}
