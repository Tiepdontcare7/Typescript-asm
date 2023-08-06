import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listCategory: [],
    loading: false,
    error: null
}

const categorySlice = createSlice({
    name: 'product category',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        postCategoryProducts: (state, action) => {
            state.loading = false;
            state.listCategory = action.payload;
        },
        addCategorys: (state, action) => {
            state.loading = false;
            state.listCategory = [...state.listCategory , action.payload];
        },
        editCategorys: (state, action) => {
            state.loading = false;
            const index = state.listCategory.findIndex(i => i.id == action.payload.id)
            if (index !== -1) {
                state.listCategory[index] = action.payload
            }
        }
    }
})

export const {loading, postCategoryProducts, addCategorys, editCategorys} = categorySlice.actions;
export default categorySlice.reducer;