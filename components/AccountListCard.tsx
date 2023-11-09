import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { AccountType } from '@/types';

type AcctProps = {
    account: AccountType;
};
const AccountListCard = ({ account }: AcctProps) => {
    // console.log('ALC:11-->account:\n', account);
    return (
        <Link href={`/account/${account.id}`} asChild>
            <Pressable style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    {account?.type === 'checking' && (
                        <FontAwesome5
                            name='money-check-alt'
                            size={24}
                            color='black'
                        />
                    )}
                    {account?.type === 'savings' && (
                        <FontAwesome5 name='coins' size={28} color='black' />
                    )}
                    <Text style={styles.name}>{account.name}</Text>
                    <Text style={styles.balance}>{account.balance}</Text>
                </View>
            </Pressable>
        </Link>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 25,
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
    },
    logo: {
        height: 30,
        width: 30,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        paddingLeft: 10,
    },
    balance: {
        marginLeft: 'auto',
        marginRight: 15,
        fontSize: 18,
    },
});

export default AccountListCard;
