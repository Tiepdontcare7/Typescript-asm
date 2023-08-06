import { configureStore } from "@reduxjs/toolkit";
import reducerProduct from './productSlice'
import reducerCategory from './categoryProductSlice'
import reducerUser from './userSlice'

const store = configureStore({
    reducer: {
        product: reducerProduct,
        category: reducerCategory,
        user: reducerUser
    }
})

export default store;