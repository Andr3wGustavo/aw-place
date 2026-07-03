import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import AudioPlayer from "./components/AudioPlayer";
import { AudioProvider } from "./context/AudioContext";

export const metadata: Metadata = {
  title: "AWPLACE DOG | Web3 Beat Store",
  description: "Premium Decentralized Beat Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AudioProvider>
          {children}
          {/* Componente Global de Áudio injetado na raiz do site */}
          <AudioPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
