"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/slice/userSlice";
import { useLogoutMutation } from "@/store/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  User as UserIcon,
  Package,
  PiggyBank,
  Heart,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

const NAV_LINKS = [
  { href: "/account/profile", label: "Mi Perfil", Icon: UserIcon },
  { href: "/account/orders", label: "Mis Pedidos", Icon: Package },
  { href: "/account/selling-products", label: "Mis Libros en Venta", Icon: PiggyBank },
  { href: "/account/wishList", label: "Lista de Deseos", Icon: Heart },
];

export default function AccountSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.user);
  const [logoutMutation] = useLogoutMutation();

  const userInitial = user?.name ? user.name[0]?.toUpperCase() : "U";

  const handleLogout = async () => {
    try {
      await logoutMutation({}).unwrap();
    } catch {
      // Sesión ya expirada — ignorar
    }
    dispatch(logout());
    toast.success("Sesión cerrada");
    router.push("/");
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white rounded-3xl p-6 shadow-xl space-y-6 sticky top-24">
      <h2 className="text-xl font-bold tracking-tight text-white/90">Tu Cuenta</h2>

      {/* Tarjeta de usuario */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
        <Avatar className="w-12 h-12 rounded-full border-2 border-orange-500/80 shadow-md">
          {user?.profilePicture ? (
            <AvatarImage src={user.profilePicture} alt={user?.name || "Usuario"} />
          ) : (
            <AvatarFallback className="bg-orange-500 text-white font-bold text-lg">
              {userInitial}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-white truncate">{user?.name}</h3>
          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
        </div>
      </div>

      {/* Links de navegación */}
      <nav className="space-y-2">
        {NAV_LINKS.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              pathname === href
                ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Cerrar Sesión */}
      <div className="pt-4 border-t border-white/10">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-5 rounded-2xl gap-2 shadow-sm border-0 cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
