import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
    name:"User",
    initialState: {
        account:false
    },
    reducers: {
        store: (state,user) => {
            state.account = user.payload;
        },
        leave: state => {
            state.account = false;
        }
    }
});

export const selectUser = state => state.user;
export const {store,leave}=slice.actions;
export default slice.reducer;
