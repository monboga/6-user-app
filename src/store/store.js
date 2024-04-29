// el store para cada uno de nuestros modulos.
// contexto de usuarios
// contexto de auth
// etc

import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";

export const store = configureStore({
    reducer: {
        // configuracion de nuestros reducers.
        users: usersSlice.reducer,
        auth: authSlice.reducer,
    }
});