import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeliveryScheduleScreen from "../screens/deliverySchedule";

const DeliveryScheduleStack = createNativeStackNavigator();
const DeliveryScheduleStackScreen = () => {
  return (
    <DeliveryScheduleStack.Navigator>
      <DeliveryScheduleStack.Screen name="DeliveryScheduleList" component={DeliveryScheduleScreen} options={{
        headerShown: false
      }} />
    </DeliveryScheduleStack.Navigator>
  )
}

export default DeliveryScheduleStackScreen