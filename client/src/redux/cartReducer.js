import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotal: 0,
    cartTotalCost: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            const isExisting = existingItem !== undefined;

            if (isExisting) {
                existingItem.quantity++;
                state.cartTotalCost += newItem.price;
            } else {
                state.cartItems.push(newItem);
                state.cartTotal += 1;
                state.cartTotalCost += newItem.price;
            }
            state.cartTotalCost = +state.cartTotalCost.toFixed(2);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        decreaseCartItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            if (existingItem.quantity > 1) {
                existingItem.quantity--;
                state.cartTotalCost -= existingItem.price;
            } else {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
                state.cartTotal -= 1;
                state.cartTotalCost -= existingItem.price;
            }
            state.cartTotalCost = +state.cartTotalCost.toFixed(2);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        deleteCartItem: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((item) => item.id === id);
            state.cartTotalCost -= item.price * item.quantity;
            state.cartTotalCost = +state.cartTotalCost.toFixed(2);
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
            state.cartTotal -= 1;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.cartTotal = 0;
            state.cartTotalCost = 0;
            localStorage.removeItem("cart");
        },
        getCart: (state) => {
            const cart = JSON.parse(localStorage.getItem("cart"));
            if (cart) {
                state.cartItems = cart.cartItems;
                state.cartTotalCost = +cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                ).toFixed(2);
            }
        },
    },
});

export const {
    addCartItem,
    decreaseCartItem,
    deleteCartItem,
    clearCart,
    getCart,
    getCartTotalCost,
} = cartSlice.actions;

export default cartSlice.reducer;
