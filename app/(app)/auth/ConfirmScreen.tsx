import React, { useState } from 'react';
import {
    Text as RNText,
    View as RNView,
    Image,
    Modal,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Auth } from 'aws-amplify';
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
import { printObject } from '@/utils/helpers';
const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default function AuthScreen() {
    const { username, email, sub, origin } = useLocalSearchParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
    printObject('CS:31-->origin:', origin);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSignInPress = async (data) => {
        router.push('/(app)/auth');
    };
    const onSubmitPress = async (data) => {
        try {
            Auth.confirmSignUp(username, data.code)
                .then(() => {
                    // Account confirmed successfully
                    setConfirmationMessage('Account confirmed');
                    setModalVisible(true); // Show the modal
                })
                .catch((error) => {
                    // Error occurred during confirmation
                    console.error('Confirmation error', error);
                });
        } catch (error) {
            console.log('catch error');
            console.log(error);
        }
    };
    const closeModal = () => {
        setModalVisible(false); // Hide the modal
        router.push('/(app)/(auth)/index');
    };
    console.log('NewPasswordScreen values...');
    console.log('username:', username);
    console.log('email:', email);
    console.log('sub:', sub);
    return (
        <Screen
            style={{
                flex: 1, // Take up the entire screen
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={styles.title}>Confirm your Account</Text>
            <Text
                style={{
                    paddingHorizontal: 60,
                    textAlign: 'center',
                    paddingVertical: 10,
                }}
            >
                Check your registration email, and enter the code provided.
            </Text>
            <RNView style={styles.inputContainer}>
                <CustomInput
                    name='code'
                    placeholder='Code'
                    control={control}
                    rules={{ required: 'Code is required' }}
                />
                {/* <CustomInput
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
                /> */}

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
            <Modal
                animationType='slide'
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <Text>{confirmationMessage}</Text>
                    <TouchableHighlight onPress={closeModal}>
                        <Text>OK</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
