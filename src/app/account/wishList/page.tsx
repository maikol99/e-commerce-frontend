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
import { Heart, ArrowLeft, ShoppingCart, Trash2, Loader2, BookOpen } from "lucide-react";
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
      <div className="min-h-screen bg-gray-100 py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Iniciá sesión para ver tus favoritos
            </h2>
            <p className="text-gray-500 mb-6">
              Guardá tus libros preferidos para encontrarlos rápido y comprarlos en cualquier momento.
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
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/books">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Seguir explorando
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 ml-auto sm:ml-0 flex items-center gap-2">
            <Heart className="w-7 h-7 text-red-500 fill-red-500" /> Mi Lista de Deseos
          </h1>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-3" />
            <p className="text-sm">Cargando tus libros favoritos...</p>
          </div>
        ) : wishlist.length === 0 ? (
          <Card className="border border-dashed border-gray-300 shadow-sm p-12 text-center bg-white rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-6 text-rose-500">
                <Heart className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Tu lista de deseos está vacía
              </h2>
              <p className="text-gray-500 max-w-md mb-6">
                Hacé clic en el ícono de corazón en cualquier libro del catálogo para guardarlo acá y comprarlo cuando quieras.
              </p>
              <Link href="/books">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer">
                  Explorar Catálogo de Libros
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item: any) => {
              const bookImg =
                Array.isArray(item.images) && item.images.length > 0
                  ? item.images[0]
                  : "/images/book1.jpg";

              return (
                <Card
                  key={item._id}
                  className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all flex flex-col"
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
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-red-500 flex items-center justify-center shadow transition-all"
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
                      className="font-bold text-gray-900 hover:text-orange-600 line-clamp-2 transition-colors mb-1"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-gray-500 mb-3">{item.author || "Autor no especificado"}</p>

                    <div className="mt-auto pt-3 border-t flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 line-through mr-1.5">
                          ${item.price}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          ${item.finalPrice}
                        </span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                        className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg gap-1.5 text-xs font-semibold"
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
  );
}
