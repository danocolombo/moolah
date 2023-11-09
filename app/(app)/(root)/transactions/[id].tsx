import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import moment from 'moment';
import { TransactionType } from '@/types';
import accountList from '@/assets/data/accounts';
import { useFocusEffect } from '@react-navigation/native';
import transactionList from '@/assets/data/transactions';
const theTransactions: TransactionType[] = transactionList as TransactionType[];
export default function Transaction() {
    const { id }: { id?: string } = useSearchParams();
    const [modalDateVisible, setModalDateVisible] = useState<boolean>();
    const [defaultDateString, setDefaultDateString] = useState(new Date());
    //* The Transaction Data
    const [accountId, setAccountId] = useState<string>('');
    const [tranDate, setTranDate] = useState<string>();
    const [initialDate, setInitialDate] = useState<Date | undefined>(undefined);

    const [payee, setPayee] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<number>();
    const [cleared, setCleared] = useState<boolean>();

    useFocusEffect(
        useCallback(() => {
            const tran = theTransactions.find((t) => t.id === id);
            if (tran) {
                setAccountId(tran?.accountId);
                setPayee(tran?.payee);
                setCategory(tran?.category);
                setAmount(tran?.amount);
                setCleared(tran?.cleared);
                setTranDate(tran?.date);
                const [year, month, day] = tran?.date.split('-');
                console.log('Y:' + year + ' M:' + month + ' D:' + day);
                // const tDateObject = new Date(
                //     parseInt(year),
                //     parseInt(month) - 1,
                //     parseInt(day)
                // );
                // const tDate = new Date(tDateObject); // convert to Date object
                // setTranDate(tDateObject);
                const iDate = new Date(tranDate);
                iDate.setHours(0, 0, 0, 0);
                setInitialDate(iDate);
            }
        }, [transactionList])
    );
    const onDateConfirm = (selectedDate: Date) => {
        const adjustedDate = new Date(
            selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
        );
        setTranDate(adjustedDate.toISOString().split('T')[0]);
        setModalDateVisible(false);
    };

    const onDateCancel = () => {
        setModalDateVisible(false);
    };
    const showDatePicker = () => {
        setModalDateVisible(true);
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.cardContainer}>
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: '400',
                                    letterSpacing: 0.6,
                                }}
                            >
                                Transaction Date
                            </Text>

                            <Pressable
                                onPress={() => setModalDateVisible(true)}
                            >
                                <View style={styles.dateTimeDisplay}>
                                    <Text
                                        style={{
                                            padding: 15,
                                            fontSize: 25,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                padding: 15,
                                                fontSize: 25,
                                            }}
                                        >
                                            {initialDate
                                                ? format(
                                                      initialDate,
                                                      'MMMM d, yyyy'
                                                  )
                                                : ''}
                                            {/* {tranDate
                                                ? moment(tranDate).format(
                                                      'ddd MMM DD, YYYY'
                                                  )
                                                : defaultDateString} */}
                                        </Text>
                                    </Text>
                                </View>
                            </Pressable>
                        </View>

                        <DateTimePickerModal
                            isVisible={modalDateVisible}
                            mode='date'
                            date={initialDate}
                            onConfirm={onDateConfirm}
                            onCancel={onDateCancel}
                            timeZoneOffsetInMinutes={
                                new Date().getTimezoneOffset() * -1
                            }
                        />
                    </View>

                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={{ marginLeft: 10, fontSize: 20 }}>
                            {tranDate}
                        </Text>
                        <Text style={{ paddingHorizontal: 10, fontSize: 20 }}>
                            {payee}
                        </Text>
                        <Text
                            style={{
                                marginRight: 25,
                                fontSize: 18,
                                marginLeft: 'auto',
                            }}
                        >
                            {amount}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            padding: 10,
                            alignItems: 'center',
                        }}
                    >
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
                                <Entypo name='check' size={18} color='grey' />
                            )}
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                paddingHorizontal: 10,
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>{category}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    cardContainer: {
        // marginVertical: 10,
        padding: 5,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
    },
    inputContainer: {
        backgroundColor: 'lightgreen',
    },
    dateTimeDisplay: {
        backgroundColor: 'lightgrey',
        marginVertical: 2,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
});
