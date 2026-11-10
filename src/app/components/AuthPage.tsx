import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_URL, useForgotPasswordMutation, useRegisterMutation } from "@/store/api";
import { useLoginMutation} from "@/store/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authStatus, toggleLoginDialog, setUser } from "@/store/slice/userSlice";

interface LoginProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

interface forgotPasswordFormData {
  email: string;
}

const AuthPage: React.FC<LoginProps> = ({ isLoginOpen, setIsLoginOpen }) => {
  const [currentTab, setCurrentTab] = useState<"login" | "signup" | "forgot">(
    "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginError },
  } = useForm<LoginFormData>();

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signupError },
  } = useForm<SignUpFormData>();

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordError },
  } = useForm<forgotPasswordFormData>();

  const onSubmitLogin = async (data: LoginFormData) => {
    setLoginLoading(true);
    try {
      const response = await login(data).unwrap();
      if (response.success) {
        toast.success("¡Inicio de sesión exitoso!");
        const userData = response.data?.user || response.data;
        dispatch(setUser(userData));
        dispatch(authStatus());
        setIsLoginOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Error al iniciar sesión. Verificá tus credenciales.");
    } finally {
      setLoginLoading(false);
    }
  };

  const onSubmitSignUp = async (data: SignUpFormData) => {
    setSignupLoading(true);
    try {
      const response = await register(data).unwrap();
      if (response.success) {
        toast.success(response.message || "Cuenta creada exitosamente. Ya podés ingresar.");
        setCurrentTab("login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Error al registrarse.");
    } finally {
      setSignupLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    window.location.href = `${BASE_URL}/auth/google`;
  };

  const onSubmitForgotPassword = async (data: forgotPasswordFormData) => {
    setForgotPasswordLoading(true);
    try {
      const response = await forgotPassword(data).unwrap();
      if (response.success) {
        toast.success("Te enviamos el enlace de restablecimiento a tu email.");
        setForgotPasswordSuccess(true);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "No se pudo enviar el correo de recuperación.");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-4">
            Bienvenido a BookKart
          </DialogTitle>
          <Tabs
            value={currentTab}
            onValueChange={(value) =>
              setCurrentTab(value as "login" | "signup" | "forgot")
            }
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login">Ingresar</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
              <TabsTrigger value="forgot">Olvidé clave</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="login" className="space-y-4">
                  <form className="space-y-4" onSubmit={handleLoginSubmit(onSubmitLogin)}>
                    <div className="relative">
                      <Input
                        {...registerLogin("email", {
                          required: "El email es obligatorio",
                        })}
                        placeholder="Correo electrónico"
                        type="email"
                        className="pl-10"
                      />
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                    {loginError.email && (
                      <p className="text-red-500 text-xs">
                        {loginError.email.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerLogin("password", {
                          required: "La contraseña es obligatoria",
                        })}
                        placeholder="Contraseña"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                      />
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      {showPassword ? (
                        <EyeOff
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          size={20}
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <Eye
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          size={20}
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                    {loginError.password && (
                      <p className="text-red-500 text-xs">
                        {loginError.password.message}
                      </p>
                    )}

                    <Button type="submit" className="w-full font-bold">
                      {loginLoading ? (
                        <Loader2 className="animate-spin mr-2" size={20} />
                      ) : (
                        "Iniciar Sesión"
                      )}
                    </Button>
                  </form>

                  <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <p className="mx-2 text-gray-500 text-sm">O</p>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  <Button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  >
                    {googleLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Conectando con Google...
                      </>
                    ) : (
                      <>
                        <Image
                          src="/icons/google.svg"
                          alt="google"
                          width={20}
                          height={20}
                        />
                        Continuar con Google
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignUpSubmit(onSubmitSignUp)} className="space-y-4">
                    <div className="relative">
                      <Input
                        {...registerSignUp("name", {
                          required: "El nombre es obligatorio",
                        })}
                        placeholder="Nombre completo"
                        type="text"
                        className="pl-10"
                      />
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                    {signupError.name && (
                      <p className="text-red-500 text-xs">
                        {signupError.name.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerSignUp("email", {
                          required: "El email es obligatorio",
                        })}
                        placeholder="Correo electrónico"
                        type="email"
                        className="pl-10"
                      />
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                    {signupError.email && (
                      <p className="text-red-500 text-xs">
                        {signupError.email.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerSignUp("password", {
                          required: "La contraseña es obligatoria",
                        })}
                        placeholder="Contraseña"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                      />
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      {showPassword ? (
                        <EyeOff
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          size={20}
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <Eye
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          size={20}
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                    {signupError.password && (
                      <p className="text-red-500 text-xs">
                        {signupError.password.message}
                      </p>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...registerSignUp("agreeTerms", {
                          required:
                            "Debés aceptar los términos y condiciones",
                        })}
                        className="mr-2"
                      />

                      <label className="text-sm text-gray-700">
                        Acepto los Términos y Condiciones
                      </label>
                    </div>

                    {signupError.agreeTerms && (
                      <p className="text-red-500 text-xs">
                        {signupError.agreeTerms.message}
                      </p>
                    )}

                    <Button type="submit" className="w-full font-bold">
                      {signupLoading ? (
                        <Loader2 className="animate-spin mr-2" size={20} />
                      ) : (
                        "Registrarse"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="forgot" className="space-y-4">
                  {!forgotPasswordSuccess ? (
                    <form className="space-y-4" onSubmit={handleForgotPasswordSubmit(onSubmitForgotPassword)}>
                      <div className="relative">
                        <Input
                          {...registerForgotPassword("email", {
                            required: "El email es obligatorio",
                          })}
                          placeholder="Correo electrónico"
                          type="email"
                          className="pl-10"
                        />
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          size={20}
                        />
                      </div>
                      {forgotPasswordError.email && (
                        <p className="text-red-500 text-xs">
                          {forgotPasswordError.email.message}
                        </p>
                      )}

                      <Button type="submit" className="w-full font-bold">
                        {forgotPasswordLoading ? (
                          <Loader2 className="animate-spin mr-2" size={20} />
                        ) : (
                          "Enviar Enlace de Recuperación"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-4"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-xl font-semibold text-gray-700">
                        Enlace Enviado
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Te enviamos un enlace para restablecer tu contraseña. Por favor
                        revisá tu casilla de correo y seguí las instrucciones.
                      </p>
                      <Button
                        onClick={() => setForgotPasswordSuccess(false)}
                        className="w-full"
                      >
                        Enviar otro correo
                      </Button>
                    </motion.div>
                  )}
                </TabsContent>

                <p className="text-xs text-center mt-3 text-gray-500">
                  Al continuar, aceptás nuestros{" "}
                  <Link
                    href="/terms-of-use"
                    className="text-blue-500 hover:underline"
                  >
                    Términos de Uso
                  </Link>
                  {" y nuestra "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-500 hover:underline"
                  >
                    Política de Privacidad
                  </Link>
                  .
                </p>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPage;
