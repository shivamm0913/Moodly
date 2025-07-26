import { Chicle, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fugaz = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Moodly",
  description: "Track your daily moood every day of the year!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${openSans.variable} antialiased w-full max-w-[1300px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
