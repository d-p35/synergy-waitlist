import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synergy Waitlist",
  description: "Don't miss out",
  icons: {
    icon: "/syn-favi.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <head>
        <link rel="icon" href="/syn-favi.png"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
