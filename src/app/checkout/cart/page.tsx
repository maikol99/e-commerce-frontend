"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity, clearCart } from "@/store/slice/cartSlice";
import { useCreateOrUpdateOrderMutation } from "@/store/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [createOrder, { isLoading }] = useCreateOrUpdateOrderMutation();
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [orderCreated, setOrderCreated] = useState<any>(null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Debés iniciar sesión para completar la compra.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Tu carrito está vacío.");
      return;
    }

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.finalPrice,
        })),
        totalAmount: subtotal,
        paymentMethod: "Mercado Pago / Tarjeta",
      };

      const res: any = await createOrder({ orderData: orderPayload }).unwrap();
      const orderData = res?.data || res;
      setOrderCreated(orderData);
      setIsSuccessModal(true);
      dispatch(clearCart());
      toast.success("¡Pedido registrado exitosamente!");
    } catch (err: any) {
      console.error("Error al procesar la compra:", err);
      toast.error(err?.data?.message || "Ocurrió un error al procesar el pedido. Intentá nuevamente.");
    }
  };

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
                          ${item.finalPrice?.toLocaleString("es-AR")}
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
              <Card className="p-6 bg-white rounded-2xl shadow-sm border space-y-5">
                <h3 className="text-xl font-bold">Resumen del Pedido</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>
                      Subtotal ({cartItems.reduce((a, i) => a + i.quantity, 0)} artículo
                      {cartItems.reduce((a, i) => a + i.quantity, 0) !== 1 ? "s" : ""})
                    </span>
                    <span className="font-medium text-gray-900">${subtotal.toLocaleString("es-AR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-green-600 font-medium">A coordinar / Gratis</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total a pagar</span>
                    <span className="text-orange-600">${subtotal.toLocaleString("es-AR")}</span>
                  </div>
                </div>

                <Button
                  disabled={isLoading}
                  onClick={handleCheckout}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Procesando Pedido...
                    </>
                  ) : (
                    <>
                      Confirmar Compra <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <div className="p-3 bg-gray-50 rounded-xl border text-xs text-gray-500 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-orange-600" /> Compra 100% Protegida
                  </div>
                  <p>Tu dinero queda resguardado hasta que recibas el libro en mano.</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Modal de éxito de compra */}
        {isSuccessModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                ¡Pedido Confirmado!
              </h2>
              <p className="text-sm text-gray-600">
                Tu compra fue registrada con éxito. Podés hacer el seguimiento de tu pedido en la sección de tus compras.
              </p>
              {orderCreated?._id && (
                <div className="bg-gray-50 p-3 rounded-xl border text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">ID del Pedido:</span> {orderCreated._id}
                </div>
              )}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  onClick={() => router.push("/account/orders")}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 rounded-xl shadow-sm"
                >
                  Ver Mis Pedidos
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/books")}
                  className="w-full py-5 rounded-xl"
                >
                  Seguir Explorando Libros
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
