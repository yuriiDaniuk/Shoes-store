import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IProduct } from '../../types';

export interface CartItem extends IProduct{
    quantity: number;
}

interface CartState{
    items: CartItem[];
    totalPrice: number;
}
const initialState: CartState = {
    items: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<IProduct>){
            const product = action.payload;

            const existingItem = state.items.find(item => item.id === product.id);

            if(existingItem){
                existingItem.quantity += 1;
            }
            else{
                state.items.push({...product, quantity: 1});
            }

            state.totalPrice = Number((state.totalPrice + product.price).toFixed(2));

        },

    }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;