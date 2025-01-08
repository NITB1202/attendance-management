import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "../../context/AuthContext";
import LocalizationWrapper from "../../component/LocalizationWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attendance Management",
  description: "Website for managing attendance",
  icons:{
    icon: "/icon.png"
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocalizationWrapper>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LocalizationWrapper>
      </body>
    </html>
  );
}
