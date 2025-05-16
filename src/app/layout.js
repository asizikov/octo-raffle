import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Octocat Raffle - Prize Wheel",
  description: "A fun and interactive wheel to randomly select winners for your raffle or contest",
  keywords: "raffle, prize wheel, random selection, octocat, github",
  icons: {
    icon: '/octocat-favicon.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/octocat-favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen pb-16`}
      >
        <main>
          <div className="flex justify-center py-4">
            <img src="/octocat.png" alt="Octocat" className="h-16 w-16" />
          </div>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
