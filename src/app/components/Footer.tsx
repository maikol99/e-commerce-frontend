import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Facebook,
  HeadphonesIcon,
  Instagram,
  ShieldCheck,
  Twitter,
  Youtube,
  CreditCard,
  Building2,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800/80">
      <div className="container mx-auto px-4 py-14">
        {/* FILA SUPERIOR: LINKS Y COLUMNAS */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-gray-800">
          {/* COLUMNA 1: LOGO E IDENTIDAD (2 columnas en desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/images/web-logo.png"
                alt="BookKart"
                width={150}
                height={40}
                className="h-9 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              El marketplace líder para comprar y vender libros usados en Argentina.
              Dale una segunda vida a tus lecturas, ahorrá dinero y conectate con una
              comunidad de lectores y estudiantes de todo el país.
            </p>
            {/* Redes Sociales */}
            <div className="flex items-center space-x-3 pt-2">
              <Link
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all text-gray-400"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all text-gray-400"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all text-gray-400"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all text-gray-400"
                aria-label="Youtube"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* COLUMNA 2: SOBRE NOSOTROS */}
          <div>
            <h3 className="mb-4 text-xs font-bold text-orange-500 uppercase tracking-wider">
              Sobre Nosotros
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">
                  Contacto y Soporte
                </Link>
              </li>
              <li>
                <Link href="/how-it-work" className="text-gray-400 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: ENLACES ÚTILES */}
          <div>
            <h3 className="mb-4 text-xs font-bold text-orange-500 uppercase tracking-wider">
              Comunidad
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/books" className="text-gray-400 hover:text-white transition-colors">
                  Catálogo de Libros
                </Link>
              </li>
              <li>
                <Link href="/book-sell" className="text-gray-400 hover:text-white transition-colors">
                  Vender un Libro
                </Link>
              </li>
              <li>
                <Link href="/how-it-work" className="text-gray-400 hover:text-white transition-colors">
                  ¿Cómo Funciona?
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: POLÍTICAS */}
          <div>
            <h3 className="mb-4 text-xs font-bold text-orange-500 uppercase tracking-wider">
              Legales
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms-of-user" className="text-gray-400 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <span className="text-xs text-gray-500 block pt-1">
                  Envíos protegidos a todo el territorio argentino.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* FILA MEDIA: PROMESAS DE VALOR (3 CARDS) */}
        <div className="py-10 grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl p-5 bg-white/[0.03] border border-white/5 hover:border-orange-500/20 transition-all">
            <div className="rounded-xl p-3 bg-orange-500/10 text-orange-500 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Pago Protegido</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Transacciones seguras y fondos resguardados hasta la entrega.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl p-5 bg-white/[0.03] border border-white/5 hover:border-orange-500/20 transition-all">
            <div className="rounded-xl p-3 bg-orange-500/10 text-orange-500 flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Confianza BookKart</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Compradores y vendedores verificados de la comunidad.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl p-5 bg-white/[0.03] border border-white/5 hover:border-orange-500/20 transition-all">
            <div className="rounded-xl p-3 bg-orange-500/10 text-orange-500 flex-shrink-0">
              <HeadphonesIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Atención al Cliente</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Soporte personalizado ante cualquier duda con tu pedido.
              </p>
            </div>
          </div>
        </div>

        {/* FILA INFERIOR: COPYRIGHT Y MEDIOS DE PAGO LATAM */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row gap-5 justify-between items-center text-xs">
          <p className="text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} BookKart Argentina. Todos los derechos reservados.
          </p>

          {/* Métodos de Pago América Latina */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-[11px] text-gray-500 font-medium mr-1 hidden sm:inline">
              Medios de pago aceptados:
            </span>

            {/* Visa */}
            <div className="h-8 px-3 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center font-extrabold italic text-white tracking-wider text-xs shadow-sm hover:bg-white/15 transition-all">
              VISA
            </div>

            {/* Mastercard */}
            <div className="h-8 px-2.5 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center gap-1 shadow-sm hover:bg-white/15 transition-all">
              <span className="flex -space-x-1.5 items-center">
                <span className="w-4 h-4 rounded-full bg-[#EB001B] inline-block"></span>
                <span className="w-4 h-4 rounded-full bg-[#F79E1B] inline-block opacity-90"></span>
              </span>
              <span className="text-[10px] font-bold text-white ml-1">mastercard</span>
            </div>

            {/* Mercado Pago */}
            <div className="h-8 px-2.5 rounded-lg bg-[#009EE3]/20 border border-[#009EE3]/40 flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#009EE3]/30 transition-all text-[#009EE3]">
              <span className="font-bold text-xs tracking-tight">mercado</span>
              <span className="font-normal text-xs text-white">pago</span>
            </div>

            {/* American Express */}
            <div className="h-8 px-2.5 rounded-lg bg-[#0070CE]/20 border border-[#0070CE]/40 flex items-center justify-center text-[10px] font-black text-white tracking-widest shadow-sm hover:bg-[#0070CE]/30 transition-all">
              AMEX
            </div>

            {/* Transferencia / CBU / Débito */}
            <div className="h-8 px-2.5 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center gap-1.5 text-gray-300 hover:bg-white/15 transition-all">
              <Building2 className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[10px] font-semibold text-gray-200">Transferencia / Débito</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
