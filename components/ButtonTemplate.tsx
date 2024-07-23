import { View, Text, StyleSheet,Button, TouchableOpacity } from "react-native";
import {useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold} from "@expo-google-fonts/poppins";

export default function ButtonTemplate({
    title,
    buttonStyle,
    textStyle,
    onPress
    
}) {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold
    });

    if (!fontsLoaded) {
        return null
    }
    return (
        <View >
           <TouchableOpacity 
           title={title} 
           style = {[styles.button, buttonStyle]}
           onPress={onPress}
           >
            <Text style={[styles.text, textStyle]}>{title}</Text>
           </TouchableOpacity>
        </View>
    )


}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#EEEEEE",
        borderRadius: 3,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: "Poppins_600SemiBold",
    }

})