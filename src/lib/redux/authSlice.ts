import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};
  
const authSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        removeToken(state) {
            state.token = null;
        },
    },
});
  
export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;