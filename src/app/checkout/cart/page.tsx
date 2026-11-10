"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity, clearCart } from "@/store/slice/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

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
            {/* ===== LISTA DE ITEMS ===== */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item._id} className="bg-white rounded-2xl shadow-sm border">
                  <CardContent className="p-4 flex gap-4">
                    {/* Imagen */}
                    <div className="relative w-24 h-28 flex-shrink-0 rounded-lg overflow-hidden border bg-gray-50">
                      <Image
                        src={item.image || "/images/book1.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1 gap-1">
                      <h3 className="font-bold text-gray-900 leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      {item.author && (
                        <p className="text-sm text-gray-500">por {item.author}</p>
                      )}
                      {item.condition && (
                        <span className="text-xs inline-block w-fit bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium">
                          {item.condition}
                        </span>
                      )}

                      {/* Precio y controles */}
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="text-lg font-bold text-orange-600">
                          ${item.finalPrice}
                        </span>

                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item._id,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center font-semibold text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item._id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>

                          {/* Eliminar */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50 ml-1"
                            onClick={() => dispatch(removeFromCart(item._id))}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Vaciar carrito */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-1"
                  onClick={() => dispatch(clearCart())}
                >
                  <Trash2 className="w-4 h-4" /> Vaciar carrito
                </Button>
              </div>
            </div>

            {/* ===== RESUMEN ===== */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white rounded-2xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>
                      Subtotal ({cartItems.reduce((a, i) => a + i.quantity, 0)} artículo
                      {cartItems.reduce((a, i) => a + i.quantity, 0) !== 1 ? "s" : ""})
                    </span>
                    <span>${subtotal.toLocaleString("es-AR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-gray-400">A calcular</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-base text-gray-900">
                    <span>Total</span>
                    <span>${subtotal.toLocaleString("es-AR")}</span>
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
