import { View, Text, Button, Pressable } from 'react-native'
import COLORS from '../conts/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({navigation}) => {

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('LoginPage');
      };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={() => handleLogout()} style={{backgroundColor: COLORS.blue, height: 30, justifyContent: 'center', borderRadius: 15}}>
                <Text style={{width: 200, color: COLORS.white, textAlign: 'center'}}>
                    Logout
                </Text>
            </Pressable>
            
        </View>
    );
}

export default SettingsScreen;