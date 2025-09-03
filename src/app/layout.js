import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Plasma from "@/Backgrounds/Plasma/Plasma";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Magma Resume Generator",
  description: "Magma Resume Generator is an AI-powered platform that helps you effortlessly create professional resumes. Simply provide your details, and our intelligent system will generate a tailored resume to showcase your skills and experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        <div style={{ position: 'fixed', inset: 0, zIndex: -10 }}>
          <Plasma mouseInteractive={false} />
        </div>
        <main>
          <Navbar/>
          {children}
          <Footer/>
        </main>
      </body>
    </html>
  );
}
