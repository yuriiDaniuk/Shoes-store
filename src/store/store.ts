import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice'; 

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
});

store.subscribe(() => {
    const state = store.getState().cart;

    localStorage.setItem('cartState', JSON.stringify(state));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;