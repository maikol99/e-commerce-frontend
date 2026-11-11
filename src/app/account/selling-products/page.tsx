"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetProductBySellerIdQuery, useDeleteProductByIdMutation } from "@/store/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, PlusCircle, ArrowLeft, Trash2, Eye, Loader2, Edit3 } from "lucide-react";
import toast from "react-hot-toast";

export default function SellingProductsPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const sellerId = user?._id || "";

  const { data, isLoading, refetch } = useGetProductBySellerIdQuery(sellerId, {
    skip: !sellerId,
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductByIdMutation();

  const sellingProducts = data?.data || [];

  const handleDelete = async (productId: string) => {
    if (!confirm("¿Estás seguro de que querés eliminar esta publicación?")) return;
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Publicación eliminada correctamente");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "No se pudo eliminar la publicación");
    }
  };

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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-2" />
            <p className="text-gray-500 text-sm">Cargando tus publicaciones...</p>
          </div>
        ) : sellingProducts.length === 0 ? (
          <Card className="border border-dashed border-gray-300 shadow-sm p-12 text-center bg-white rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-orange-600">
                <PiggyBank className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No tenés libros publicados todavía
              </h2>
              <p className="text-gray-500 max-w-md mb-6">
                ¿Tenés libros leídos que ya no usás? Publicalos en minutos, poné tu precio y recibí el dinero directo en tu cuenta bancaria o billetera virtual.
              </p>
              <Link href="/book-sell">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer">
                  Publicar mi Primer Libro
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sellingProducts.map((book: any) => (
              <Card key={book._id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden border bg-gray-50">
                    <Image
                      src={book.images?.[0] || "/images/book1.jpg"}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 text-lg">{book.title}</h3>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        {book.condition}
                      </Badge>
                    </div>
                    {book.author && (
                      <p className="text-sm text-gray-500">Autor: {book.author}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      Categoría: {book.category} | Nivel: {book.classType}
                    </p>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-xl font-bold text-orange-600">
                        ${book.finalPrice?.toLocaleString("es-AR")}
                      </span>
                      {book.price && book.price > book.finalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${book.price?.toLocaleString("es-AR")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                    <Link href={`/book-edit/${book._id}`} className="flex-1 sm:flex-initial">
                      <Button variant="outline" size="sm" className="w-full gap-1.5 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700">
                        <Edit3 className="w-3.5 h-3.5" /> Editar
                      </Button>
                    </Link>
                    <Link href={`/books/${book._id}`} className="flex-1 sm:flex-initial">
                      <Button variant="outline" size="sm" className="w-full gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> Ver
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 sm:flex-initial text-red-600 hover:text-red-700 hover:bg-red-50 gap-1.5"
                      onClick={() => handleDelete(book._id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
