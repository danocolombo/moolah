import React, { useState } from 'react';
import {
    Text as RNText,
    View as RNView,
    Image,
    StyleSheet,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { Link, router } from 'expo-router';
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
const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default function AuthScreen() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const pwd = watch('password');
    const onSignUpPress = async (data) => {
        const { username, password, email, name } = data;
        console.log('username:', username);
        console.log('password:', password);
        console.log('email:\n', email);
        try {
            const response = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                },
            });
            const proceedParams = { username, email, sub: response?.userSub };
            console.log('response', response);
            router.push({
                pathname: '/(app)/auth/NewPasswordScreen',
                params: proceedParams,
            });
        } catch (error) {}
        return;
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
    const onTermsOfUsePress = () => {
        console.warn('Terms of Use');
    };
    const onPrivacyPolicyPress = () => {
        console.warn('Privacy Policy');
    };
    return (
        <Screen
            style={{
                flex: 1, // Take up the entire screen
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text fontSize={24} fontFamily='SFHeavy'>
                Create your account
            </Text>
            <RNView style={styles.inputContainer}>
                <CustomInput
                    name='username'
                    control={control}
                    placeholder='Username'
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message:
                                'Username should be at least 3 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message:
                                'Username should be max 24 characters long',
                        },
                    }}
                    inputProps={styles.inputTextBox}
                />

                <CustomInput
                    name='email'
                    control={control}
                    placeholder='Email'
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: EMAIL_REGEX,
                            message: 'Email is invalid',
                        },
                    }}
                />

                <CustomInput
                    name='password'
                    control={control}
                    placeholder='Password'
                    secureTextEntry
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message:
                                'Password should be at least 8 characters long',
                        },
                    }}
                />
                <CustomInput
                    name='password-repeat'
                    control={control}
                    placeholder='Repeat Password'
                    secureTextEntry
                    rules={{
                        validate: (value) =>
                            value === pwd || 'Passwords do not match',
                    }}
                />
            </RNView>

            <RNView style={styles.inputContainer}>
                <CustomButton
                    text={loading ? 'Loading...' : 'Sign Up'}
                    onPress={handleSubmit(onSignUpPress)}
                />
                <Text style={styles.text}>
                    By registering, you confirm that you accept our{' '}
                    <Text style={styles.link} onPress={onTermsOfUsePress}>
                        Terms of Use
                    </Text>{' '}
                    and{' '}
                    <Text style={styles.link} onPress={onPrivacyPolicyPress}>
                        Privacy Policy.
                    </Text>
                </Text>
                <SocialSignInButtons />
                <RNView style={styles.linkContainer}>
                    <Link href={{ pathname: 'auth/index' }}>
                        Back to log in
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
    inputTextBox: {
        minWidth: '100%',
        fontSize: 24,
    },
    link: {
        color: '#FDB075',
    },
    linkContainer: {
        marginTop: 15,
    },
});
