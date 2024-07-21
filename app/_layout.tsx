import { Slot } from 'expo-router';
import { SessionProvider } from './context/ctx';
import { View } from 'react-native';

export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <View style={{ flex: 1 }}>
            <SessionProvider>
                <Slot />
            </SessionProvider>
        </View>
    );
}
