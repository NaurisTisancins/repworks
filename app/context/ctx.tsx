import React from 'react';
import { useStorageState } from './useStorageState';
import { get, getUrl, post } from '@/services/api/common';
import mainClient from '@/services/api';
import { btoa, atob } from 'react-native-quick-base64';
import { jwtDecode } from 'jwt-decode';
global.atob = atob;

type User = {
    user_id: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
};

const AuthContext = React.createContext<{
    signUp: (username: string, password: string) => any;
    signIn: (username: string, password: string) => any;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signUp: () => null,
    signOut: () => null,
    signIn: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error(
                'useSession must be wrapped in a <SessionProvider />'
            );
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    async function handleSignUp(username: string, password: string) {
        const response = await post<any>({
            client: mainClient,
            url: '/api/v1/users/create',
            data: {
                username,
                password,
            },
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    return response.data as User;
                }
            },
        });

        return response;
    }

    async function handleSignIn(username: string, password: string) {
        const basicAuth = btoa(`${username}:${password}`);

        const response = await getUrl<any>({
            url: 'http://127.0.0.1:8000/api/v1/users/auth',
            config: {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${basicAuth}`,
                },
            },
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    return response.data;
                }
            },
        });

        return response;
    }

    return (
        <AuthContext.Provider
            value={{
                signUp: async (username: string, password: string) => {
                    const signUpresponse = await handleSignUp(
                        username,
                        password
                    );
                    if (signUpresponse !== null) {
                        console.log('Sign Up Response', signUpresponse);
                    }
                },
                signIn: async (username: string, password: string) => {
                    const signInResponse = await handleSignIn(
                        username,
                        password
                    );

                    if (signInResponse) {
                        const token = signInResponse.data;
                        const decoded = jwtDecode(token);
                        console.log('Decoded', decoded);
                        setSession(signInResponse.data);
                    }
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
