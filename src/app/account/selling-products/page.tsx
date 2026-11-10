"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank, PlusCircle, ArrowLeft } from "lucide-react";

export default function SellingProductsPage() {
  const sellingProducts: any[] = [];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link href="/account/profile">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Perfil
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Mis Libros en Venta
            </h1>
          </div>

          <Link href="/book-sell">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold gap-2 rounded-xl shadow-sm cursor-pointer">
              <PlusCircle className="w-4 h-4" /> Publicar Nuevo Libro
            </Button>
          </Link>
        </div>

        {sellingProducts.length === 0 ? (
          <Card className="border border-dashed border-gray-300 shadow-sm p-12 text-center bg-white rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-6 text-yellow-700">
                <PiggyBank className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No tenés libros publicados todavía
              </h2>
              <p className="text-gray-500 max-w-md mb-6">
                ¿Tenés libros leídos que ya no usás? Publicalos en minutos, poné tu precio y recibí el dinero directo en tu cuenta bancaria o billetera virtual.
              </p>
              <Link href="/book-sell">
                <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer">
                  Publicar mi Primer Libro
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Lista de libros publicados */}
          </div>
        )}
      </div>
    </div>
  );
}
