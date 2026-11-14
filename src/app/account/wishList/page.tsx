"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/store/api";
import { addToCart } from "@/store/slice/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import AccountSidebar from "@/app/components/AccountSidebar";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { data, isLoading } = useGetWishlistQuery(user?._id, { skip: !user?._id });
  const [removeFromWishlistMutation] = useRemoveFromWishlistMutation();

  const wishlist = data?.data?.products || [];

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlistMutation(productId).unwrap();
      toast.success("Eliminado de tu lista de deseos");
    } catch (err: any) {
      toast.error(err?.data?.message || "No se pudo eliminar de la lista");
    }
  };

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.price,
        finalPrice: product.finalPrice,
        image: Array.isArray(product.images) && product.images[0] ? product.images[0] : "/images/book1.jpg",
        author: product.author || "Autor desconocido",
        condition: product.condition || "Excelente",
        quantity: 1,
      })
    );
    toast.success("¡Libro agregado al carrito!");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50/60 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Iniciá Sesión</h2>
          <p className="text-sm text-gray-500">
            Para ver tu lista de deseos, iniciá sesión en tu cuenta.
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
            {/* Banner Superior Estilo Perfil */}
            <div className="rounded-3xl p-8 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-extrabold tracking-tight mb-1">
                  Lista de Deseos
                </h1>
                <p className="text-sm text-orange-100 font-medium">
                  Tus libros guardados para comprar más adelante.
                </p>
              </div>
              <div className="absolute -right-8 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Listado de libros favoritos */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-3" />
                <p className="text-sm">Cargando tus libros favoritos...</p>
              </div>
            ) : wishlist.length === 0 ? (
              <div className="border border-dashed border-gray-300 shadow-sm p-12 text-center bg-white rounded-3xl">
                <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-6 text-rose-500 mx-auto">
                  <Heart className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Tu lista de deseos está vacía
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Hacé clic en el ícono de corazón en cualquier libro del catálogo para guardarlo acá y comprarlo cuando quieras.
                </p>
                <Link href="/books">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer">
                    Explorar Catálogo de Libros
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {wishlist.map((item: any) => {
                  const bookImg =
                    Array.isArray(item.images) && item.images.length > 0
                      ? item.images[0]
                      : "/images/book1.jpg";

                  return (
                    <Card
                      key={item._id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex flex-col"
                    >
                      <Link href={`/books/${item._id}`} className="block relative aspect-[4/3] bg-gray-50">
                        <Image
                          src={bookImg}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemove(item._id);
                          }}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-red-500 flex items-center justify-center shadow transition-all cursor-pointer"
                          title="Eliminar de favoritos"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </Link>

                      <CardContent className="p-4 flex flex-col flex-1">
                        <span className="text-xs text-orange-600 font-semibold uppercase tracking-wider mb-1">
                          {item.category || "Libro"}
                        </span>
                        <Link
                          href={`/books/${item._id}`}
                          className="font-bold text-gray-900 hover:text-orange-600 line-clamp-2 transition-colors mb-1 text-sm"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-gray-500 mb-3">{item.author || "Autor no especificado"}</p>

                        <div className="mt-auto pt-3 border-t flex items-center justify-between">
                          <div>
                            {item.price && item.price > item.finalPrice && (
                              <span className="text-xs text-gray-400 line-through mr-1.5">
                                ${item.price}
                              </span>
                            )}
                            <span className="text-base font-bold text-gray-900">
                              ${item.finalPrice?.toLocaleString("es-AR")}
                            </span>
                          </div>

                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(item)}
                            className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg gap-1.5 text-xs font-semibold cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" /> Agregar
                          </Button>
                        </div>
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
