import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore,FLUSH,REHYDRATE,PAUSE,PURGE,PERSIST,REGISTER} from 'redux-persist'
import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";
import { api } from "./api";

// Configuración de persistencia para usuario
const userPersistConfig = { key: 'user', storage, whitelist: ['user', 'isEmailVerified', 'isLoggedIn'] };

// Configuración de persistencia para carrito
const cartPersistConfig = { key: 'cart', storage, whitelist: ['items'] };

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        user: persistedUserReducer,
        cart: persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER]
            },
        }).concat(api.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
