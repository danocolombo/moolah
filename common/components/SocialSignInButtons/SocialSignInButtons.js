import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CustomButton from '@/common/components/CustomButton';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
WebBrowser.maybeCompleteAuthSession();
const SocialSignInButtons = () => {
    const [userInfo, setUserInfo] = useState(null);
    const onSignInFacebook = () => {
        console.warn('onSignInFacebook');
    };

    const onSignInGoogle = () => {
        console.warn('onSignInGoogle');
    };

    const onSignInApple = () => {
        console.warn('onSignInApple');
    };
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId:
            '638184561354-as8jeikmk5flousp9hr1bol8p83gdtmd.apps.googleusercontent.com',
        androidClientId:
            '638184561354-k3vvoe21fcac52pmrjt1ojnb0bufsj64.apps.googleusercontent.com',
    });

    return (
        <>
            <CustomButton
                text='Sign In with Facebook'
                onPress={onSignInFacebook}
                bgColor='#E7EAF4'
                fgColor='#4765A9'
            />
            <CustomButton
                text='Sign In with Google'
                onPress={promptAsync}
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
