import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import "./globals.css";
import "@fontsource/tomorrow/100.css";
import "@fontsource/tomorrow/200.css";
import "@fontsource/tomorrow/300.css";
import "@fontsource/tomorrow/400.css";
import "@fontsource/tomorrow/500.css";
import "@fontsource/lato";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Affliate Hub",
  description: "Affliate Hub listing  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies })

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${rubik.variable} antialiased`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}


