import Screen from '@/common/components/Screen';
import {
    Text as RNText,
    View as RNView,
    Image,
    StyleSheet,
} from 'react-native';
import Text from '@/common/components/Text';
import View from '@/common/components/View';
import Logo from '@/assets/images/logo.png';
import LoginButton from '@/features/auth/LoginButton';

export default function AuthScreen() {
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
});
