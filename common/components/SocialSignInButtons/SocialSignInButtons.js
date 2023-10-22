import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '@/common/components/CustomButton';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { saveGoogleUser } from '@/features/user/userSlice';
WebBrowser.maybeCompleteAuthSession();
const SocialSignInButtons = () => {
    const [token, setToken] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const dispatch = useDispatch();
    const googleIosClientId = process.env.GOOGLE_IOS_CLIENT_ID;
    const googleAndroidClientId = process.env.GOOGLE_ANDROID_CLIENT_ID;

    console.log(googleIosClientId);

    useEffect(() => {
        console.log('response useEffect');
        handleEffect();
    }, [response, token]);

    async function handleEffect() {
        if (response?.type === 'success') {
            await getUserInfo(response.authentication.accessToken);
        }
    }
    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                'https://www.googleapis.com/userinfo/v2/me',
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            dispatch(saveGoogleUser(user));
            setUserInfo(user);
            if (user) {
                console.log(JSON.stringify(user, null, 2));
            }
        } catch (error) {
            // Add your own error handler here
            console.error('getUserInfo catch:\n', error);
        }
    };
    const onSignInFacebook = () => {
        console.warn('onSignInFacebook');
    };

    const onSignInApple = () => {
        console.warn('onSignInApple');
    };
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: googleIosClientId,
        androidClientId: googleAndroidClientId,
    });

    return (
        <>
            <Button
                title='Sign in with Google'
                disabled={!request}
                onPress={() => {
                    promptAsync();
                }}
            />
            <CustomButton
                text='Sign In with Facebook'
                onPress={onSignInFacebook}
                bgColor='#E7EAF4'
                fgColor='#4765A9'
            />
            <CustomButton
                text='Sign In with Google'
                onPress={() => {
                    promptAsync();
                }}
                bgColor='#FAE9EA'
                fgColor='#DD4D44'
            />
            <CustomButton
                text='Sign In with Apple'
                onPress={onSignInApple}
                bgColor='#e3e3e3'
                fgColor='#363636'
            />
        </>
    );
};

export default SocialSignInButtons;
