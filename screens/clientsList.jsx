import { Button, Pressable } from 'react-native';
import { View, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons';
import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClientsListScreen = ({ navigation }) => {

    const [data, setData] = React.useState([])

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
                const {Liste} = data 

                setData(Liste)

            }
        };
        fetchData();
    }, [])

    const detailsHandler = (id, tab) => {
        navigation.navigate('ClientDetails', {id, tab})
    }
    const newClientHandler = () => {
        navigation.navigate('Nouveau client +')
    }
    return (
        <View style={[styles.container, {
            flexDirection: 'column'
        }]}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 15 }}>
                <TextInput placeholder='Rechercher' style={styles.input} />
                <Pressable onPress={newClientHandler} style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgb(112, 162, 243)' : 'blue',
                    },
                    styles.Pressable,
                ]} >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, textTransform: 'uppercase' }}>Ajouter</Text>
                </Pressable>
                {/* <View style={{ margin: 25, width: '90%', borderRadius: 100 }}>
                    <Button title='Ajouter' color='blue' />
                </View> */}

            </View>
            {/* <View style={{ flex: 1 }}>
                <Button title='Ajouter' color='blue' />
            </View> */}
            <View style={{ flex: 4, marginLeft: '5%' }}>
                <ScrollView>
                    {data.map(user => (

                    <Pressable onPress={() => detailsHandler(user.id, 0)} key={user.id}>
                        <View style={{ marginBottom: 20, marginTop: 'auto' }}>
                            <Text style={{ marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}> {user.nom} {user.prenoms} </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('./../assets/images/location.png')}
                                    style={{ width: 80, height: 60 }} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text>{user.adresse}</Text>
                                    <Text>
                                        <Text style={{ fontWeight: 800 }}>Contact</Text>
                                        <Text>  {user.telephone}</Text>
                                    </Text>
                                    <Text style={{ textDecorationLine: 'underline' }}>Cliquer pour voir plus</Text>
                                </View>
                            </View>
                        </View>
                    </Pressable>)

                    )}


                </ScrollView>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    input: {
        borderWidth: 0,
        backgroundColor: '#dedede',
        borderRadius: 5,
        width: '90%',
        paddingLeft: 15,

    },
    Pressable: {
        margin: 25,
        width: '90%',
        borderRadius: 5,
        height: 35,
        justifyContent: 'center'
    }
})

export default ClientsListScreen;