import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nguyễn Huy Anh | Portfolio Experience",
  description: "A cinematic, scroll-driven portfolio for a world-class creative developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-white/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
