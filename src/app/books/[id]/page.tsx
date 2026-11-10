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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slice/cartSlice";

const Page = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string) || "1";
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const book = {
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
    }, 400);
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

  const bookImage = book?.images || [];

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* BREADCRUMB */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/books" className="text-primary hover:underline">
            Libros
          </Link>
          <span>/</span>
          <span className="text-gray-600">{book.category}</span>
          <span>/</span>
          <span className="text-gray-600">{book.title}</span>
        </nav>

        {/* ========== GRID 1: IMÁGENES Y DETALLES ========== */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* COLUMNA IZQUIERDA - IMÁGENES */}
          <div className="space-y-4">
            <div className="relative h-[480px] overflow-hidden rounded-lg border bg-white shadow-md">
              <Image
                src={bookImage[selectedImage] || "/images/book1.jpg"}
                alt={book.title}
                fill
                className="object-contain"
              />
              {calculateDiscount(book.price, book.finalPrice) > 0 && (
                <span className="absolute left-0 top-2 rounded-r-lg px-2 py-1 text-xs font-medium bg-orange-600/90 text-white hover:bg-orange-700">
                  {calculateDiscount(book.price, book.finalPrice)} % OFF
                </span>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {bookImage.map((images, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-200 ${
                    selectedImage === index
                      ? "ring-2 ring-primary scale-105"
                      : "hover:scale-105"
                  }`}
                >
                  <Image
                    src={images}
                    alt={`${book.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA - DETALLES */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{book.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Publicado {formatDate(book.createdAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleShare}>Compartir</Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToWishList(book._id)}
                >
                  <Heart className="h-4 w-4 mr-1 fill-red-500" />
                  <span className="hidden md:inline">Favoritos</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold">${book.finalPrice}</span>
                {book.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${book.price}
                  </span>
                )}
                <Badge variant="secondary" className="text-green-600">
                  Envío disponible
                </Badge>
              </div>

              <Button
                className="w-60 py-6 bg-blue-700 hover:bg-blue-800"
                onClick={handleAddToCart}
                disabled={isAddToCart}
              >
                {isAddToCart ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Agregando al Carrito...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Comprar Ahora
                  </>
                )}
              </Button>

              <Card className="border border-gray-700 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Detalles del Libro</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="font-medium text-muted-foreground">
                      Materia / Título
                    </div>
                    <div>{book.subject}</div>
                    <div className="font-medium text-muted-foreground">
                      Curso
                    </div>
                    <div>{book.classType}</div>
                    <div className="font-medium text-muted-foreground">
                      Categoría
                    </div>
                    <div>{book.category}</div>
                    <div className="font-medium text-muted-foreground">
                      Autor
                    </div>
                    <div>{book.author}</div>
                    <div className="font-medium text-muted-foreground">
                      Edición
                    </div>
                    <div>{book.edition}</div>
                    <div className="font-medium text-muted-foreground">
                      Estado
                    </div>
                    <div>{book.condition}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* ========== FIN GRID 1 ========== */}

        {/* ========== GRID 2: DESCRIPTION Y SELLER ========== */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{book.description}</p>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Nuestra Comunidad</h3>
                <p className="text-muted-foreground">
                  No somos otra tienda online donde comprás a revendedores
                  profesionales: somos una comunidad de estudiantes y amantes de los libros en toda Argentina que comparten su pasión.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div>Publicación #{book._id}</div>
                <div>Publicado: {formatDate(book.createdAt)}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Vendido Por</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-300 flex items-center justify-center">
                    <User2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{book.seller.name}</span>
                    <span className="text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        verificado
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Buenos Aires, Argentina
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              {book.seller.phoneNumber && (
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle />
                  <span>Contacto: {book.seller.phoneNumber}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* ========== FIN GRID 2 ========== */}

        {/* How it works section */}
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">¿Cómo funciona?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "Paso 1",
                title: "El vendedor publica un anuncio",
                description:
                  "El vendedor publica un anuncio en BookKart para vender sus libros usados.",
                image: { src: "/icons/ads.png", alt: "Publicar Anuncio" },
              },
              {
                step: "Paso 2",
                title: "El comprador paga online",
                description:
                  "El comprador realiza el pago protegido en BookKart para comprar los libros.",
                image: { src: "/icons/pay_online.png", alt: "Pago" },
              },
              {
                step: "Paso 3",
                title: "El vendedor envía los libros",
                description: "El vendedor despacha los libros directo al comprador.",
                image: { src: "/icons/fast-delivery.png", alt: "Envío" },
              },
            ].map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-amber-50 to-amber-100 border-none">
                <CardHeader>
                  <Badge className="w-fit mb-2">{item.step}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={120}
                    height={120}
                    className="mx-auto"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;


