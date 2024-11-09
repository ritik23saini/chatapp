import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { authuser: null },
    reducers: {
        setauthuser: (state, action) => {
            state.authuser = action.payload
        }
    }
})
export const { setauthuser } = userSlice.actions
export default userSlice.reducer;