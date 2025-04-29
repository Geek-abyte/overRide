import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeremiah Oladele | Full Stack Developer",
  description: "Portfolio website of Jeremiah Oladele, showcasing creative projects and skills",
  keywords: ["developer", "portfolio", "jeremiah oladele", "software engineer", "web development"],
  authors: [{ name: "Jeremiah Oladele" }],
};

import ClientCursorWrapper from '@/components/ClientCursorWrapper';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <PageTransition />
        {children}
        
        {/* CustomCursor is client component */}
        <div id="custom-cursor" suppressHydrationWarning>
          {typeof window === 'undefined' ? null : <ClientCursorWrapper />}
        </div>
      </body>
    </html>
  );
}
