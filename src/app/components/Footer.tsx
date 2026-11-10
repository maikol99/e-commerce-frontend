import React from "react";
import Link from "next/link";
import { Clock, Facebook, HeadphonesIcon, Instagram, Shield, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">SOBRE NOSOTROS</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">
                <Link href="/about-us" className="hover:text-white">
                  Sobre Nosotros
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/about-us" className="hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              ENLACES ÚTILES
            </h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">
                <Link href="/how-it-work" className="hover:text-white">
                  ¿Cómo funciona?
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/books" className="hover:text-white">
                  Catálogo de Libros
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">POLÍTICAS</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">
                <Link href="/terms-of-user" className="hover:text-white">
                  Términos y Condiciones
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/privacy-policy" className="hover:text-white">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              CONECTATE CON NOSOTROS
            </h3>
            <div className="mb-4 flex space-x-4">
              <Link href="#" className="hover:text-white" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </Link>

              <Link href="#" className="hover:text-white" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </Link>

              <Link href="#" className="hover:text-white" aria-label="Youtube">
                <Youtube className="h-6 w-6" />
              </Link>

              <Link href="#" className="hover:text-white" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-sm">
              BookKart es la plataforma para comprar y vender libros usados a precios súper accesibles en Argentina. Libros universitarios, escolares, novelas y mucho más cerca tuyo.
            </p>
          </div>
        </div>
        {/* feature section*/}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              
              <div className="flex items-center gap-4 rounded-xl p-6 shadow-sm"> 
                <div className="rounded-full p-3 bg-white/5">
                  <Shield className="w-6 h-6 text-white"/>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Pago Seguro</h3>
                  <p className="text-sm text-gray-400">Transacciones 100% protegidas</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl p-6 shadow-sm"> 
                <div className="rounded-full p-3 bg-white/5">
                  <Clock className="w-6 h-6 text-white"/>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Confianza BookKart</h3>
                  <p className="text-sm text-gray-400">Tu dinero se transfiere tras recibir el libro</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl p-6 shadow-sm"> 
                <div className="rounded-full p-3 bg-white/5">
                  <HeadphonesIcon className="w-6 h-6 text-white"/>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Atención al Cliente</h3>
                  <p className="text-sm text-gray-400">Soporte disponible para ayudarte</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BookKart. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <Image
              src='/icons/visa.svg'
              alt='visa'
              height={30}
              width={50}
              className="filter brightness-20 invert"
            />
            <Image
              src='/icons/rupay.svg'
              alt='rupay'
              height={30}
              width={50}
              className="filter brightness-20 invert"
            />
            <Image
              src='/icons/paytm.svg'
              alt='paytm'
              height={30}
              width={50}
              className="filter brightness-20 invert"
            />
            <Image
              src='/icons/upi.svg'
              alt='upi'
              height={30}
              width={50}
              className="filter brightness-20 invert"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
