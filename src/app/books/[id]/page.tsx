"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Heart,
  Loader2,
  MapPin,
  MessageCircle,
  ShoppingCart,
  User2,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Share2,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slice/cartSlice";
import { useGetProductByIdQuery } from "@/store/api";

const Page = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string) || "1";
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: apiData, isLoading } = useGetProductByIdQuery(id);
  const realProduct = apiData?.data;

  const mockBook = {
    _id: id,
    images: [
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25saW5lJTIwc2VsbCUyMGJvb2tzfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/910384920/photo/kid-reading-near-locked-door.webp?a=1&b=1&s=612x612&w=0&k=20&c=J3FL4ZVORItw_bkLzlVo4WO-xUy22S7Qqbuq2xusNnc=",
      "https://images.unsplash.com/photo-1492539438225-2666b2a98f93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9sZCUyMCUyMGJvb2tzfGVufDB8fDB8fHww",
    ],
    title: "El Alquimista",
    category: "Novelas y Ficción",
    condition: "Excelente",
    classType: "Universitario / Lectura",
    subject: "Ficción y Desarrollo Personal",
    price: 300,
    author: "Paulo Coelho",
    edition: "Edición 25° Aniversario",
    description:
      "Una novela inspiradora sobre el viaje de un pastor andaluz para seguir sus sueños y descubrir su Leyenda Personal.",
    finalPrice: 250,
    shippingCharge: 50,
    paymentMode: "Transferencia / Tarjeta",
    paymentDetails: {
      upiId: "ejemplo@alias",
    },
    createdAt: new Date("2024-01-01"),
    seller: { name: "Martín Gómez", phoneNumber: "+54 9 11 5555-4321" },
  };

  const book = realProduct
    ? {
        ...realProduct,
        images: realProduct.images?.length > 0 ? realProduct.images : mockBook.images,
        seller: realProduct.seller || { name: "Vendedor BookKart", phoneNumber: "" },
      }
    : mockBook;

  const bookImage: string[] = Array.isArray(book?.images) ? book.images : [];

  const handleAddToCart = () => {
    setIsAddToCart(true);
    dispatch(
      addToCart({
        _id: book._id,
        title: book.title,
        price: book.price,
        finalPrice: book.finalPrice,
        image: bookImage[0] || "/images/book1.jpg",
        author: book.author,
        condition: book.condition,
        quantity: 1,
      })
    );
    setTimeout(() => {
      setIsAddToCart(false);
      toast.success("¡Libro agregado al carrito!");
    }, 350);
  };

  const handleAddToWishList = (productId: string) => {
    toast.success("¡Guardado en tu lista de deseos!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Enlace copiado al portapapeles");
    }
  };

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return "recientemente";
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: es });
    } catch {
      return "recientemente";
    }
  };

  const conditionColor: Record<string, string> = {
    Excellent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Excelente: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Good: "bg-blue-50 text-blue-700 border-blue-200",
    Bueno: "bg-blue-50 text-blue-700 border-blue-200",
    Fair: "bg-amber-50 text-amber-700 border-amber-200",
    Aceptable: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* BREADCRUMB */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500 overflow-hidden">
          <Link href="/" className="hover:text-orange-600 transition-colors flex-shrink-0">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/books" className="hover:text-orange-600 transition-colors flex-shrink-0">
            Libros
          </Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-[200px]">{book.category}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-[260px]">{book.title}</span>
        </nav>

        {/* ========== GRID 1: GALERÍA Y COMPRA ========== */}
        <div className="grid gap-8 lg:grid-cols-12 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/80">
          {/* COLUMNA IZQUIERDA - FOTOS (5 columnas) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200/60 shadow-inner flex items-center justify-center">
              <Image
                src={bookImage[selectedImage] || "/images/book1.jpg"}
                alt={book.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain p-4 transition-all duration-300"
                priority
              />
              {calculateDiscount(book.price, book.finalPrice) > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {calculateDiscount(book.price, book.finalPrice)}% OFF
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {bookImage.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {bookImage.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === index
                        ? "border-orange-500 ring-2 ring-orange-100 scale-105"
                        : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${book.title} miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Badges de Confianza */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-orange-50/60 border border-orange-100/80 text-xs text-orange-950">
                <ShieldCheck className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span>Compra protegida</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/60 border border-blue-100/80 text-xs text-blue-950">
                <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Envíos a todo el país</span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA - DETALLES Y ACCIÓN (7 columnas) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Categoría y Estado */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    conditionColor[book.condition] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  Estado: {book.condition}
                </Badge>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-medium text-gray-500">
                  {book.category}
                </span>
              </div>

              {/* Título Principal */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug mb-2">
                {book.title}
              </h1>

              {/* Autor y Publicación */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-6">
                {book.author && (
                  <span>
                    Por <strong className="text-gray-900 font-semibold">{book.author}</strong>
                  </span>
                )}
                <span className="text-gray-300">|</span>
                <span className="text-xs text-gray-500">
                  Publicado {formatDate(book.createdAt)}
                </span>
              </div>

              {/* Caja de Precio */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50/40 via-white to-gray-50 border border-orange-100 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-orange-600">
                    ${Number(book.finalPrice || 0).toLocaleString("es-AR")}
                  </span>
                  {book.price && book.price > book.finalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ${Number(book.price).toLocaleString("es-AR")}
                    </span>
                  )}
                </div>

                <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {book.shippingCharge && Number(book.shippingCharge) > 0
                    ? `Envío: $${Number(book.shippingCharge).toLocaleString("es-AR")}`
                    : "Envío a acordar con el vendedor"}
                </p>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddToCart}
                  className="flex-1 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl text-base shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAddToCart ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" /> Agregando al Carrito...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" /> Comprar Ahora
                    </>
                  )}
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="py-6 px-4 rounded-xl border-gray-200 hover:bg-gray-50 text-gray-700"
                    onClick={handleShare}
                    title="Compartir"
                  >
                    <Share2 className="w-4 h-4 sm:mr-1.5" />
                    <span className="hidden sm:inline text-xs font-semibold">Compartir</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="py-6 px-4 rounded-xl border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-700"
                    onClick={() => handleAddToWishList(book._id)}
                    title="Guardar en favoritos"
                  >
                    <Heart className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>

              {/* Ficha Técnica / Especificaciones */}
              <div className="rounded-2xl border border-gray-200/80 bg-gray-50/50 p-5">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Ficha Técnica del Ejemplar
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                  <div>
                    <span className="text-gray-400 block mb-0.5">Materia / Género</span>
                    <span className="font-semibold text-gray-800">{book.subject || "General"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Nivel / Curso</span>
                    <span className="font-semibold text-gray-800">{book.classType || "No especificado"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Editorial / Edición</span>
                    <span className="font-semibold text-gray-800">{book.edition || "Estándar"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Estado</span>
                    <span className="font-semibold text-gray-800">{book.condition}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Medio de Pago</span>
                    <span className="font-semibold text-gray-800">{book.paymentMode || "A convenir"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Código</span>
                    <span className="font-mono text-gray-600">#{book._id?.slice(-6)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== GRID 2: DESCRIPCIÓN Y VENDEDOR ========== */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* DESCRIPCIÓN (7 columnas) */}
          <Card className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-gray-200/80 p-6 sm:p-8">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                Descripción del Vendedor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {book.description || "El vendedor no proporcionó una descripción adicional para este libro."}
              </p>

              <div className="border-t border-gray-100 pt-5">
                <h4 className="text-sm font-bold text-gray-900 mb-1.5">
                  Comunidad BookKart Argentina
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Comprás de forma segura directamente a estudiantes y lectores de todo el país.
                  El dinero se libera al vendedor una vez coordinada y confirmada la entrega.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* VENDEDOR (5 columnas) */}
          <Card className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-gray-200/80 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <CardHeader className="p-0 mb-5">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Información del Vendedor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-orange-100 text-orange-700 font-extrabold text-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                    {book.seller?.name ? book.seller.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">
                      {book.seller?.name || "Vendedor Verificado"}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 fill-emerald-100" />
                      <span>Vendedor Verificado BookKart</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span>Argentina</span>
                </div>

                {book.seller?.phoneNumber && (
                  <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp: {book.seller.phoneNumber}</span>
                  </div>
                )}
              </CardContent>
            </div>

            <div className="pt-6 border-t border-gray-100 mt-6">
              <Button
                variant="outline"
                className="w-full rounded-xl py-5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => toast.success("Podés comunicarte tras agregar el libro al carrito")}
              >
                Preguntar al vendedor
              </Button>
            </div>
          </Card>
        </div>

        {/* ========== CÓMO FUNCIONA ========== */}
        <section className="mt-14">
          <h2 className="mb-6 text-xl font-bold text-gray-900">¿Cómo funciona la compra en BookKart?</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "Paso 1",
                title: "Elegís tu libro",
                description: "Agregás al carrito y coordinás el envío con el vendedor.",
                icon: BookOpen,
              },
              {
                step: "Paso 2",
                title: "Pago Protegido",
                description: "Tu dinero queda resguardado hasta que recibas el ejemplar.",
                icon: ShieldCheck,
              },
              {
                step: "Paso 3",
                title: "Recepción y disfrute",
                description: "Recibís el libro en tu casa o punto de entrega acordado.",
                icon: Truck,
              },
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-3"
                >
                  <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.step}
                  </span>
                  <div className="flex items-center gap-2.5 pt-1">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
