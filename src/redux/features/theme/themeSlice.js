import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getLocalStorage } from "helpers/localStorage";

const initialState = {
    mode: getLocalStorage('theme') || 'light',
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        SET_MODE: (state) => {
            state.mode = state.mode === 'light' ? "dark" : "light";
            setLocalStorage('theme', state.mode);
            const root = window.document.documentElement;
            root.classList.add(state.mode);
            root.classList.remove(state.mode === 'light' ? "dark" : "light");
        }
    }
});

export const { SET_MODE } = themeSlice.actions;
export const mode = state => state.theme.mode;

export default themeSlice.reducer;

//todo get theme value from localStorage and make it consistent on reloads