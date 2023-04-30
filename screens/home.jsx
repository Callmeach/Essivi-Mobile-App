import React from 'react';
import { ImageBackground, RefreshControl } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import chart from "../assets/images/chart4c.jpg";
import Ionicons from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../conts/colors';


const HomeScreen = () => {
  const [data, setData] = React.useState('')
  const [remaining, setRemaining] = React.useState('')
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform any actions needed to reload the page
    
      const fetchData = async () => {
        let userToken = await AsyncStorage.getItem('userToken')
        let { token } = JSON.parse(userToken)
        const response = await fetch("http://10.0.2.2:5000/livraison/agent/me/remaining", {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const { remaining } = data

          setRemaining(remaining)
        }
      };
      fetchData();

    
      const fetchDatas = async () => {
        let userToken = await AsyncStorage.getItem('userToken')
        let { token } = JSON.parse(userToken)
        const response = await fetch("http://10.0.2.2:5000/livraison/agent/me/schedules", {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const { total } = data

          setData(total)
        }
      };
      fetchDatas();
    
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // This is just an example, replace with your own logic
  };

  React.useEffect(() => {
    const fetchData = async () => {
      let userToken = await AsyncStorage.getItem('userToken')
      let { token } = JSON.parse(userToken)
      const response = await fetch("http://10.0.2.2:5000/livraison/agent/me/remaining", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const { remaining } = data

        setRemaining(remaining)
      }
    };
    fetchData();
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      let userToken = await AsyncStorage.getItem('userToken')
      let { token } = JSON.parse(userToken)
      const response = await fetch("http://10.0.2.2:5000/livraison/agent/me/schedules", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const { total } = data

        setData(total)
      }
    };
    fetchData();
  }, [])
  return (
    <View style={[styles.container, {
      flexDirection: 'column'
    }]}>

      <View style={{
        flex: 2, borderRadius: 30, marginTop: 30, margin: 20, maxHeight: '20%'
      }}>
        <ImageBackground source={chart} style={{ width: "100%", height: "100%" }} >

          <Text style={styles.text}>Livraisons en Continu, Payements Simples</Text>
          <Text style={{ backgroundColor: 'black', color: 'white', borderRadius: 20, width: '50%', marginLeft: 20, paddingLeft: 15 }}>Augmentez vos revenus</Text>
        </ImageBackground>
      </View>


      <Text style={{ padding: 10, paddingLeft: 20, fontWeight: 'bold', fontSize: 18 }}>Livres et prends plaisir!</Text>

      <View style={{ flex: 4 }}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
          contentContainerStyle={styles.contentContainer} >
          <View style={styles.stats}>
            <Text style={styles.textTitle}>Livraisons du jour</Text>
            <Text style={styles.item}>{data}</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.textTitle}>Livraisons restantes</Text>
            <Text style={styles.item}>{remaining}</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.textTitle}>Gains</Text>
            <Text style={styles.item}>{(data - remaining) * 500} FCFA</Text>
          </View>

        </ScrollView>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  text: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 25
  },
  contentContainer: {
    flex: 1
  },
  stats: {
    flex: 2,
    margin: 20,
    marginBottom: 15,
    marginTop: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  item: {
    fontSize: 20,
    paddingTop: 25
  }
})

export default HomeScreen;
