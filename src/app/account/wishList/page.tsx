"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";

export default function WishlistPage() {
  const wishlistItems: any[] = [];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/account/profile">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Perfil
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 ml-auto sm:ml-0">
            Mi Lista de Deseos
          </h1>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="border border-dashed border-gray-300 shadow-sm p-12 text-center bg-white rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-6 text-rose-500">
                <Heart className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Tu lista de deseos está vacía
              </h2>
              <p className="text-gray-500 max-w-md mb-6">
                Hacé clic en el ícono de corazón en cualquier libro para guardarlo acá y comprarlo cuando quieras.
              </p>
              <Link href="/books">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer">
                  Explorar Libros
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Items guardados */}
          </div>
        )}
      </div>
    </div>
  );
}
