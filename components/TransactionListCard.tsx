import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TransactionType } from '@/types';

type TranProps = {
    transaction: TransactionType;
};
const TransactionListCard = ({ transaction }: TranProps) => {
    const [cleared, setCleared] = useState<boolean>(transaction.cleared);
    const clearPress = () => {
        setCleared(!cleared);
    };
    return (
        <Link href={`/transaction/${transaction.id}`} asChild>
            <Pressable>
                <View
                    style={[
                        styles.cardContainer,
                        cleared ? styles.clearedContainer : null,
                    ]}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={{ marginLeft: 10, fontSize: 20 }}>
                            {transaction.date}
                        </Text>
                        <Text style={{ paddingHorizontal: 10, fontSize: 20 }}>
                            {transaction.payee}
                        </Text>
                        <Text
                            style={{
                                marginRight: 25,
                                fontSize: 18,
                                marginLeft: 'auto',
                            }}
                        >
                            {transaction.amount}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            padding: 10,
                            alignItems: 'center',
                        }}
                    >
                        <Pressable onPress={clearPress}>
                            <View
                                style={{
                                    borderWidth: StyleSheet.hairlineWidth,
                                    borderColor: 'black',
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {cleared && (
                                    <Entypo
                                        name='check'
                                        size={18}
                                        color='grey'
                                    />
                                )}
                            </View>
                        </Pressable>
                        <View
                            style={{
                                alignItems: 'center',
                                paddingHorizontal: 10,
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>
                                {transaction?.category}
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Link>
    );
};
const styles = StyleSheet.create({
    cardContainer: {
        // marginVertical: 10,
        padding: 5,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
    },
    clearedContainer: {
        backgroundColor: 'lightgreen',
    },
});

export default TransactionListCard;
