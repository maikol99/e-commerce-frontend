"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetProductByIdQuery, useUpdateProductByIdMutation } from "@/store/api";
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
} from "lucide-react";
import toast from "react-hot-toast";

export default function BookEditPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  const { data: apiData, isLoading: isLoadingProduct } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductByIdMutation();

  const product = apiData?.data;

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

  // Imágenes existentes y nuevas
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setAuthor(product.author || "");
      setEdition(product.edition || "");
      setCategory(product.category || "Lectura Recreativa");
      setClassType(product.classType || "Universitario");
      setSubject(product.subject || "");
      setCondition(product.condition || "Excelente");
      setPrice(product.price ? String(product.price) : "");
      setFinalPrice(product.finalPrice ? String(product.finalPrice) : "");
      setShippingCharge(product.shippingCharge ? String(product.shippingCharge) : "0");
      setDescription(product.description || "");
      setExistingImages(Array.isArray(product.images) ? product.images : []);
    }
  }, [product]);

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    if (newImages.length + selectedFiles.length > 4) {
      toast.error("Podés subir hasta 4 fotos en total.");
      return;
    }

    const files = [...newImages, ...selectedFiles];
    setNewImages(files);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setNewPreviewUrls((prev) => [...prev, ...urls]);
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviewUrls[index]);
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Debés iniciar sesión.");
      return;
    }

    if (!title.trim() || !author.trim() || !price || !finalPrice) {
      toast.error("Por favor completá los campos obligatorios.");
      return;
    }

    if (Number(finalPrice) > Number(price)) {
      toast.error("El precio con descuento no puede ser mayor al precio original.");
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
      formData.append("description", description.trim());

      newImages.forEach((file) => {
        formData.append("images", file);
      });

      await updateProduct({ id, formData }).unwrap();
      toast.success("¡Libro actualizado con éxito!");
      router.push("/account/selling-products");
    } catch (err: any) {
      console.error("Error al actualizar libro:", err);
      toast.error(err?.data?.message || "No se pudo actualizar el libro.");
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/account/selling-products">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Mis Libros en Venta
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Libro</h1>
            <p className="text-sm text-gray-500">
              Modificá los datos o el precio de tu publicación
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
                Fotos actuales del libro. Si subís fotos nuevas reemplazarán a las existentes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {newPreviewUrls.length === 0 && existingImages.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2 font-medium">Fotos actuales:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {existingImages.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden border bg-gray-50"
                      >
                        <Image src={url} alt={`Foto ${index + 1}`} fill className="object-cover" />
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                            Portada
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {newPreviewUrls.length > 0 && (
                <div>
                  <p className="text-xs text-orange-600 mb-2 font-medium">Nuevas fotos a guardar:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {newPreviewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden border bg-gray-50"
                      >
                        <Image src={url} alt={`Nueva foto ${index + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <label className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-xl cursor-pointer text-xs font-semibold text-gray-700 hover:text-orange-600 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Subir fotos de reemplazo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNewImageChange}
                  className="hidden"
                />
              </label>
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
                      <SelectItem value="Excelente">Excelente (Como nuevo)</SelectItem>
                      <SelectItem value="Bueno">Bueno (Poco uso)</SelectItem>
                      <SelectItem value="Aceptable">Aceptable (Con detalles)</SelectItem>
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="finalPrice" className="text-sm font-semibold">
                    Precio de Venta ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="finalPrice"
                    type="number"
                    min="1"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                    required
                    className="mt-1.5 font-bold text-orange-600"
                  />
                </div>

                <div>
                  <Label htmlFor="shippingCharge" className="text-sm font-semibold">
                    Costo de Envío ($)
                  </Label>
                  <Input
                    id="shippingCharge"
                    type="number"
                    min="0"
                    value={shippingCharge}
                    onChange={(e) => setShippingCharge(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-semibold">
                  Descripción y Detalles del Libro
                </Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <div className="flex gap-4">
            <Link href="/account/selling-products" className="w-1/3">
              <Button type="button" variant="outline" className="w-full py-6 rounded-xl">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isUpdating}
              className="w-2/3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Guardando cambios...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
