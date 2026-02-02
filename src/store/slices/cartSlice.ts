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

function loadStateFromLocalStorage(): CartState {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return { items: [], totalPrice: 0 };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state from localStorage:", err);
        return { items: [], totalPrice: 0 };
    }
}

const initialState: CartState = loadStateFromLocalStorage();


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<IProduct>){
            const product: IProduct = action.payload;

            const existingItem = state.items.find(item => item.id === product.id);

            if(existingItem){
                existingItem.quantity += 1;
            }
            else{
                state.items.push({...product, quantity: 1});
            }

            state.totalPrice = Number((state.totalPrice + product.price).toFixed(2));

        },
        deleteFromCart(state, action: PayloadAction<number>){
            const id = action.payload;
            
            const existingItem = state.items.find(item => item.id === id);

            if(existingItem){
                state.items = state.items.filter((item) => item.id !== existingItem.id);
                state.totalPrice = Number((state.totalPrice - (existingItem.price * existingItem.quantity)).toFixed(2));
            }
        },
        changeQuantity(state, action : PayloadAction<{id: number; type: 'increase' | 'decrease'}>){
            const { id, type } = action.payload;

            const existingItem = state.items.find(item => item.id === id);

            if(existingItem){

                if(type === 'increase'){
                existingItem.quantity++;
                state.totalPrice = Number((state.totalPrice + existingItem.price).toFixed(2));
                }
                else if(type === 'decrease' && existingItem.quantity > 1){
                existingItem.quantity--;
                state.totalPrice = Number((state.totalPrice - existingItem.price).toFixed(2));
                }
                else if(type === 'decrease' && existingItem.quantity === 1){
                state.items = state.items.filter((item) => item.id !== existingItem.id);
                state.totalPrice = Number((state.totalPrice - existingItem.price).toFixed(2));
                }
            }

        },


    }
})

export const { addToCart,  deleteFromCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;