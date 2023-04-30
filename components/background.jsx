import { View, ImageBackground } from 'react-native';

const Background = ({ children }) => {
    return (
        <View>
            <ImageBackground source ={ require("../assets/images/eau6.jpeg") } style = {{ height: "100%" }} />
            <View style= {{ position: "absolute" }}>
                {children} 
            </View>
        </View>
    );
}

export default Background;