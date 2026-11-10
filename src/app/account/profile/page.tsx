"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, CheckCircle, Package, PiggyBank, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.user);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");

  const userInitial = user?.name ? user.name[0]?.toUpperCase() : "U";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Perfil actualizado correctamente");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Mi Perfil
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta lateral con avatar y accesos directos */}
          <Card className="rounded-xl border shadow-sm p-6 flex flex-col items-center text-center bg-white h-fit">
            <Avatar className="w-24 h-24 mb-4 border-2 border-orange-500 shadow-sm">
              {user?.profilePicture ? (
                <AvatarImage src={user.profilePicture} alt={user?.name || "Usuario"} />
              ) : (
                <AvatarFallback className="text-3xl font-bold bg-orange-100 text-orange-700">
                  {userInitial}
                </AvatarFallback>
              )}
            </Avatar>

            <h2 className="text-xl font-bold text-gray-900">{user?.name || "Usuario"}</h2>
            <p className="text-xs text-gray-500 mb-4">{user?.email || "sin-correo@ejemplo.com"}</p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-6">
              <CheckCircle className="w-3.5 h-3.5" /> Cuenta verificada
            </div>

            <div className="w-full border-t border-gray-100 pt-4 space-y-2 text-left">
              <Link
                href="/account/orders"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" /> Mis Pedidos
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link
                href="/account/selling-products"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-gray-500" /> Mis Libros en Venta
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link
                href="/account/wishList"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-gray-500" /> Lista de Deseos
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </Card>

          {/* Formulario de información personal */}
          <Card className="md:col-span-2 rounded-xl border shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl">Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre y apellido"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                    <Input
                      value={user?.email || ""}
                      disabled
                      className="pl-10 bg-gray-50 text-gray-500"
                    />
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    El correo electrónico está vinculado a tu cuenta.
                  </span>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Teléfono / WhatsApp
                  </label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer"
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
