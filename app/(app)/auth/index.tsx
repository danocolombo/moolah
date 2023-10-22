import React, { useState, useEffect } from 'react';
import {
    Text as RNText,
    View as RNView,
    Image,
    StyleSheet,
    Button,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import Screen from '@/common/components/Screen';
import Text from '@/common/components/Text';
import View from '@/common/components/View';
import Logo from '@/assets/images/logo.png';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import * as Google from 'expo-auth-session/providers/google';
import SocialSignInButtons from '@/common/components/SocialSignInButtons';
import { login } from '@/features/user/userSlice';
import { router, Link } from 'expo-router';
import { printObject } from '@/utils/helpers';
import { saveGoogleUser } from '@/features/user/userSlice';
type RouterLinkProps = {
    pathname: string;
    params?: Record<string, string | undefined>;
};
type userAttributeProps = {
    email: string;
    email_verified: string;
    preferred_username: string;
};

export default function AuthScreen() {
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const googleIosClientId = process.env.GOOGLE_IOS_CLIENT_ID;
    const googleAndroidClientId = process.env.GOOGLE_ANDROID_CLIENT_ID;
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: googleIosClientId,
        androidClientId: googleAndroidClientId,
    });
    useEffect(() => {
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

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSignInPress = async (data) => {
        console.log('onSignInPressed');
        setLoading(false);
        if (loading) {
            return;
        }
        setLoading(true);
        let alertPayload;

        await Auth.signIn(data.username, data.password)
            .then((user) => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    console.log('challenge this');
                    const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                    console.log(requiredAttributes);
                    Auth.completeNewPassword(
                        username, // the Cognito User Object
                        password,
                        []
                    )
                        .then((user) => {
                            // at this time the user is logged in if no MFA required
                            console.log(user);
                        })
                        .catch((e) => {
                            const alertPayload = {
                                msg: 'Authentication failed. Please check your credentials',
                                alertType: 'danger',
                            };
                            // setAlert(alertPayload);
                            console.log(alertPayload);
                            console.log(' need to return');
                            console.log(user);
                            // return;
                        });
                } else {
                    console.log('the user is good...');
                    const signInData = {
                        signInUserSession: user.signInUserSession,
                    };
                    printObject(
                        'I:66-->accessPayload:\n',
                        signInData.signInUserSession.accessToken.payload
                    );
                    dispatch(
                        login({
                            token: signInData.signInUserSession.accessToken
                                .jwtToken,
                            accessPayload:
                                signInData.signInUserSession.accessToken
                                    .payload,
                        })
                    );
                }
            })
            .catch((e) => {
                switch (e.code) {
                    case 'UserNotFoundException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'PasswordResetRequiredException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'NotAuthorizedException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    default:
                        alertPayload = {
                            msg: 'Signin error: [' + e.message + ']',
                            alertType: 'danger',
                        };
                        break;
                }
                console.log(alertPayload);
            });

        setLoading(false);
    };

    const onSignInPress2 = async (data) => {
        // if (loading) {
        //     return;
        // }
        // setLoading(true);
        dispatch(login({ username: data.username, password: data.password }));
        // setLoading(false);
        // const response = Auth.signIn('username_value', 'password');
        // router.push({
        //     pathname: '/(auth)/main',
        //     params: { username: data.username, password: data.password },
        // });
    };
    const onGooglePress = async () => {
        setLoading(true);
        const googleSignInResult = await promptAsync();

        if (googleSignInResult) {
            if (googleSignInResult.type === 'success') {
                // Handle Google Sign-In success
                await getUserInfo(
                    googleSignInResult?.authentication?.accessToken
                );
            } else if (googleSignInResult.type === 'error') {
                // Handle Google Sign-In error
                console.log('Google Sign-In error:', googleSignInResult.error);
            }
        } else {
            // Handle the case where googleSignInResult is null
            console.log('Google Sign-In result is null');
        }

        setLoading(false);
    };

    const onForgotPasswordPress = () => {
        router.replace('/ForgotPasswordScreen');
    };
    return (
        <Screen
            style={{
                flex: 1, // Take up the entire screen
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <RNView style={styles.logoContainer}>
                <Image source={Logo} style={styles.logo} resizeMode='contain' />
            </RNView>

            <Text fontSize={24} fontFamily='SFHeavy'>
                Moolah
            </Text>
            <RNView style={styles.inputContainer}>
                <CustomInput
                    name='username'
                    placeholder='username'
                    control={control}
                    rules={{ required: 'Username is required' }}
                />
            </RNView>
            <RNView style={styles.inputContainer}>
                <CustomInput
                    name='password'
                    placeholder='Password'
                    secureTextEntry
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message:
                                'Password should be minimum 3 characters long',
                        },
                    }}
                />
            </RNView>
            <RNView style={styles.inputContainer}>
                <CustomButton
                    text={loading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPress)}
                />
                <RNView style={styles.linkContainer}>
                    <Link href={{ pathname: 'auth/ForgotPasswordScreen' }}>
                        Forgot password?
                    </Link>
                </RNView>
                <RNView style={styles.linkContainer}>
                    <Button
                        title='Sign in with Google'
                        disabled={!request}
                        onPress={onGooglePress}
                    />
                </RNView>
                {/* <SocialSignInButtons /> */}
                <RNView style={styles.linkContainer}>
                    <Link href={{ pathname: 'auth/SignUpScreen' }}>
                        Don't have an account? Create one
                    </Link>
                </RNView>
            </RNView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        width: '100%',
        height: 200, // Set an appropriate height
        alignItems: 'center', // Center the child elements vertically
    },
    logo: {
        width: '95%',
        height: undefined,
        aspectRatio: 16 / 9,
    },
    inputContainer: {
        width: '70%',
        alignItems: 'center',
    },
    linkContainer: {
        marginVertical: 15,
    },
});
