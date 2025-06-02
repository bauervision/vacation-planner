import type { Metadata } from "next";
import { Geist, Geist_Mono, Lilita_One } from "next/font/google";
import "./globals.css";
import PageFade from "./components/PageFade";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita-one",
});

export const metadata: Metadata = {
  title: "Vacation Planner",
  description: "Bauervision Portfolio App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lilitaOne.variable} overflow-x-hidden bg-neutral-900 text-white min-h-screen antialiased`}
      >
        <PageFade>{children}</PageFade>
      </body>
    </html>
  );
}
