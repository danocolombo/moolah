import { useDispatch } from 'react-redux';
import { View as RNView, StyleSheet } from 'react-native';
import Screen from '@/common/components/Screen';
import Text from '@/common/components/Text';
import LogoutButton from '@/features/auth/LogoutButton';
import CustomButton from '@/common/components/CustomButton';
import { logout } from '@/features/user/userSlice';

// Define the TabOneScreen component for Tab One
export default function () {
    const dispatch = useDispatch();
    const onLogoutPress = () => {
        dispatch(logout({}));
    };
    return (
        <Screen style={styles.container}>
            <Text fontFamily='SFMedium' style={styles.title}>
                Tab One
            </Text>
            <RNView style={styles.inputContainer}>
                <CustomButton text='Logout' onPress={onLogoutPress} />
            </RNView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
    },
    inputContainer: {
        width: '50%',
    },
});
