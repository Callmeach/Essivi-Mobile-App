import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons"


const styles = StyleSheet.create(
    {
        image: {
            width: 15,
            height: 15
        },
        text: {
            textTransform: "capitalize",
            fontWeight: 'bold',
            fontSize: 30
        },
        container: {
            flex: 1,
            justifyContent: "space-between"
        }
    }
)

export default function LogoTitle() {
    return (
        <View style={styles.container}>
            <View style={{ flex: 2, flexDirection: "row", marginRight: 5 }}>
                <Image style={styles.image} source={require('../assets/images/favicon.png')} />
                <Text style={styles.text}>Essivi Sarl</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Ionicons name="notifications-outline" />
            </View>

        </View>
    );
}
