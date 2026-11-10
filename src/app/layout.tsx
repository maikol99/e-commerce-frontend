import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import  Header  from "./components/Header";
import Footer from "./components/Footer";
import LayoutWrapper from "./LayoutWrapper";

const geistSans = ({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto_Mono = Roboto_Mono({
  subsets: ["latin"],
  display:'swap'
});

export const metadata: Metadata = {
  title: "BookKart - Comprá y Vendé Libros Usados en Argentina",
  description: "Plataforma de compra y venta de libros usados en Argentina. Encontrá novelas, libros universitarios, escolares y más a precios accesibles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={roboto_Mono.className}
      >
        <LayoutWrapper>
        <Header/>
        {children}
        <Footer/>
        </LayoutWrapper>
      </body>
    </html>
  );
}
