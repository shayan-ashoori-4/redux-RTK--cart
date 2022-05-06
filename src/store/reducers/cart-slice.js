import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import cartItems from '../../cartItems'; //static

const URL = 'https://course-api.com/react-useReducer-cart-projects';

export const getCartItems = createAsyncThunk(
    'cart/getItems',
    async (params, thunkAPI) => {
        try {
            const res = await axios(URL);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    })
const initialState = {
    cartItems: [],
    amount: 1,
    total: 0,
    isLoading: true
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(items => items.id !== productId);
            state.total--;
        },
        increase: (state, action) => {
            const productId = action.payload;
            const product = state.cartItems.find(items => items.id === productId);
            product.amount = ++product.amount;
        },
        decrease: (state, action) => {
            const productId = action.payload;
            const product = state.cartItems.find(items => items.id === productId);
            product.amount = --product.amount;
        },
        calculateTotals: (state) => {
            let totalPrice = 0;
            let totalAmount = 0;
            let products = state.cartItems;

            products.forEach(items => {
                totalPrice += items.amount * items.price;
                totalAmount += items.amount;
            })

            state.total = totalPrice;
            state.amount = totalAmount;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => { state.isLoading = true },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state, action) => {
            state.isLoading = false
            console.log(action.payload);
        },
    }

})

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;