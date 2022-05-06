import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './reducers/cart-slice'
import modalReducer from './reducers/modal-slice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer
    }
})

export default store