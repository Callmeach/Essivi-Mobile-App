import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClientDetailsScreen from "../screens/clientDetails";
import DeliveryTodoListScreen from "../screens/deliveryTodoList";

const DeliveryTodoListStack = createNativeStackNavigator();
const DeliveryTodoListStackScreen = () => {
  return (
    <DeliveryTodoListStack.Navigator>
      <DeliveryTodoListStack.Screen name="DeliveryTodoList" component={DeliveryTodoListScreen} options={{
        headerShown: false
      }} />
      <DeliveryTodoListStack.Screen name="ClientDetails" component={ClientDetailsScreen} />
    </DeliveryTodoListStack.Navigator>
  )
}

export default DeliveryTodoListStackScreen