"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";

export default function OrdersPage() {
  const orders: any[] = [];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/account/profile">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Volver al perfil
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 ml-auto sm:ml-0">
            Mis Pedidos
          </h1>
        </div>

        {orders.length === 0 ? (
          <Card className="border border-dashed border-gray-300 shadow-sm p-12 text-center bg-white rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 text-blue-600">
                <Package className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Aún no realizaste ningún pedido
              </h2>
              <p className="text-gray-500 max-w-md mb-6">
                Cuando compres libros en BookKart, acá vas a poder seguir el estado del envío, la confirmación de entrega y tus comprobantes.
              </p>
              <Link href="/books">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer">
                  Explorar Catálogo
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Lista de pedidos */}
          </div>
        )}
      </div>
    </div>
  );
}
