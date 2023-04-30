import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native';


import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './screens/settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeStackScreen from './navigation/homestack';
import UsersStackScreen from './navigation/usersStack';
import DeliveryStackScreen from './navigation/deliveryStack';
import SettingsStackScreen from './navigation/settingsStack';
import LoginScreen from './screens/login';
import AsyncStorage from '@react-native-async-storage/async-storage';


function LogoTitle() {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Image style={styles.image} source={require('./assets/images/favicon.png')} />
                <Text style={styles.text}>Essivi Sarl</Text>


            </View>


        </View>
    );
}


const Tab = createBottomTabNavigator();

const App = () => {
    const [userToken, setUserToken] = React.useState(null);

    

    React.useEffect(() => {
        SplashScreen.hide();
        async function fetchUserToken() {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
        }
        fetchUserToken();
    }, []);

    
    if (userToken) {
        return (
            <NavigationContainer>
                
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
    
                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'home'
                                    : 'home-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'settings' : 'settings-outline';
                            } else if (route.name === 'Clients') {
                                iconName = focused ? 'people' : 'people-outline';
                            } else if (route.name === 'Livraisons') {
                                iconName = focused ? 'cart' : 'cart-outline';
                            }
    
                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'black',
                        // tabBarInactiveTintColor: 'gray',
                    })}>
    
                    <Tab.Screen name="Home" component={HomeStackScreen}
                        options={{
    
                            headerTitle: (props) => <LogoTitle {...props} />,
                            headerRight: () => (
    
                                <Ionicons size={30} style={styles.icon} name="notifications-outline" />
    
                            )
                        }} />
                    <Tab.Screen name='Livraisons' component={DeliveryStackScreen} options={{
                        headerShown: false
                    }} />
                    <Tab.Screen name='Clients' component={UsersStackScreen} options={{
                        headerShown: false
                    }} />
                    <Tab.Screen name="Settings" component={SettingsStackScreen} options={{
                        headerShown: false
                    }} />
    
                </Tab.Navigator>
    
    
            </NavigationContainer>
            
    
        );
    }
    return (
        <LoginScreen />
    )
    
}

const styles = StyleSheet.create(
    {
        image: {
            width: 35,
            height: 35,
        },
        text: {
            textTransform: "uppercase",
            fontWeight: 'bold',
            fontSize: 25,
            marginLeft: 10,

        },
        container: {
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 9
        },
        icon: {
            alignItems: "center",
            paddingRight: 20
        }
    }
)


export default App;