import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listUser: [],
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        postUser: (state, action) => {
            state.loading = false;
            state.listUser = action.payload;
        },
        addUserss: (state, action) => {
            state.loading = false;
            state.listUser = [...state.listUser, action.payload];
        },
        editUserss: (state, action) => {
            state.loading= false;
            const index = state.listUser.findIndex(user => user.id === action.payload.id)
            if(index !== -1) {
                state.listUser[index] = action.payload;
            }

        }
    }
})

export const {loading, postUser, addUserss, editUserss} = userSlice.actions;
export default userSlice.reducer;