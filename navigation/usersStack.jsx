import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddClientScreen from "../screens/addClient";
import ClientDetailsScreen from "../screens/clientDetails";
import ClientsListScreen from "../screens/clientsList";

const UsersStack = createNativeStackNavigator();

const UsersStackScreen = () => {
    return (
        <UsersStack.Navigator>
            <UsersStack.Screen name="ClientsList" component={ClientsListScreen} options={{
                headerTitle: 'Clients'
            }} />
            <UsersStack.Screen name="ClientDetails" component={ClientDetailsScreen} />
            <UsersStack.Screen name="Nouveau client +" component={AddClientScreen} />
        </UsersStack.Navigator>
    )
}

export default UsersStackScreen;