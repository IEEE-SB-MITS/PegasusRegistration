import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./common/Navbar";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Register Team",
  description: "Register your team for the event",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Head>
          <title>Register Team</title>
        </Head>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
