import React from 'react';
import { Alert, Pressable, ScrollView, TextInput } from 'react-native';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import ClientCard from '../components/client';
import COLORS from '../conts/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/loader';


const DeliveryScheduleScreen = () => {
 
    const [dateLivraison, setDateLivraison] = React.useState('')
    const [clientsList, SetClientsList] = React.useState([])
    const [loading, setLoading] = React.useState(false);

    const [selectedCardIds, setSelectedCardIds] = React.useState([]);

    const handleCardSelect = (id) => {
        if (selectedCardIds.includes(id)) {
            setSelectedCardIds(selectedCardIds.filter((cardId) => cardId !== id));
        } else {
            setSelectedCardIds([...selectedCardIds, id]);
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            let userToken = await AsyncStorage.getItem('userToken')
            let { token } = JSON.parse(userToken)
            const response = await fetch("http://10.0.2.2:5000/clients/me", {
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
                const { Liste } = data

                SetClientsList(Liste)

            }
        };
        fetchData();
    }, [])


    const register = async () => {
        setLoading(true);
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const { token } = JSON.parse(userToken);
            const promises = selectedCardIds.map(async id => {
                const response = await fetch(`http://10.0.2.2:5000/livraison/client/${id}/create`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        date_livraison: dateLivraison
                    }),
                });
                const data = await response.json();
                if (!response.ok) {
                    Alert.alert(data.message);
                }
            });
            await Promise.all(promises);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ margin: 20, flex: 1 }}>
            <Loader visible={loading} />
            <View style={{ marginTop: 20 }}>
                <Text style={{ marginBottom: 15, fontSize: 20 }}>Entrer la date prévue pour la livraison</Text>
                <TextInput
                    placeholder='aa-mm-dd'
                    style={styles.TextInput}
                    value={dateLivraison}
                    onChangeText={setDateLivraison} />
            </View>
            <View style={{ marginTop: 30, marginBottom: 15 }}>
                <Text style={{ fontSize: 20 }}>Choix du client</Text>
            </View>
            <ScrollView>
                <View style={styles.listContainer}>
                    {clientsList.map(user => (
                        <ClientCard
                            key={user.id}
                            id={user.id}
                            profilePic={require('./../assets/images/unnamed.jpg')}
                            address={user.adresse}
                            name={`${user.nom} ${user.prenoms}`}
                            phoneNumber={user.telephone}
                            onSelect={handleCardSelect}
                            isSelected={selectedCardIds.includes(user.id)}
                        />
                    ))}
                </View>
            </ScrollView>


            <Pressable style={{
                backgroundColor: COLORS.blue,
                height: 50,
                marginVertical: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
            }} onPress={() => register()} >
                <Text style={{ color: COLORS.white }}>Valider</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    TextInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#d4cfcd',
        fontSize: 20
    },
    listContainer: {
        margin: 20
    },
});


export default DeliveryScheduleScreen;