import React, { useState } from 'react';
import {
    Text as RNText,
    View as RNView,
    Image,
    StyleSheet,
} from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';

import Screen from '@/common/components/Screen';
import Text from '@/common/components/Text';
import View from '@/common/components/View';
import Logo from '@/assets/images/logo.png';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import SocialSignInButtons from '@/common/components/SocialSignInButtons';
import { login } from '@/features/user/userSlice';
import { Auth } from 'aws-amplify';
import { printObject, EMAIL_REGEX } from '@/utils/helpers';
// const EMAIL_REGEX =
//     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default function AuthScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { challengeName, attributes } = params;

    console.log('-----------------------------------------');
    console.log('-----------------------------------------');
    printObject('challengeName:\n', challengeName);
    printObject('attributes:\n', attributes?.email);
    console.log('-----------------------------------------');
    console.log('-----------------------------------------');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSignInPress = async (data) => {
        const results = await Auth.completeNewPassword(
            'moolah',
            'Password88!',
            {
                email: 'fortsonguru+moolah@gmail.com',
                email_verified: 'true',
                preferred_username: 'moolah',
            }
        );
        console.log('results:\n', results);
        const DANO = false;
        if (DANO) {
            router.push('/(app)/(root)/(tabs)/');
        }
    };

    const onSubmitPress = async (data) => {
        console.warn('onSubmitPress');
        console.log('Code:', data.code);
    };
    return (
        <Screen
            style={{
                flex: 1, // Take up the entire screen
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={styles.title}>Set your Password</Text>
            <RNView style={styles.inputContainer}>
                <CustomInput
                    name='code'
                    placeholder='Code'
                    control={control}
                    rules={{ required: 'Code is required' }}
                />
                <CustomInput
                    name='newPassword'
                    placeholder='Enter your new password'
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

                <CustomButton
                    text={loading ? 'Loading...' : 'Submit'}
                    type='PRIMARY'
                    onPress={handleSubmit(onSubmitPress)}
                />

                <CustomButton
                    text='Back to Sign in'
                    onPress={onSignInPress}
                    type='TERTIARY'
                />
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
    title: {
        fontSize: 24,
        fontFamily: 'SFHeavy',
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
