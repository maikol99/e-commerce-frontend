"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Cookie,
  Mail,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  const lastUpdated = "14 de Noviembre de 2024";

  const sections = [
    {
      id: "compromiso",
      title: "1. Nuestro Compromiso con tu Privacidad",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            En <strong>BookKart Argentina</strong> (&ldquo;nosotros&rdquo;, &ldquo;el Sitio&rdquo;), la protección de tus datos personales 
            es una prioridad inquebrantable. Cumplimos estrictamente con los lineamientos de la 
            <strong> Ley Nacional N° 25.326 de Protección de los Datos Personales</strong> de la República Argentina.
          </p>
          <p className="mt-2">
            Esta política explica detalladamente qué información recopilamos, cómo la utilizamos para conectar compradores y vendedores, 
            y los derechos que tenés sobre tus datos en todo momento.
          </p>
        </>
      ),
    },
    {
      id: "datos-recopilados",
      title: "2. Información que Recopilamos",
      icon: Database,
      content: (
        <>
          <p>Recopilamos únicamente los datos necesarios para brindar una experiencia de marketplace segura y transparente:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-gray-600">
            <li><strong>Datos de Identidad:</strong> Nombre, apellido y dirección de correo electrónico al registrarte de forma directa o mediante Google OAuth.</li>
            <li><strong>Datos de Contacto:</strong> Número de teléfono / WhatsApp para coordinar la entrega o envío de libros vendidos.</li>
            <li><strong>Datos de Publicación:</strong> Títulos de libros, fotos, precios, estado del ejemplar y descripción que decidas publicar voluntariamente.</li>
            <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador e identificadores de sesión estrictamente necesarios para la seguridad contra accesos no autorizados.</li>
          </ul>
        </>
      ),
    },
    {
      id: "uso-informacion",
      title: "3. ¿Para qué Utilizamos tus Datos?",
      icon: Eye,
      content: (
        <>
          <p>La información recopilada tiene como fines exclusivos:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-gray-600">
            <li>Gestionar y autenticar tu cuenta de usuario de forma segura con cookies cifradas (HttpOnly).</li>
            <li>Permitir que compradores interesados en tus libros puedan contactarte directamente por WhatsApp para coordinar el retiro o envío.</li>
            <li>Procesar y mostrar tu historial de pedidos y libros en venta en tu panel personal.</li>
            <li>Prevenir fraudes, suplantaciones de identidad y publicaciones falsas en la comunidad.</li>
          </ul>
        </>
      ),
    },
    {
      id: "no-venta",
      title: "4. No Venta ni Comercialización de Datos",
      icon: Lock,
      content: (
        <>
          <p>
            <strong>Bajo ninguna circunstancia vendemos, alquilamos ni comercializamos tus datos personales con terceros para fines publicitarios.</strong>
          </p>
          <p className="mt-2">
            Solo compartimos información con proveedores de infraestructura tecnológica esenciales para operar la plataforma 
            (como MongoDB Atlas para base de datos y Cloudinary para el almacenamiento seguro de imágenes de portadas), 
            quienes operan bajo estrictos acuerdos de confidencialidad y estándares internacionales de seguridad.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "5. Uso de Cookies Seguras (HttpOnly)",
      icon: Cookie,
      content: (
        <>
          <p>
            BookKart utiliza cookies estrictamente necesarias para la sesión de usuario. 
            Implementamos el protocolo de seguridad <strong>HttpOnly</strong> y tokens criptográficos JWT (JSON Web Tokens), 
            lo que significa que ningún código malicioso o script externo puede leer ni sustraer tu información de inicio de sesión.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            No utilizamos cookies de rastreo invasivo de terceros para perseguirte con publicidad fuera de nuestra plataforma.
          </p>
        </>
      ),
    },
    {
      id: "derechos",
      title: "6. Tus Derechos (Acceso, Rectificación y Supresión)",
      icon: UserCheck,
      content: (
        <>
          <p>
            Tenés derecho en cualquier momento a acceder, actualizar, modificar o solicitar la eliminación total de tus datos personales 
            y publicaciones de nuestra base de datos.
          </p>
          <p className="mt-2">
            Podés actualizar tus datos directamente desde tu panel de <strong>Mi Perfil</strong> o solicitar la baja definitiva de tu cuenta 
            escribiéndonos a nuestro canal de soporte.
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" /> Seguridad & Confianza
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Política de Privacidad
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Tu privacidad y la seguridad de tus datos son pilares fundamentales de BookKart. Conocé cómo protegemos tu información en todo momento.
            </p>
            <div className="pt-2 text-xs text-emerald-300 font-mono">
              Última actualización: {lastUpdated}
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ============================================================ */}
        {/* SECCIONES LEGALES DE PRIVACIDAD                              */}
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
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
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
        {/* CAJA DE CONTACTO DE PRIVACIDAD                               */}
        {/* ============================================================ */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 text-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <HelpCircle className="w-4 h-4" /> ¿Consultas sobre tus datos personales?
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Escribinos para solicitar acceso, rectificación o eliminación total de tu información.
            </p>
          </div>

          <a href="mailto:privacidad@bookkart.com.ar" className="flex-shrink-0">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 rounded-xl shadow-md cursor-pointer">
              <Mail className="w-4 h-4" /> privacidad@bookkart.com.ar
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
