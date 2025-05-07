import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import MinecraftCursor from "@/components/ui/MinecraftCursor";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

// Courier is already available on most systems, so we'll define it in CSS
// and reference it as a fallback

export const metadata: Metadata = {
  title: "Jeremiah Oladele | Developer Portfolio",
  description: "A Minecraft-themed portfolio showcasing the work of Jeremiah Oladele, a developer who builds creative digital experiences.",
  keywords: ["Jeremiah Oladele", "Web Developer", "Software Engineer", "Portfolio", "Minecraft"],
  icons: {
    icon: [
      { url: '/favicon.svg' },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelifySans.variable} antialiased`}
      >
        <MinecraftCursor />
        {children}
      </body>
    </html>
  );
}
