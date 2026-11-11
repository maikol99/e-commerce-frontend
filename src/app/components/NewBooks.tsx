"use client";

import React, { useState } from "react";
import { useGetProductsQuery } from "@/store/api";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, Sparkles, BookOpen } from "lucide-react";

const NewBooks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: apiData, isLoading } = useGetProductsQuery(undefined);

  const books: any[] = apiData?.data || [];
  const itemsPerSlide = 3;
  const totalSlides = Math.max(1, Math.ceil(books.length / itemsPerSlide));

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-2" />
          <p className="text-gray-500 text-sm">Cargando libros recientes...</p>
        </div>
      </section>
    );
  }

  if (books.length === 0) {
    return null;
  }

  // Generamos los slides dinámicamente según la cantidad real de libros
  const slides: any[][] = [];
  for (let i = 0; i < books.length; i += itemsPerSlide) {
    slides.push(books.slice(i, i + itemsPerSlide));
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Novedades en la comunidad
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Libros Recién Publicados
          </h2>
          <p className="text-sm text-gray-500 mt-1 max-w-xl mx-auto">
            Descubrí los últimos libros usados puestos a la venta por otros lectores y estudiantes
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map((slideBooks, slideIndex) => (
                <div key={slideIndex} className="flex-none w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {slideBooks.map((book: any) => {
                      const discount = calculateDiscount(book.price, book.finalPrice);
                      const bookImg =
                        Array.isArray(book.images) && book.images[0]
                          ? book.images[0]
                          : "/images/book1.jpg";

                      return (
                        <Card
                          key={book._id}
                          className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all flex flex-col group"
                        >
                          <CardContent className="p-4 flex flex-col flex-1">
                            <Link href={`/books/${book._id}`} className="block relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 mb-3">
                              <Image
                                src={bookImg}
                                alt={book.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {discount > 0 && (
                                <span className="absolute top-2 left-2 bg-orange-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                                  {discount}% OFF
                                </span>
                              )}
                              {book.condition && (
                                <span className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                                  {book.condition}
                                </span>
                              )}
                            </Link>

                            <span className="text-[11px] font-semibold text-orange-600 uppercase tracking-wider mb-1">
                              {book.category || "General"}
                            </span>

                            <Link href={`/books/${book._id}`}>
                              <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 text-base leading-snug mb-1">
                                {book.title}
                              </h3>
                            </Link>

                            <p className="text-xs text-gray-500 mb-3">
                              {book.author ? `por ${book.author}` : "Autor desconocido"}
                            </p>

                            <div className="mt-auto pt-3 border-t flex items-center justify-between">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-black text-gray-900">
                                  ${book.finalPrice?.toLocaleString("es-AR")}
                                </span>
                                {book.price && book.price > book.finalPrice && (
                                  <span className="text-xs text-gray-400 line-through">
                                    ${book.price?.toLocaleString("es-AR")}
                                  </span>
                                )}
                              </div>

                              <Link href={`/books/${book._id}`}>
                                <Button
                                  size="sm"
                                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-xs px-3.5 shadow-sm"
                                >
                                  Ver Libro
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación (si hay más de 1 slide) */}
          {totalSlides > 1 && (
            <>
              <button
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border p-2.5 rounded-full shadow-md hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-all z-10"
                onClick={prevSlide}
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border p-2.5 rounded-full shadow-md hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-all z-10"
                onClick={nextSlide}
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Indicadores / dots */}
              <div className="mt-8 flex justify-center space-x-2">
                {slides.map((_, dot) => (
                  <button
                    key={dot}
                    onClick={() => setCurrentSlide(dot)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === dot
                        ? "bg-orange-600 w-8"
                        : "bg-gray-300 w-2.5 hover:bg-gray-400"
                    }`}
                    aria-label={`Slide ${dot + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewBooks;
