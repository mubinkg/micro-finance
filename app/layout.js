import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Footer from '../components/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZimbaCash",
  description: "A Microfinace App",
  icons: [
    {
      rel: 'icon',
      type: 'image/jpg',
      sizes: '32x32',
      url: '/favicon-32X32.jpg',
    },
    {
      rel: 'icon',
      type: 'image/jpg',
      sizes: '16x16',
      url: '/favicon-16x16.jpg',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="ZU1VWY_mpCbIdH0IZEqzEAFwCy8j7xDd1TECex57P6M" />
      </head>
      <body className={`${inter.className}`}>{children}</body>
      <Footer/>
    </html>
  );
}
