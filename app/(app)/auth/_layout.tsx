// Import necessary modules and hooks
import useAppSelector from '@/common/hooks/useAppSelector';
import { Redirect, Stack } from 'expo-router';

export default function () {
    const loggedIn = useAppSelector((state) => state.user.loggedIn);

    // If the user is logged in, redirect to the home page
    if (loggedIn) {
        return <Redirect href={'/'} />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            {/* <Stack.Screen
                name='index'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='SignUpScreen'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='NewPasswordScreen'
                options={{
                    headerShown: false,
                }}
            /> */}
        </Stack>
    );
}
