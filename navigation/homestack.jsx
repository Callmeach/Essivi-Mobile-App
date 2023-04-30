import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import React from "react";
import LoginScreen from "../screens/login";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {

    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <HomeStack.Screen name="HomePage" component={HomeScreen} />

            <HomeStack.Screen name="Login" component={LoginScreen} />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen;