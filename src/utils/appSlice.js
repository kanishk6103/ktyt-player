import { createSlice } from '@reduxjs/toolkit';
const appSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: false,
        // isDarkMode: false,
        isDarkMode: localStorage.getItem('isDarkMode') === 'true', // Initialize from localStorage

        //For search
        areSearchedResults: [],
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        // toggleDarkMode: (state) => {
        //     state.isDarkMode = !state.isDarkMode;
        // }
        toggleDarkMode: (state, action) => {
            state.isDarkMode = action.payload; // Update with the new dark mode state
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
        },

        //For search
        getSearchResults: (state, action) => {
            state.areSearchedResults = action.payload;
        },
    },
})

export const { toggleMenu, toggleDarkMode, closeMenu, getSearchResults } = appSlice.actions;
export default appSlice.reducer;    