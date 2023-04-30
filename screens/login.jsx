import { View, Text, TouchableOpacity } from "react-native";
import Background from "../components/background";
import COLORS from '../conts/colors';
import Field from "../components/field";
import Button from "../components/button";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);

    const handleLogin = async () => {
        
        try {
          const response = await fetch('http://10.0.2.2:5000/users/login', {
            method: 'POST',
            
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          });
    
          const data = await response.json();
          if (response.ok) {
            // Save user data to local storage
            await AsyncStorage.setItem('userToken', JSON.stringify(data));
            alert("Vous êtes connectés")
            // Navigate to the home screen
            navigation.navigate('HomePage');
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <Background>
            <View style={{ alignItems: "center", width: 400 }}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 40,
                        fontWeight: "bold",
                        marginVertical: 40,
                    }}
                >
                    ESSIVI SARL
                </Text>
                <View
                    style={{
                        backgroundColor: "white",
                        height: 850,
                        width: 470,
                        borderTopLeftRadius: 190,
                        paddingTop: 100,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontSize: 37, color: COLORS.blue, fontWeight: "bold" }}>
                        Bienvenue
                    </Text>
                    <Text
                        style={{
                            color: "gray",
                            fontSize: 19,
                            fontWeight: "bold",
                            marginBottom: 20,
                        }}
                    >
                        Connectez vous à votre compte
                    </Text>
                    <Field
                        placeholder="Email"
                        keyboardType={"email-address"}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <Field placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry={true} />
                    <View
                        style={{
                            alignItems: "flex-end",
                            width: "78%",
                            paddingRight: 16,
                            marginBottom: 200,
                        }}
                    >
                        <TouchableOpacity>
                            <Text style={{ color: COLORS.blue, fontWeight: "bold", fontSize: 16 }}>
                                Mot de passe oublié?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        title="Se Connecter"
                        onPress={() => handleLogin()}
                    />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",

                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Vous n'avez pas de compte?{" "}
                        </Text>
                        <TouchableOpacity>
                            <Text style={{ color: COLORS.blue, fontWeight: "bold", fontSize: 16 }}>
                                Inscrivez-vous
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Background>
    );
};


export default LoginScreen;
