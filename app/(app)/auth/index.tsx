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
import LoginButton from '@/features/auth/LoginButton';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { login } from '@/features/user/userSlice';

export default function AuthScreen() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSignInPress = async (data) => {
        // if (loading) {
        //     return;
        // }
        console.log('hit');
        // setLoading(true);
        dispatch(login({ username: data.username, password: data.password }));
        // setLoading(false);
        // const response = Auth.signIn('username_value', 'password');
        // router.push({
        //     pathname: '/(auth)/main',
        //     params: { username: data.username, password: data.password },
        // });
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
            </RNView>
            <LoginButton />
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
    },
    inputContainer: {
        width: '70%',
    },
});
