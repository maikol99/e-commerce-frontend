"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAddProductsMutation } from "@/store/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  X,
  Loader2,
  BookOpen,
  ArrowLeft,
  DollarSign,
  Tag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function BookSellPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [addProduct, { isLoading }] = useAddProductsMutation();

  // Estados del formulario
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [category, setCategory] = useState("Lectura Recreativa");
  const [classType, setClassType] = useState("Universitario");
  const [subject, setSubject] = useState("");
  const [condition, setCondition] = useState("Excelente");
  const [price, setPrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [shippingCharge, setShippingCharge] = useState("0");
  const [description, setDescription] = useState("");

  // Manejo de imágenes (máximo 4)
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 4) {
      toast.error("Podés subir un máximo de 4 fotos.");
      return;
    }

    const newFiles = [...images, ...selectedFiles];
    setImages(newFiles);

    const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Debés iniciar sesión para publicar un libro.");
      return;
    }

    if (images.length === 0) {
      toast.error("Por favor subí al menos una foto del libro.");
      return;
    }

    if (!title.trim() || !author.trim() || !price || !finalPrice) {
      toast.error("Por favor completá los campos obligatorios.");
      return;
    }

    const numPrice = Number(price);
    const numFinalPrice = Number(finalPrice);
    if (numFinalPrice > numPrice) {
      toast.error("El precio de venta con descuento no puede ser mayor al precio original.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("author", author.trim());
      formData.append("edition", edition.trim() || "Estándar");
      formData.append("category", category);
      formData.append("classType", classType);
      formData.append("subject", subject.trim() || "General");
      formData.append("condition", condition);
      formData.append("price", price);
      formData.append("finalPrice", finalPrice);
      formData.append("shippingCharge", shippingCharge || "0");
      formData.append("description", description.trim() || "Libro usado en buen estado.");
      formData.append("paymentMode", "Bank Account");

      images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await addProduct(formData).unwrap();
      toast.success("¡Libro publicado con éxito!");
      router.push("/account/selling-products");
    } catch (err: any) {
      console.error("Error al publicar libro:", err);
      toast.error(err?.data?.message || "Ocurrió un error al publicar el libro. Intentá nuevamente.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Iniciá sesión para vender
            </h2>
            <p className="text-gray-500 mb-6">
              Para publicar tus libros usados y recibir compras de otros usuarios, necesitás tener tu sesión activa.
            </p>
            <Link href="/">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 rounded-xl">
                Volver al Inicio para Iniciar Sesión
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Cabecera */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/books">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Catálogo
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Publicar Libro Usado</h1>
            <p className="text-sm text-gray-500">
              Completá los datos del libro para ponerlo a la venta en la comunidad
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Fotos */}
          <Card className="bg-white rounded-2xl shadow-sm border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="w-5 h-5 text-orange-600" /> Fotos del Libro
              </CardTitle>
              <CardDescription>
                Subí hasta 4 fotos reales del libro (portada, contratapa y estado de las páginas).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden border bg-gray-50 group"
                  >
                    <Image
                      src={url}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                        Portada
                      </span>
                    )}
                  </div>
                ))}

                {previewUrls.length < 4 && (
                  <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-xl cursor-pointer bg-gray-50 hover:bg-orange-50/30 transition-all p-3 text-center">
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600 font-medium">Agregar foto</span>
                    <span className="text-[10px] text-gray-400">PNG o JPG</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Información Básica */}
          <Card className="bg-white rounded-2xl shadow-sm border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-600" /> Información Principal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold">
                  Título del Libro <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Ej: Cien años de soledad"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author" className="text-sm font-semibold">
                    Autor <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    placeholder="Ej: Gabriel García Márquez"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="edition" className="text-sm font-semibold">
                    Edición / Editorial
                  </Label>
                  <Input
                    id="edition"
                    placeholder="Ej: Edición 50 Aniversario / Sudamericana"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Categoría y Estado */}
          <Card className="bg-white rounded-2xl shadow-sm border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="w-5 h-5 text-orange-600" /> Categoría y Estado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold">Categoría</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lectura Recreativa">
                        Lectura Recreativa (Novelas, Historia, etc.)
                      </SelectItem>
                      <SelectItem value="Universitario">
                        Universitario / Educación Superior
                      </SelectItem>
                      <SelectItem value="Escolar">
                        Escolar / Primaria y Secundaria
                      </SelectItem>
                      <SelectItem value="Preparación de Exámenes">
                        Preparación de Exámenes
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Estado de Conservación</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excelente">Excelente (Como nuevo, sin marcas)</SelectItem>
                      <SelectItem value="Bueno">Bueno (Poco uso, marcas mínimas)</SelectItem>
                      <SelectItem value="Aceptable">Aceptable (Subrayado o detalles visibles)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject" className="text-sm font-semibold">
                    Materia / Género
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Ej: Ficción, Medicina, Matemáticas"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold">Nivel Académico / Tipo</Label>
                  <Select value={classType} onValueChange={setClassType}>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Seleccionar nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Universitario">Universitario / Grado</SelectItem>
                      <SelectItem value="Posgrado">Posgrado / Maestría</SelectItem>
                      <SelectItem value="Ingeniería">Ingeniería / Tecnología</SelectItem>
                      <SelectItem value="Secundario">Secundario</SelectItem>
                      <SelectItem value="Primario">Primario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Precios y Envío */}
          <Card className="bg-white rounded-2xl shadow-sm border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-orange-600" /> Precio y Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price" className="text-sm font-semibold">
                    Precio Original ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    placeholder="Ej: 15000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="mt-1.5"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Precio nuevo de referencia</p>
                </div>

                <div>
                  <Label htmlFor="finalPrice" className="text-sm font-semibold">
                    Precio de Venta ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="finalPrice"
                    type="number"
                    min="1"
                    placeholder="Ej: 8500"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                    required
                    className="mt-1.5 font-bold text-orange-600"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Lo que pagará el comprador</p>
                </div>

                <div>
                  <Label htmlFor="shippingCharge" className="text-sm font-semibold">
                    Costo de Envío ($)
                  </Label>
                  <Input
                    id="shippingCharge"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={shippingCharge}
                    onChange={(e) => setShippingCharge(e.target.value)}
                    className="mt-1.5"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Dejá en 0 si acuerdan entrega</p>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-semibold">
                  Descripción y Detalles del Libro
                </Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Contá en qué estado está el libro, si tiene anotaciones, hojas dobladas, o detalles relevantes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botón de Publicación */}
          <div className="flex gap-4">
            <Link href="/books" className="w-1/3">
              <Button type="button" variant="outline" className="w-full py-6 rounded-xl">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-2/3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Publicando libro...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Publicar Libro Ahora
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
