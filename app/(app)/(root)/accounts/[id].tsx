import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect, useSearchParams } from 'expo-router';
import React from 'react';
import AccountListCard from '@/components/AccountListCard';
import accountList from '@/assets/data/accounts';

//import institutions from '../../assets/data/institutions';
import { AccountType, InstitutionType } from '@/types';
import institutionList from '@/assets/data/institutions';
const theInstitutions: InstitutionType[] = institutionList as InstitutionType[];
const theAccounts: AccountType[] = accountList as AccountType[];

export default function AccountsScreen() {
    const { id } = useSearchParams();
    const [institution, setInstitution] = useState<InstitutionType>();
    const [displayAccounts, setDisplayAccounts] = useState<AccountType[]>([]);
    useEffect(() => {
        const hit = theInstitutions.find((i) => {
            return i.id === id;
        });
        setInstitution(hit);
        const hits = theAccounts.filter((a) => {
            return a.institutionId === id;
        });
        setDisplayAccounts(hits);
    }, []);
    if (!displayAccounts) {
        <View>
            <Text>No Accounts for this institution.</Text>
        </View>;
    }
    // console.log('A:38-->displayAccounts:\n', displayAccounts);
    // console.log('A:43-->institution:\n', institution);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.institutionName}>{institution?.name}</Text>
            </View>
            <FlatList
                data={displayAccounts}
                renderItem={({ item }) => <AccountListCard account={item} />}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    institutionName: {
        textAlign: 'center',
        paddingVertical: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
    institutionContainer: {
        flexDirection: 'row',
        marginLeft: 25,
        alignItems: 'center',
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
});
