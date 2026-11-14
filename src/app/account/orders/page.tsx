"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetUsersOrdersQuery } from "@/store/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Loader2, CheckCircle2, Calendar } from "lucide-react";
import AccountSidebar from "@/app/components/AccountSidebar";

export default function OrdersPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const { data, isLoading } = useGetUsersOrdersQuery(undefined, { skip: !user });

  const orders: any[] = data?.data || [];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50/60 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Iniciá Sesión</h2>
          <p className="text-sm text-gray-500">
            Para ver el historial de tus compras, iniciá sesión en tu cuenta.
          </p>
          <Link href="/">
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 rounded-xl">
              Ir al Inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* ── SIDEBAR ── */}
          <div className="md:col-span-3">
            <AccountSidebar />
          </div>

          {/* ── CONTENIDO DERECHO ── */}
          <div className="md:col-span-9 space-y-6">

            {/* Banner superior */}
            <div className="rounded-3xl p-8 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-extrabold tracking-tight mb-1">Mis Pedidos</h1>
                <p className="text-sm text-orange-100 font-medium">
                  Historial de todas tus compras realizadas en BookKart.
                </p>
              </div>
              <div className="absolute -right-8 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Lista de pedidos */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-3" />
                <p className="text-sm">Cargando tus pedidos...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-orange-500 mx-auto">
                  <Package className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Aún no realizaste ningún pedido
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Cuando compres libros en BookKart, acá vas a poder seguir el estado
                  del envío, la confirmación de entrega y tus comprobantes.
                </p>
                <Link href="/books">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer">
                    Explorar Catálogo
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order: any) => {
                  const orderDate = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Reciente";

                  return (
                    <Card key={order._id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                      {/* Encabezado del pedido */}
                      <div className="bg-gray-50/80 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-xs text-gray-400 block">ID del Pedido</span>
                            <span className="font-mono text-xs font-semibold text-gray-700">
                              #{order._id.slice(-8).toUpperCase()}
                            </span>
                          </div>
                          <div className="hidden sm:block border-l pl-4">
                            <span className="text-xs text-gray-400 block">Fecha de compra</span>
                            <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" /> {orderDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 font-semibold gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Pagado
                          </Badge>
                          <span className="text-base font-bold text-gray-900">
                            ${order.totalAmount?.toLocaleString("es-AR")}
                          </span>
                        </div>
                      </div>

                      {/* Lista de productos */}
                      <CardContent className="p-6 divide-y">
                        {order.items?.map((item: any, idx: number) => {
                          const product = item.product || {};
                          const bookImg =
                            Array.isArray(product?.images) && product.images[0]
                              ? product.images[0]
                              : "/images/book1.jpg";

                          return (
                            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                              <div className="relative w-16 h-20 rounded-lg overflow-hidden border bg-gray-50 flex-shrink-0">
                                <Image
                                  src={bookImg}
                                  alt={product.title || "Libro"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-sm truncate">
                                  {product.title || "Libro adquirido"}
                                </h4>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {product.author ? `por ${product.author}` : "Autor de la comunidad"}
                                </p>
                                <span className="text-xs text-gray-400 mt-1 block">
                                  Cantidad: {item.quantity || 1} &times; ${item.price?.toLocaleString("es-AR")}
                                </span>
                              </div>
                              <div className="text-right">
                                {product._id && (
                                  <Link href={`/books/${product._id}`}>
                                    <Button variant="outline" size="sm" className="text-xs rounded-lg">
                                      Ver Libro
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
