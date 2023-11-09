import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect, useSearchParams } from 'expo-router';
import { InstitutionType, TransactionType, AccountType } from '../../types';
import { Entypo } from '@expo/vector-icons';
import accountList from '@/assets/data/accounts';
import institutionList from '@/assets/data/institutions';
import transactionList from '@/assets/data/transactions';
import TransactionListCard from '@/components/TransactionListCard';

const theTransactions: TransactionType[] = transactionList as TransactionType[];
const theAccounts: AccountType[] = accountList as AccountType[];
const theInstitutions: InstitutionType[] = institutionList as InstitutionType[];

type AccountProps = {
    id: string;
};
// const account = ({ id }: AccountProps) => {
const account = () => {
    const { id } = useSearchParams();
    const [thisAccount, setThisAccount] = useState<AccountType>();
    const [thisInstitution, setThisInstitution] = useState<InstitutionType>();
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    useFocusEffect(
        useCallback(() => {
            // i = accountId
            const acct = accountList.find((a) => {
                return a.id === id;
            });
            setThisAccount(acct);
            const inst = institutionList.find((i) => {
                return i.id === acct.institutionId;
            });
            setThisInstitution(inst);
            const trans = transactionList.filter((t) => {
                return t.accountId === acct.id;
            });
            setTransactions(trans);
        }, [institutionList, transactionList, accountList])
    );
    // console.log('ABC:56-->transactions:\n', transactions);
    return (
        <View style={styles.container}>
            <Pressable style={styles.floatingButton}>
                <Entypo name='plus' size={24} color='white' />
            </Pressable>
            <View style={styles.accountInfoContainer}>
                {thisInstitution?.icon && (
                    <Image src={thisInstitution.icon} style={styles.logo} />
                )}
                {thisAccount && (
                    <Text style={styles.name}>{thisAccount.name}</Text>
                )}
                {thisAccount && (
                    <Text style={styles.balance}>{thisAccount.balance}</Text>
                )}
            </View>
            {transactions
                ? transactions.map((t: TransactionType, index: number) => {
                      return (
                          <View key={index} style={{ marginHorizontal: 10 }}>
                              <TransactionListCard transaction={t} />
                          </View>
                      );
                  })
                : null}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    floatingButton: {
        backgroundColor: '#1C9BF0',
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 15,
        bottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    accountInfoContainer0: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    accountInfoContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        // marginTop: 10,
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
export default account;
