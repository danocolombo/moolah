import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { InstitutionType } from '../.expo/metro/types';

type InstProps = {
    institution: InstitutionType;
};
const handleClick = () => {
    console.log('hit');
    // <Link href={`/accounts/${institution.id}`} asChild></Link>
};
const InstitutionListCard = ({ institution }: InstProps) => {
    return (
        <Link href={`/accounts/${institution.id}`} asChild>
            <Pressable style={styles.container}>
                {institution?.icon && (
                    <Image src={institution.icon} style={styles.logo} />
                )}
                <Text style={styles.name}>{institution.name}</Text>
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
});

export default InstitutionListCard;
