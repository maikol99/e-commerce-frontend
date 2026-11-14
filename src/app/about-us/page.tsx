"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Heart,
  Users,
  Sparkles,
  ShieldCheck,
  Recycle,
  MapPin,
  ArrowRight,
  GraduationCap,
  Coffee,
} from "lucide-react";

export default function AboutUsPage() {
  const stats = [
    { value: "+18.000", label: "Libros recirculados", icon: BookOpen },
    { value: "+9.500", label: "Lectores en la comunidad", icon: Users },
    { value: "24", label: "Provincias conectadas", icon: MapPin },
    { value: "100%", label: "Economía circular", icon: Recycle },
  ];

  const values = [
    {
      title: "Segunda Vida a Cada Página",
      description:
        "Creemos que un libro guardado en una repisa sin leerse es una historia pausada. Fomentamos la economía circular dándoles una nueva oportunidad.",
      icon: Recycle,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Educación y Lectura Accesible",
      description:
        "Los manuales universitarios y novelas clásicas no deberían costar una fortuna. Conectamos lectores para que estudiar y leer sea accesible para todos.",
      icon: GraduationCap,
      color: "text-orange-600 bg-orange-50 border-orange-100",
    },
    {
      title: "Comunidad y Transparencia",
      description:
        "Fomentamos el trato directo y humano entre compradores y vendedores, con contacto por WhatsApp y fotos reales de cada ejemplar.",
      icon: Heart,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      title: "Compra Protegida",
      description:
        "Brindamos las herramientas para que comprar y vender libros usados en Argentina sea tan seguro y confiable como comprar en una librería física.",
      icon: ShieldCheck,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
  ];

  const team = [
    {
      name: "Maikol Alegre",
      role: "Fundador & Tech Lead",
      bio: "Apasionado por el desarrollo de software y lector voraz. Creó la primera versión de BookKart para resolver el costo de los libros técnicos.",
      avatar: "MA",
    },
    {
      name: "Camila Varela",
      role: "Co-fundadora & Diseñadora UX",
      bio: "Diseñadora obsesionada con que comprar un libro usado por internet sea una experiencia simple, cálida y sin fricciones.",
      avatar: "CV",
    },
    {
      name: "Lucas Benítez",
      role: "Comunidad & Operaciones",
      bio: "Encargado de que cada comprador y vendedor tenga la mejor experiencia y los envíos lleguen en perfecto estado a todo el país.",
      avatar: "LB",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* ============================================================ */}
      {/* HERO BANNER                                                  */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white py-20 sm:py-28">
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Nuestra Historia
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Conectamos historias,{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              página por página
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            BookKart es el marketplace argentino donde los libros usados encuentran nuevos lectores. 
            Cuidamos tu bolsillo y el planeta haciendo circular la literatura y el estudio.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/books">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-7 py-6 rounded-2xl shadow-lg shadow-orange-600/30 gap-2 cursor-pointer transition-all hover:scale-105">
                Explorar Catálogo <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/book-sell">
              <Button
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 font-bold px-7 py-6 rounded-2xl cursor-pointer"
              >
                Vender mis Libros
              </Button>
            </Link>
          </div>
        </div>

        {/* Efectos decorativos de fondo */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ============================================================ */}
      {/* MÉTRICAS DE IMPACTO                                          */}
      {/* ============================================================ */}
      <section className="container mx-auto px-4 max-w-5xl -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 text-center">
              <CardContent className="p-0 space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* CÓMO NACIÓ BOOKKART (EL GUION DE LA HISTORIA)                */}
      {/* ============================================================ */}
      <section className="container mx-auto px-4 max-w-5xl py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-5">
            <span className="text-orange-600 text-xs font-bold tracking-wider uppercase">
              El Origen
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Una taza de café, apuntes universitarios y una idea simple.
            </h2>
            <div className="text-gray-600 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Todo empezó a finales de 2023 en un café frente a la facultad. Éramos estudiantes y lectores habituales, 
                y cada comienzo de cuatrimestre nos encontrábamos con el mismo problema: <strong>los libros de texto costaban una pequeña fortuna</strong>.
              </p>
              <p>
                Al mismo tiempo, nos dimos cuenta de que en nuestras casas (y en las de miles de personas) había estantes llenos 
                de novelas leídas una sola vez, manuales de materias ya aprobadas y libros técnicos en perfecto estado acumulando polvo.
              </p>
              <p className="bg-orange-50/70 p-4 rounded-2xl border-l-4 border-orange-500 text-gray-800 font-medium">
                &ldquo;¿Por qué pagar $50.000 por un libro nuevo cuando alguien a pocas cuadras o en otra provincia lo tiene impecable a mitad de precio?&rdquo;
              </p>
              <p>
                Así nació <strong>BookKart</strong>: una plataforma pensada por y para argentinos, que combina la velocidad 
                de un e-commerce moderno con la calidez del intercambio directo entre lectores.
              </p>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3] bg-gradient-to-br from-orange-400 to-amber-600 p-8 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  Fundado en Argentina • 2023
                </span>
                <Coffee className="w-6 h-6 text-white/80" />
              </div>

              <div className="space-y-3">
                <blockquote className="text-xl sm:text-2xl font-bold leading-snug">
                  &ldquo;Leer y aprender no debería ser un privilegio, sino un derecho al alcance de cada rincón del país.&rdquo;
                </blockquote>
                <p className="text-xs text-orange-100 font-medium">
                  — El Manifiesto de BookKart Argentina
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/20 text-xs">
                <span>📚 Más de 50 géneros</span>
                <span>•</span>
                <span>🚚 Envíos seguros</span>
                <span>•</span>
                <span>🤝 Trato directo</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* NUESTROS VALORES                                             */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-orange-600 text-xs font-bold tracking-wider uppercase">
              Pilares Fundamentales
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Lo que nos mueve todos los días
            </h2>
            <p className="text-gray-500 text-sm">
              Cada funcionalidad que desarrollamos en BookKart responde a estos principios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, idx) => (
              <Card key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${val.color}`}>
                    <val.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-gray-900 text-base">
                      {val.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* EL EQUIPO                                                    */}
        {/* ============================================================ */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-orange-600 text-xs font-bold tracking-wider uppercase">
              Detrás de Pantalla
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              El equipo que hace girar BookKart
            </h2>
            <p className="text-gray-500 text-sm">
              Desarrolladores, diseñadores y fanáticos de los libros trabajando juntos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <Card key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center space-y-4">
                <CardContent className="p-0 space-y-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md shadow-orange-500/20">
                    {member.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{member.name}</h4>
                    <p className="text-xs text-orange-600 font-semibold">{member.role}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* CALL TO ACTION FINAL                                         */}
        {/* ============================================================ */}
        <div className="rounded-3xl p-10 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white text-center shadow-xl space-y-5 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              ¿Tenés libros que ya leíste?
            </h3>
            <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
              Publicalos gratis en BookKart en menos de 2 minutos. Recuperá dinero y ayudá a otro lector a disfrutar de una gran historia.
            </p>
            <div className="pt-2">
              <Link href="/book-sell">
                <Button className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-6 rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105">
                  Publicar mi Primer Libro Gratis
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
