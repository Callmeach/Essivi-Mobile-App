import React from "react";
import { View, Text, Image, StyleSheet, Button, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClientDetailsScreen = ({ route }) => {
    const { id, tab, idL } = route.params
    const [data, setData] = React.useState([])
    const [formModalVisible, setFormModalVisible] = React.useState(false)
    const [showSuccessModal, setShowSuccessModal] = React.useState(false)
    const [successLivraison, setSuccessLivraison] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            let userToken = await AsyncStorage.getItem('userToken')
            let { token } = JSON.parse(userToken)
            const response = await fetch('http://10.0.2.2:5000/clients/' + id, {
                method: "GET",
                mode: "cors",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                const { Client } = data

                setData(Client)

            }
        };
        fetchData();
    }, [id])


    const SuccessModal = () => {

        const onClose = () => {
            setShowSuccessModal(false)
        }

        return (
            <Modal visible={showSuccessModal} animationType="slide">
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Delivery Successful</Text>
                        <Text style={{ marginTop: 10 }}>Nom du client: {successLivraison.client?.nom}</Text>
                        <Text style={{ marginTop: 5 }}>Prénoms du client: {successLivraison.client?.prenoms}</Text>
                        <Text style={{ marginTop: 5 }}>Address: {successLivraison.adresse}</Text>
                        <Text style={{ marginTop: 5 }}>Quantity: {successLivraison.quantite}</Text>
                        <Text style={{ marginTop: 5 }}>Date: {successLivraison.date}</Text>
                        <Text style={{ marginTop: 5 }}>Earning Amount: {successLivraison.quantite * 500} FCFA</Text>
                        <TouchableOpacity onPress={onClose} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}>
                            <Text style={{ color: '#fff', textAlign: 'center' }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };


    const FormModal = () => {
        const [quantity, setQuantity] = React.useState('');
        const [address, setAddress] = React.useState('');

        const handleSubmit = async () => {

            try {
                let userToken = await AsyncStorage.getItem('userToken')
                let { token } = JSON.parse(userToken)
                const response = await fetch(`http://10.0.2.2:5000/livraison/${idL}`, {
                    method: 'PATCH',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(
                        {
                            adresse: address,
                            quantite: quantity
                        }
                    )
                });

                const data = await response.json();

                if (response.ok) {
                    const { Livraison } = data
                    setSuccessLivraison(Livraison)

                    setFormModalVisible(false)
                    setShowSuccessModal(true)

                    //navigation.navigate('ClientsList')
                } else {
                    Alert.alert(data.message);
                }
            } catch (error) {
                console.error(error);
            }

        };

        const onClose = () => {
            setFormModalVisible(false)
        }

        return (
            <Modal visible={formModalVisible} animationType="slide" style={styles.modalContainer}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Formulaire de livraison</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Quantité"
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                    />
                    {/* <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerButtonText}>
            {moment(date).format('MMMM Do YYYY')}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={date} mode="date" onChange={handleDateChange} />
        )} */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
                            <Text style={styles.sendButtonText}>Confirmer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };



    return (
        <ScrollView>
            <View style={[styles.container, {
                flexDirection: 'column', marginLeft: 5, marginRight: 5
            }]}>
                <Image source={require('./../assets/images/GoogleMapTA.png')}
                    style={{ width: 'auto', height: 500 }} />
                <View>
                    <Text style={{ paddingTop: 20, fontWeight: 900, fontSize: 30 }}>Details Client</Text>
                    <Text style={{ marginBottom: 10, marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Nom - Prénoms:  </Text>
                        <Text style={{ fontSize: 20 }}> {data.nom} {data.prenoms} </Text>
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Adresse:  </Text>
                        <Text style={{ fontSize: 20 }}>{data.adresse}</Text>
                    </Text>

                    <Text style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Contact</Text>
                        <Text style={{ fontSize: 20 }}> {data.telephone} </Text>
                    </Text>

                    <Text style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Email</Text>
                        <Text style={{ fontSize: 20 }}> {data.email} </Text>
                    </Text>

                    <Text style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Adresse de livraison</Text>
                        <Text style={{ fontSize: 20 }}> {data.adresse_livraison} </Text>
                    </Text>
                    {tab === 1 ?
                        <View style={{ marginVertical: 30 }} >
                            <Button title="Livrer" onPress={() => setFormModalVisible(true)} color="#6fd077" />
                            <FormModal />
                            <SuccessModal />
                        </View>
                        :
                        (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginVertical: 30, width: '45%', borderRadius: 10 }} >
                                    <Button title="Modifier" color="green" />
                                </View>
                                <View style={{ marginVertical: 30, width: '45%', marginLeft: 20, borderRadius: 10 }} >
                                    <Button title="Supprimer" color="red" />
                                </View>
                            </View>
                        )
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    sendButton: {
        backgroundColor: '#008000',
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#ff0000',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    successModal: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    successModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    successModalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    okButton: {
        backgroundColor: '#008000',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    okButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});


export default ClientDetailsScreen;