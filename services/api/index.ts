import * as SecureStore from 'expo-secure-store';
import axios, { InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { atob } from 'react-native-quick-base64';
import { jwtDecode } from 'jwt-decode';
global.atob = atob;

export * from './common';
export * from './routeConfig';

const homeIp = 'http://192.168.0.2:8000/api/v1';
const vaIp = 'http://10.13.15.77:8000/api/v1';
const localHost = 'http://127.0.0.1:8000/api/v1';
const iphoneHotspon = 'http://192.0.0.2:8000/api/v1';
const shuttle = 'https://nauristisancins.shuttleapp.rs/api/v1';

const uri = Constants?.expoConfig?.hostUri
    ? `http://${Constants?.expoConfig?.hostUri.split(':').shift()}:8000/api/v1`
    : localHost;

console.log('URI:', uri);

const mainClient = axios.create({
    baseURL: localHost,
    timeout: 120000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// mainClient.interceptors.request.use(
//     async (config: InternalAxiosRequestConfig<any>) => {
//         try {
//             // Get token from SecureStore
//             const session = await SecureStore.getItemAsync('session');
//             if (typeof session === 'string') {
//                 // Decode token to get expiration time
//                 const decodedToken: any = jwtDecode(session);
//                 const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
//                 if (decodedToken.exp < currentTime) {
//                     // Token is expired, handle it (e.g., logout user)
//                     console.log('Token is expired');
//                     // Implement logout logic or token refresh logic here
//                 } else {
//                     // Token is not expired, add it to request headers
//                     config.headers.Authorization = `Bearer ${session}`;
//                 }
//             }
//             if (!session) {
//                 // No token found, handle it (e.g., redirect user to login page)
//                 console.log('No token found');
//                 // Implement redirect logic here
//             }
//         } catch (error) {
//             console.error('Error retrieving token:', error);
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default mainClient;
