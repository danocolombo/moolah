import React, { useState } from 'react';
import {
    Text as RNText,
    View as RNView,
    Image,
    StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Screen from '@/common/components/Screen';
import Text from '@/common/components/Text';
import View from '@/common/components/View';
import Logo from '@/assets/images/logo.png';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import SocialSignInButtons from '@/common/components/SocialSignInButtons';
import { login } from '@/features/user/userSlice';
import { router, Link } from 'expo-router';
type RouterLinkProps = {
    pathname: string;
    params?: Record<string, string | undefined>;
};
export default function AuthScreen() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSignInPress = async (data) => {
        console.log('onSignInPressed');
        if (loading) {
            return;
        }
        setLoading(true);
        console.log('loading true');
        // try {
        //     const response = await Auth.signIn(data.username, data.password);
        //     const signInData = {
        //         signInUserSession: response.signInUserSession,
        //     };

        //     try {
        //         const loginResults = await dispatch(loginUser(signInData));

        //         const SUResults = await dispatch(
        //             saveUserProfile(loginResults.payload.profile)
        //         );

        //         const defGroupsResults = await dispatch(
        //             loadDefaultGroups({
        //                 id: loginResults.payload.profile.activeOrg.id,
        //             })
        //         );
        //         const getAllMeetingsResults = await dispatch(
        //             getAllMeetings({
        //                 orgId: loginResults.payload.profile.activeOrg.id,
        //                 code: loginResults.payload.profile.activeOrg.code,
        //             })
        //         );

        //         // You can now work with getAllMeetingsResults here if needed.
        //     } catch (error) {
        //         // Handle errors here.
        //         setLoginError(error);
        //         setShowLoginError(true);
        //         throw new Error('Error occurred during sign-in');
        //     }

        //     console.log('done with loginUser dispatch');
        // } catch (error) {
        //     switch (error.code) {
        //         case 'UserNotFoundException':
        //             setLoginError(error.message);
        //             setShowLoginError(true);
        //             break;
        //         case 'PasswordResetRequiredException':
        //             setLoginError(error.message);
        //             setShowLoginError(true);
        //             break;
        //         case 'NotAuthorizedException':
        //             setLoginError(error.message);
        //             setShowLoginError(true);
        //             break;
        //         default:
        //             setLoginError(error.message);
        //             setShowLoginError(true);
        //             break;
        //     }
        // } finally {
        //     setLoading(false); // Set loading to false after the try/catch block
        // }
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
                    placeholder='Username'
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
                <SocialSignInButtons />
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
