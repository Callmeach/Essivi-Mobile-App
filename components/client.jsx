import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ClientCard = ({ id, name, phoneNumber, address, profilePic, onSelect, isSelected }) => {


    return (
        <TouchableOpacity onPress={() => onSelect(id)}>
            
            <View style={[styles.cardContainer, isSelected && styles.selectedCard]}>
                <Image source={profilePic} style={styles.profilePic} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                    <Text style={styles.address}>{address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        width: 'auto',
        height: 220,
        flexDirection: 'column',
        marginRight: '3%',

    },
    infoContainer: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCard: {
        borderColor: '#00FF00',
        borderWidth: 2,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    phoneNumber: {
        fontSize: 14,
        marginBottom: 5,
    },
    address: {
        fontSize: 14,
    },
})

// const styles = StyleSheet.create({
//     cardContainer: {
//         backgroundColor: '#FFFFFF',
//         width: '47%',
//         height: 220,
//         borderRadius: 8,
//         marginBottom: 16,
//         borderWidth: 1,
//         borderColor: '#E0E0E0',
//     },
//     selectedCard: {
//         borderColor: '#00C853',
//         borderWidth: 2,
//     },
//     image: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         marginBottom: 16,
//     },
//     infoContainer: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         margin: 16,
//     },
//     name: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 4,
//     },
//     phone: {
//         fontSize: 16,
//         marginBottom: 4,
//     },
//     address: {
//         fontSize: 16,
//         marginBottom: 4,
//     },
// });

export default ClientCard;