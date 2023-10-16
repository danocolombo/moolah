import { createSlice } from '@reduxjs/toolkit';

// Define the type for the authentication state

export type UserProfile = {
    id: String;
    firstName: String;
    lastName: String;
    email: String;
};
export type UserState = {
    loggedIn: boolean; // Indicates if the user is logged in
    profile: UserProfile;
};

const initialState: UserState = {
    loggedIn: false,
    profile: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
    },
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, payload) {
            console.log('ping');
            state.loggedIn = true; // Set 'loggedIn' to true on login
        },
        logout(state, payload) {
            state.loggedIn = false; // Set 'loggedIn' to false on logout
        },
    },
});

const userReducer = slice.reducer;

export const { login, logout } = slice.actions;

export default userReducer;
