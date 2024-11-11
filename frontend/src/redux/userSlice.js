import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authuser: null,
        otheruser: null,
    },
    reducers: {
        setauthuser: (state, action) => {
            state.authuser = action.payload
        },
        setotheruser: (state, action) => {
            state.otheruser = action.payload
        },
        clearStore: (state) => {
            state.authuser = null;
            state.otheruser = null;
        }
    }
})
export const { setauthuser, setotheruser, clearStore } = userSlice.actions
export default userSlice.reducer;