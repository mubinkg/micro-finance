import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Footer from '../components/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZimbaCash",
  description: "ZimbaCash - Emergency cash sent to you within 5 minutes of approval",
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
        <meta property="og:image" content="/L-1.jpg" />
        <script dangerouslySetInnerHTML={{
        __html: ` window._mfq = window._mfq || [];
        (function() {
          var mf = document.createElement("script");
          mf.type = "text/javascript"; mf.defer = true;
          mf.src = "//cdn.mouseflow.com/projects/0a52dccc-9f35-46b5-9313-3b785ae197f5.js";
          document.getElementsByTagName("head")[0].appendChild(mf);
        })();`}}>
      </script>
      </head>
      <body className={`${inter.className}`}>{children}</body>
      <Footer />
    </html>
  );
}
