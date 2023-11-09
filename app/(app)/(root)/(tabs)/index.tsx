import { useDispatch, useSelector } from 'react-redux';
import { View as RNView, StyleSheet, Button, FlatList } from 'react-native';
import Screen from '@/common/components/Screen';
import Text from '@/common/components/Text';
import LogoutButton from '@/features/auth/LogoutButton';
import CustomButton from '@/common/components/CustomButton';
import { logout } from '@/features/user/userSlice';
import InstitutionListCard from '@/components/InstitutionListCard';
import institutionList from '@/assets/data/institutions';

// Define the TabOneScreen component for Tab One
export default function () {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.profile);
    const onLogoutPress = () => {
        dispatch(logout({}));
    };
    return (
        <Screen style={styles.container}>
            <RNView style={styles.listContainer}>
                <FlatList
                    data={institutionList}
                    renderItem={({ item }) => (
                        <InstitutionListCard institution={item} />
                    )}
                />
            </RNView>
            {user?.firstName && (
                <Text fontFamily='SFMedium' style={styles.title}>
                    Hey {user?.firstName}
                </Text>
            )}

            <RNView style={styles.logoutContainer}>
                <Button title='Logout' onPress={onLogoutPress} />
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
    listContainer: {
        marginTop: 20,
        width: '50%',
    },
    logoutContainer: {
        width: '50%',
        marginBottom: 25,
        marginTop: 'auto',
    },
});
