import React, { useEffect, useState } from "react";
import {useVerifyAuthMutation} from "../api"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout, setEmailVerified, setUser, authStatus } from "../slice/userSlice";
import BookLoader from "@/lib/BookLoader";

export default function AuthCheck({children} : {children:React.ReactNode}) {
    const [verifyAuth, {isLoading}] = useVerifyAuthMutation();
    const [isCheckingAuth,setIsCheckingAuth] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user)
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

    useEffect(() => {
        const checkAuth = async() => {
            try {
                const response = await verifyAuth({}).unwrap();
                console.log('this is response', response)
                if(response.success && response.data && response.data.user){
                    dispatch(setUser(response.data.user));
                    dispatch(setEmailVerified(response.data.user.isVerified))
                    // Asegurar que isLoggedIn esté en true si el usuario está autenticado
                    dispatch(authStatus())
                }else{
                    dispatch(logout())
                }
            } catch (error) {
                // Si hay un error de autenticación, hacer logout solo si el usuario estaba marcado como logueado
                // o si hay un usuario en el store (inconsistencia)
                if(isLoggedIn || user){
                    dispatch(logout())
                }
            }
            finally{
                setIsCheckingAuth(false);
            }
        };

        // Verificar autenticación si no hay usuario en el store
        // Esto cubre los casos de:
        // 1. Login con Google (cookie presente pero no hay usuario en Redux)
        // 2. Recarga de página (cookie presente pero estado de Redux se perdió)
        // 3. Primera carga de la app (verificar si hay cookie de sesión previa)
        if(!user){
            checkAuth();
        }else{
            setIsCheckingAuth(false);
        }
    },[verifyAuth,dispatch,user, isLoggedIn])

    if(isLoading || isCheckingAuth){
        return <BookLoader/>
    }
    
    return <>{children}</>

}