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
import { Package, ArrowLeft, Loader2, CheckCircle2, Clock, Calendar } from "lucide-react";

export default function OrdersPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const { data, isLoading } = useGetUsersOrdersQuery(undefined, { skip: !user });

  const orders: any[] = data?.data || [];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Iniciá sesión para ver tus pedidos
            </h2>
            <p className="text-gray-500 mb-6">
              Para seguir el estado de tus compras y entregas, iniciá sesión en tu cuenta.
            </p>
            <Link href="/">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 rounded-xl">
                Volver al Inicio
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/account/profile">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Volver al perfil
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 ml-auto sm:ml-0 flex items-center gap-2">
            <Package className="w-7 h-7 text-orange-600" /> Mis Pedidos
          </h1>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-3" />
            <p className="text-sm">Cargando tus pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
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

                  {/* Lista de productos de la orden */}
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
  );
}
