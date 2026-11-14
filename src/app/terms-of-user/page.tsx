"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  BookOpen,
  UserCheck,
  AlertTriangle,
  Scale,
  RefreshCw,
  Mail,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfUse() {
  const lastUpdated = "14 de Noviembre de 2024";

  const sections = [
    {
      id: "aceptacion",
      title: "1. Aceptación de los Términos",
      icon: Scale,
      content: (
        <>
          <p>
            Al registrarte, navegar o utilizar la plataforma de <strong>BookKart Argentina</strong> (&ldquo;el Sitio&rdquo;), 
            aceptás de forma plena y sin reservas estos Términos y Condiciones. 
            Si no estás de acuerdo con alguna de las cláusulas, debés abstenerte de utilizar nuestros servicios.
          </p>
          <p className="mt-2">
            BookKart es un marketplace que conecta a personas interesadas en comprar y vender libros usados, académicos y novelas 
            dentro del territorio de la República Argentina.
          </p>
        </>
      ),
    },
    {
      id: "registro",
      title: "2. Registro y Seguridad de la Cuenta",
      icon: UserCheck,
      content: (
        <>
          <p>
            Para publicar libros a la venta o realizar compras podés registrarte mediante correo electrónico o a través de tu cuenta de Google.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>Sos el único responsable de la confidencialidad de tu contraseña y de toda actividad realizada desde tu cuenta.</li>
            <li>Debés proporcionar información veraz, exacta y actualizada (nombre real, correo electrónico y teléfono de contacto para coordinar entregas).</li>
            <li>BookKart se reserva el derecho de suspender o dar de baja cuentas que infrinjan normas comunitarias o cometan fraudes.</li>
          </ul>
        </>
      ),
    },
    {
      id: "publicacion",
      title: "3. Publicación y Venta de Libros",
      icon: BookOpen,
      content: (
        <>
          <p>
            Como vendedor en BookKart, te comprometés a cumplir con los siguientes estándares de honestidad:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li><strong>Estado real del ejemplar:</strong> Debés informar con precisión el estado del libro (Nuevo, Como nuevo, Buen estado, Con detalles) y aclarar si tiene hojas subrayadas, faltantes o marcas.</li>
            <li><strong>Fotografías auténticas:</strong> Las imágenes subidas deben ser fotos reales del libro que tenés en tu poder, no capturas genéricas de internet.</li>
            <li><strong>Contenido prohibido:</strong> No se permite la publicación de copias piratas, fotocopias no autorizadas, material con derechos vulnerados o contenido que incite al odio o violencia.</li>
          </ul>
        </>
      ),
    },
    {
      id: "precios-envios",
      title: "4. Precios, Pagos y Envíos",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            Todos los precios publicados en la plataforma están expresados en <strong>Pesos Argentinos ($ ARS)</strong> e incluyen los impuestos aplicables.
          </p>
          <p className="mt-2">
            La coordinación de la entrega o el envío queda a convenir entre comprador y vendedor (retiro en punto de encuentro o despacho por correo). 
            Recomendamos el uso de canales oficiales de comunicación (como el botón verificado de WhatsApp) para resguardar constancia de lo acordado.
          </p>
        </>
      ),
    },
    {
      id: "responsabilidad",
      title: "5. Limitación de Responsabilidad",
      icon: AlertTriangle,
      content: (
        <>
          <p>
            BookKart actúa como intermediario tecnológico facilitador del contacto entre partes. 
            Aunque implementamos estrictas medidas de seguridad (verificación de cuentas y moderación de contenido), 
            no asumimos responsabilidad directa por vicios ocultos de los libros físicos comercializados entre particulares, 
            si bien brindamos mediación para resolver disputas entre usuarios.
          </p>
        </>
      ),
    },
    {
      id: "modificaciones",
      title: "6. Modificaciones de los Términos",
      icon: RefreshCw,
      content: (
        <>
          <p>
            BookKart podrá actualizar estos términos en cualquier momento para reflejar mejoras en la plataforma o cambios legislativos. 
            Las modificaciones entrarán en vigencia a partir de su publicación en el Sitio. 
            El uso continuo de la plataforma implica la aceptación de los nuevos términos.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 sm:py-16">
      <div className="container mx-auto px-4 max-w-4xl space-y-10">
        {/* ============================================================ */}
        {/* ENCABEZADO PRINCIPAL                                         */}
        {/* ============================================================ */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-950 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" /> Marco Legal
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Términos y Condiciones
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Conocé las reglas de convivencia y las pautas de uso seguro para comprar y vender libros usados en la comunidad de BookKart.
            </p>
            <div className="pt-2 text-xs text-orange-300 font-mono">
              Última actualización: {lastUpdated}
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ============================================================ */}
        {/* SECCIONES LEGALES                                            */}
        {/* ============================================================ */}
        <div className="space-y-6">
          {sections.map((section) => (
            <Card
              key={section.id}
              id={section.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md"
            >
              <CardContent className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <div className="text-gray-600 text-sm sm:text-base leading-relaxed pt-1">
                  {section.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ============================================================ */}
        {/* CAJA DE SOPORTE / DUDAS                                      */}
        {/* ============================================================ */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 text-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
              <HelpCircle className="w-4 h-4" /> ¿Tenés alguna duda legal o consulta?
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Nuestro equipo de soporte y mediación comunitaria está a tu disposición.
            </p>
          </div>

          <a href="mailto:soporte@bookkart.com.ar" className="flex-shrink-0">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold gap-2 rounded-xl shadow-md cursor-pointer">
              <Mail className="w-4 h-4" /> soporte@bookkart.com.ar
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
