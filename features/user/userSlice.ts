// import { accessPayload } from './userSlice';
import { printObject } from '@/utils/helpers';
import { createSlice } from '@reduxjs/toolkit';

// Define the type for the authentication state
export type accessPayload = {
    sub: String;
    iss: String;
    client_id: String;
    origin_jti: String;
    event_id: String;
    token_use: String;
    scope: String;
    auth_time: number;
    exp: number;
    iat: number;
    jti: String;
    username: String;
};
export type UserProfile = {
    id: String;
    firstName: String;
    lastName: String;
    email: String;
};
export type UserState = {
    loggedIn: boolean; // Indicates if the user is logged in
    token: String;
    userPayload: accessPayload;
    profile: UserProfile;
};

const initialState: UserState = {
    loggedIn: false,
    token: '',
    userPayload: {
        sub: '',
        iss: '',
        client_id: '',
        origin_jti: '',
        event_id: '',
        token_use: '',
        scope: '',
        auth_time: 0,
        exp: 0,
        iat: 0,
        jti: '',
        username: '',
    },
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
        login(state, action) {
            console.log('ping');
            return {
                ...state,
                token: action.payload.token,
                userPayload: {
                    ...state.userPayload,
                    ...action.payload.accessPayload,
                },
                loggedIn: true,
            };
        },
        saveGoogleUser(state, action) {
            console.log('saveGoogleUser (slice)');
            console.log(action.payload);
            return {
                ...state,
                token: action.payload.id,
                loggedIn: true,
                profile: {
                    ...state.profile,
                    id: action?.payload?.id || '0',
                    firstName: action?.payload?.given_name || '',
                    lastName: action?.payload?.family_name || '',
                    email: action?.payload?.email || '',
                },
            };
        },
        logout(state, payload) {
            state.loggedIn = false; // Set 'loggedIn' to false on logout
        },
    },
});

const userReducer = slice.reducer;

export const { login, saveGoogleUser, logout } = slice.actions;

export default userReducer;
