import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keep these even if unused to avoid breaking existing imports if any
import { Inter } from "next/font/google"; // Adding Inter just in case, or stick to what was there
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoodTrip AI",
  description: "Travel plans based on your mood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
