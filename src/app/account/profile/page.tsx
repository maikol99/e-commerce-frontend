"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUser, logout } from "@/store/slice/userSlice";
import { useUpdateUserMutation, useLogoutMutation } from "@/store/api";
import AccountSidebar from "@/app/components/AccountSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User as UserIcon,
  Mail,
  Phone,
  Package,
  PiggyBank,
  Heart,
  LogOut,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.user);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");

  const [updateUserMutation, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phoneNumber || "");
    }
  }, [user]);

  const userInitial = user?.name ? user.name[0]?.toUpperCase() : "U";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) {
      toast.error("Debés iniciar sesión.");
      return;
    }

    try {
      const res: any = await updateUserMutation({
        userId: user._id,
        userData: {
          name: name.trim(),
          phoneNumber: phone.trim(),
        },
      }).unwrap();

      const updatedData = res?.data || res;
      // Actualizamos Redux para que el Header y la app sincronicen el nuevo nombre/teléfono
      dispatch(setUser({ ...user, ...updatedData }));
      toast.success("¡Perfil actualizado con éxito!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "No se pudo actualizar el perfil.");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation({}).unwrap();
    } catch (e) {
      // Ignorar error si la sesión ya expiró
    }
    dispatch(logout());
    toast.success("Sesión cerrada");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
            <UserIcon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Iniciá Sesión</h2>
          <p className="text-sm text-gray-500">
            Para ver y gestionar tu información personal, iniciá sesión en tu cuenta.
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
          {/* ============================================================ */}
          {/* SIDEBAR IZQUIERDA: "Tu Cuenta"                               */}
          {/* ============================================================ */}
          <div className="md:col-span-3">
            <AccountSidebar />
          </div>

          {/* ============================================================ */}
          {/* CONTENIDO DERECHO: Header Banner + Formulario Card           */}
          {/* ============================================================ */}
          <div className="md:col-span-9 space-y-6">
            {/* Banner Superior Estilo la Captura (Gradiente Naranja BookKart) */}
            <div className="rounded-3xl p-8 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-extrabold tracking-tight mb-1">
                  Mi Perfil
                </h1>
                <p className="text-sm text-orange-100 font-medium">
                  Administrá tu información personal y preferencias de tu cuenta BookKart.
                </p>
              </div>
              {/* Círculo sutil decorativo de fondo */}
              <div className="absolute -right-8 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Tarjeta de Información Personal */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 pb-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">
                  Información Personal
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Actualizá los datos de contacto visibles para tus compras y ventas de libros.
                </p>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nombre de Usuario */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                      Nombre y Apellido
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: Maikol Alegre"
                        required
                        className="pl-10 h-11 rounded-xl bg-gray-50/70 border-gray-200 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Correo Electrónico */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                      <Input
                        value={user.email}
                        disabled
                        className="pl-10 h-11 rounded-xl bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Teléfono / WhatsApp */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Teléfono / WhatsApp
                  </label>
                  <div className="relative max-w-sm">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej: +54 9 11 1234-5678"
                      className="pl-10 h-11 rounded-xl bg-gray-50/70 border-gray-200 focus:bg-white text-sm"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1.5">
                    Se usará para coordinar la entrega o envío de tus libros vendidos.
                  </p>
                </div>

                {/* Botón Editar / Guardar Perfil con estilo la captura */}
                <div className="pt-4 border-t border-gray-100">
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-7 py-5 rounded-xl shadow-md shadow-orange-600/20 gap-2 cursor-pointer transition-all"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Guardando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
