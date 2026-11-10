import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ShieldCheck, Truck, RefreshCw, ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block mb-2 font-mono">
            GUÍA DE USO
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo Funciona BookKart?
          </h1>
          <p className="text-gray-600 text-lg">
            La plataforma para comprar y vender libros usados en Argentina de forma simple y segura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Cómo Comprar */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-6">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Cómo Comprar
            </h2>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Buscá tu libro:</strong> Filtrá por género, autor o estado físico.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Pago Seguro:</strong> Aboná online con protección para tu compra.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Envío a tu puerta:</strong> El vendedor despacha el libro y lo recibís en tu casa.
                </span>
              </li>
            </ul>
            <Link href="/books" className="block pt-2">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 rounded-xl">
                Ver Catálogo de Libros <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Cómo Vender */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-6">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold text-xl">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Cómo Vender
            </h2>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Publicá gratis:</strong> Subí fotos de tus libros usados y elegí tu precio.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Despachá la venta:</strong> Cuando alguien lo compre, preparalo y envialo.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Cobrá al instante:</strong> Recibí el dinero directo en tu cuenta bancaria o alias.
                </span>
              </li>
            </ul>
            <Link href="/book-sell" className="block pt-2">
              <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold py-5 rounded-xl">
                Publicar un Libro Ahora <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
