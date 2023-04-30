import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

import COLORS from '../conts/colors';
import Button from '../components/button';
import Input from '../components/input';
import Loader from '../components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddClientScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    nom: '',
    prenoms: '',
    email: '',
    telephone: '',
    adresse: ''
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Veuillez renseigner le mail', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Veuillez saisir un mail valide', 'email');
      isValid = false;
    }

    if (!inputs.nom) {
      handleError('Veuillez saisir un nom', 'nom');
      isValid = false;
    }

    if (!inputs.prenoms) {
      handleError('Veuillez saisir un prenom', 'prenoms');
      isValid = false;
    }

    if (!inputs.telephone) {
      handleError('Veuillez saisir un numéro', 'telephone');
      isValid = false;
    }

    if (!inputs.adresse) {
      handleError("Veuillez saisir l'adresse", 'adresse');
      isValid = false;
    }


    // if (!inputs.password) {
    //   handleError('Please input password', 'password');
    //   isValid = false;
    // } else if (inputs.password.length < 5) {
    //   handleError('Min password length of 5', 'password');
    //   isValid = false;
    // }

    if (isValid) {
      register()
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        let userToken = await AsyncStorage.getItem('userToken')
        let { token } = JSON.parse(userToken)
        const response = await fetch('http://10.0.2.2:5000/clients/create', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(inputs)
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert("Ok")
          
          //navigation.navigate('ClientsList')
        } else {
          Alert.alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }, 3000)

  }



  //   const register = () => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       try {
  //         setLoading(false);
  //         AsyncStorage.setItem('userData', JSON.stringify(inputs));
  //         navigation.navigate('LoginScreen');
  //       } catch (error) {
  //         Alert.alert('Error', 'Something went wrong');
  //       }
  //     }, 3000);
  //   };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>

      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
          Enregistrer
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Entrez les informations du client
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'nom')}
            onFocus={() => handleError(null, 'nom')}
            iconName="account-outline"
            label="Nom"
            placeholder="Entrer le nom"
            error={errors.nom}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'prenoms')}
            onFocus={() => handleError(null, 'prenoms')}
            iconName="account-outline"
            label="Prenoms"
            placeholder="Entrer le(s) prenom(s)"
            error={errors.prenoms}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Entrez l'adresse mail"
            error={errors.email}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'telephone')}
            onFocus={() => handleError(null, 'telephone')}
            iconName="phone-outline"
            label="Telephone"
            placeholder="Entrez le numéro de téléphone"
            error={errors.telephone}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'adresse')}
            onFocus={() => handleError(null, 'adresse')}
            iconName="account-outline"
            label="Adresse"
            placeholder="Entrer l'adresse"
            error={errors.adresse}
          />
          {/* <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          /> */}
          <Button title="Register" onPress={validate} />
          {/* <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have account ?Login
          </Text> */}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default AddClientScreen;
