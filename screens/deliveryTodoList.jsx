import React from "react";
import { Alert, Pressable } from "react-native";
import { View, Text, StyleSheet, TextInput, ScrollView, Image, RefreshControl } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeliveryTodoListScreen = ({ navigation }) => {

    const [data, setData] = React.useState([])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Perform any actions needed to reload the page
        const fetchData = async () => {
            let userToken = await AsyncStorage.getItem('userToken')
            let { token } = JSON.parse(userToken)
            const response = await fetch("http://10.0.2.2:5000/livraison/schedules/me", {
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
                const { Schedules } = data

                setData(Schedules)
            }
        };
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // This is just an example, replace with your own logic
    };

    React.useEffect(() => {
        const fetchData = async () => {
            let userToken = await AsyncStorage.getItem('userToken')
            let { token } = JSON.parse(userToken)
            const response = await fetch("http://10.0.2.2:5000/livraison/schedules/me", {
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
                const { Schedules } = data

                setData(Schedules)
            }
        };
        fetchData();
    }, [])

    const today = new Date().toUTCString()
    const todaySchedules = data.filter(item => new Date(item.date).toDateString() === new Date(today).toDateString())

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowDate = tomorrow.toISOString().slice(0, 10)
    const tomorrowSchedules = data.filter(item => new Date(item.date).toDateString() === new Date(tomorrowDate).toDateString())

    const detailsHandler = (id, tab, idL) => {
        navigation.navigate('ClientDetails', { id, tab, idL })
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={[styles.container, {
                flexDirection: 'column'
            }]}>

                <Text style={{ margin: 20, fontWeight: "bold", fontSize: 25, backgroundColor: '#b4b1af', borderRadius: 8, paddingLeft: 10 }}>Aujourd'hui</Text>

                <View style={{ flex: 1, marginLeft: '5%' }}>
                    {todaySchedules.map(livraison => (
                        <Pressable key={livraison.id} onPress={() => detailsHandler(livraison.client.id, 1, livraison.id)}>
                            <View style={{ marginBottom: 20, marginTop: 'auto' }}>
                                <Text style={{ marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}>{`${livraison.client.nom} ${livraison.client.prenoms}`}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('./../assets/images/location.png')}
                                        style={{ width: 80, height: 60 }} />
                                    <View style={{ marginLeft: 15 }}>
                                        <Text>{livraison.client.adresse}</Text>
                                        <Text>
                                            <Text style={{ fontWeight: 800 }}>Contact</Text>
                                            <Text>  {livraison.client.telephone} </Text>
                                        </Text>
                                        <Text style={{ textDecorationLine: 'underline' }}>Cliquer pour voir plus</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    ))}

                    <Text style={{ margin: 20, marginLeft: 0, fontWeight: "bold", fontSize: 25, backgroundColor: '#b4b1af', borderRadius: 8, paddingLeft: 10 }}>Demain</Text>
                    {tomorrowSchedules.map(livraison => (
                        <Pressable key={livraison.id} onPress={() => detailsHandler(livraison.client.id, 1)}>
                            <View style={{ marginBottom: 20, marginTop: 'auto' }}>
                                <Text style={{ marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}>{`${livraison.client.nom} ${livraison.client.prenoms}`}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('./../assets/images/location.png')}
                                        style={{ width: 80, height: 60 }} />
                                    <View style={{ marginLeft: 15 }}>
                                        <Text>{livraison.client.adresse}</Text>
                                        <Text>
                                            <Text style={{ fontWeight: 800 }}>Contact</Text>
                                            <Text>  {livraison.client.telephone}</Text>
                                        </Text>
                                        <Text style={{ textDecorationLine: 'underline' }}>Cliquer pour voir plus</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    ))}


                </View>
            </View>
        </ScrollView>

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

export default DeliveryTodoListScreen;