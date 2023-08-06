import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listProduct: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        postProducts: (state, action) => {
            state.loading = false;
            state.listProduct = action.payload;
        },
        addProducts: (state, action) => {
            state.loading = false;
            state.listProduct = [...state.listProduct, action.payload];
        },
        editProducts: (state, action) => {
            state.loading = false;
            
            const index = state.listProduct.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.listProduct[index] = action.payload;
            }
        }
    }
})

export const {loading, postProducts, addProducts, editProducts} = productSlice.actions;
export default productSlice.reducer;