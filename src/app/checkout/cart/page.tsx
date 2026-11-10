"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";

export default function CartPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems: any[] = [];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/books">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Seguir comprando
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 ml-auto sm:ml-0">
            Tu Carrito de Compras
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <Card className="border border-dashed border-gray-300 shadow-sm p-12 text-center bg-white rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-orange-600">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Tu carrito está vacío
              </h2>
              <p className="text-gray-500 max-w-md mb-6">
                Parece que todavía no agregaste ningún libro a tu carrito. ¡Explorá nuestro catálogo de libros usados a precios accesibles!
              </p>
              <Link href="/books">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer">
                  Explorar Libros Disponibles
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {/* Items del carrito */}
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 bg-white rounded-2xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>A calcular</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-base text-gray-900">
                    <span>Total</span>
                    <span>$0</span>
                  </div>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 rounded-xl flex items-center justify-center gap-2">
                  Iniciar Pago <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
