import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DeliveryTodoListStackScreen from "./deliveryTodoListStack";
import DeliveryScheduleStackScreen from "./deliveryScheduleStack";

const Top = createMaterialTopTabNavigator();

const DeliveryStackScreen = () => {
    return (
        <Top.Navigator>
            <Top.Screen name="deliveryList" component={DeliveryTodoListStackScreen} options={{
                tabBarLabel: 'Livraisons'
            }} />
            <Top.Screen name="deliverySchedules" component={DeliveryScheduleStackScreen} options={{
                tabBarLabel: 'Planifier'
            }} />
        </Top.Navigator>
    )
}

export default DeliveryStackScreen;