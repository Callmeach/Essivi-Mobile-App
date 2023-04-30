import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";
import SettingsScreen from "../screens/settings";

const SettingsStack = createNativeStackNavigator();

const SettingsStackScreen = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
            <SettingsStack.Screen name="LoginPage" component={LoginScreen} />
        </SettingsStack.Navigator>
    )
}

export default SettingsStackScreen;