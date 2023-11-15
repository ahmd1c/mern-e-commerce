import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";

export const store = configureStore({
    reducer: { 
        user: userReducer,
        cart: cartReducer 
    },
});
