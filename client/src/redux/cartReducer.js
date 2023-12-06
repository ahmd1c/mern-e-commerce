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
                (item) => item._id === newItem._id
            );
            const isExisting = existingItem !== undefined;

            if (isExisting) {
                existingItem.quantity++;
                state.cartTotalCost += newItem.currentPrice;
            } else {
                state.cartItems.push(newItem);
                state.cartTotal += 1;
                state.cartTotalCost += newItem.currentPrice;
            }
            state.cartTotalCost = +state.cartTotalCost.toFixed(2);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        decreaseCartItem: (state, action) => {
            const _id = action.payload;
            const existingItem = state.cartItems.find((item) => item._id === _id);
            if (existingItem.quantity > 1) {
                existingItem.quantity--;
                state.cartTotalCost -= existingItem.currentPrice;
            } else {
                state.cartItems = state.cartItems.filter((item) => item._id !== _id);
                state.cartTotal -= 1;
                state.cartTotalCost -= existingItem.currentPrice;
            }
            state.cartTotalCost = +state.cartTotalCost.toFixed(2);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        deleteCartItem: (state, action) => {
            const _id = action.payload;
            const item = state.cartItems.find((item) => item._id === _id);
            state.cartTotalCost -= item.currentPrice * item.quantity;
            state.cartTotalCost = +state.cartTotalCost.toFixed(2);
            state.cartItems = state.cartItems.filter((item) => item._id !== _id);
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
                    (acc, item) => acc + item.currentPrice * item.quantity,
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
