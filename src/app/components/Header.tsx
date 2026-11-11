"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BookLock,
  ChevronRight,
  FileTerminal,
  Heart,
  HelpCircle,
  Lock,
  LogOut,
  Menu,
  Package,
  PiggyBank,
  Search,
  ShoppingCart,
  User,
  User2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleLoginDialog, logout } from "@/store/slice/userSlice";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthPage from "./AuthPage";
import { useLoginMutation, useLogoutMutation } from "@/store/api";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoginOpen = useSelector(
    (state: RootState) => state.user.isLoginDialogOpen
  );

  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.cart?.items || []);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  
  const [logoutMutation] = useLogoutMutation(); 

  const userPlaceholder = user?.name?.split(" ").map((name:string) => name[0]).join("");

  const handleLoginClick = () => {
    dispatch(toggleLoginDialog());
    setIsDropdownOpen(false);
  };

  const handleProtectionNavigation = (href: string) => {
    if (user) {
      router.push(href);
      setIsDropdownOpen(false);
    } else {
      dispatch(toggleLoginDialog());
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = async() => {
    try {
      await logoutMutation({}).unwrap();   
      dispatch(logout()); 
      toast.success("Sesión cerrada correctamente");
      setIsDropdownOpen(false);
    } catch {
      toast.error("Error al cerrar sesión");
    }
  };

  const menuItems = [
    ...(user && user
      ? [
          {
            href: "/account/profile",
            content: (
              <div className="flex space-x-4 items-center p-2 border-b">
                <Avatar className="w-12 h-12 -ml-2 rounded-full">
                  {user?.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt="user_image"></AvatarImage>
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-md">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </div>
            ),
          },
        ]
      : [
          {
            icon: <Lock className="h-5 w-5" />,
            label: "Ingresar / Registrarse",
            onClick: handleLoginClick,
          },
        ]),

    {
      icon: <User className="h-5 w-5" />,
      label: "Mi Perfil",
      onClick: () => handleProtectionNavigation("/account/profile"),
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "Mis Pedidos",
      onClick: () => handleProtectionNavigation("/account/orders"),
    },
    {
      icon: <PiggyBank className="h-5 w-5" />,
      label: "Mis Libros en Venta",
      onClick: () => handleProtectionNavigation("/account/selling-products"),
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Carrito",
      onClick: () => handleProtectionNavigation("/checkout/cart"),
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Lista de Deseos",
      onClick: () => handleProtectionNavigation("/account/wishList"),
    },
    {
      icon: <User2 className="h-5 w-5" />,
      label: "Sobre Nosotros",
      href: "/about-us",
    },
    {
      icon: <FileTerminal className="h-5 w-5" />,
      label: "Términos y Condiciones",
      href: "/terms-of-user",
    },
    {
      icon: <BookLock className="h-5 w-5" />,
      label: "Política de Privacidad",
      href: "/privacy-policy",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: "Ayuda",
      href: "/how-it-work",
    },
    ...(user && user 
      ? [
          {
            icon: <LogOut className="h-5 w-5" />,
            label: "Cerrar Sesión",
            onClick: handleLogout,
          },
        ]
      : []),
  ];

  const MenuItems = ({ className = "" }) => (
    <div className={className}>
      {menuItems?.map((item, index) =>
        item?.href ? (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-gray-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            {item.icon}
            <span>{item?.label}</span>
            {item?.content && <div className="mt-1">{item?.content}</div>}
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
        ) : (
          <button
            key={index}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-gray-200"
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item?.label}</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </button>
        )
      )}
    </div>
  );

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Desktop header */}
      <div className="container w-[80%] mx-auto hidden lg:flex items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop_logo"
            className="h-15 w-auto"
          />
        </Link>
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Título / Autor / Género / Editorial..."
              className="w-full pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/book-sell">
            <Button
              className="bg-orange-600 text-white hover:bg-orange-700 font-semibold shadow-sm"
            >
              Vender Libro Usado
            </Button>
          </Link>

          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Avatar className="w-8 h-8 rounded-full">
                  {user?.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt="user_image"></AvatarImage>
                  ) : userPlaceholder ? (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  ) : (
                    <User className="ml-2 mt-2" />
                  )}
                </Avatar>
                Mi Cuenta
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2">
              <MenuItems />
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={"/checkout/cart"}>
            <div className="relative">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrito
              </Button>
              {cartCount > 0 && (
                <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold leading-none">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/*Mobile Header*/}
      <div className="container mx-auto flex lg:hidden items-center justify-between p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader>
              <SheetTitle className="sr-only">Menú</SheetTitle>
            </SheetHeader>
            <div className="border-b p-4">
              <Link href="/">
                <Image
                  src="/images/web-logo.png"
                  width={150}
                  height={40}
                  alt="mobile_logo"
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <MenuItems className="py-2" />
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop_logo"
            className="h-6 md:h10 w-20 md:w-auto"
          />
        </Link>
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Buscar libros..."
              className="w-full pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Link href={"/checkout/cart"}>
          <div className="relative">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
            </Button>
            {cartCount > 0 && (
              <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold leading-none">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>
      <AuthPage isLoginOpen={isLoginOpen} setIsLoginOpen={handleLoginClick} />
    </header>
  );
};

export default Header;
