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
        <View style={styles.container}>
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
    box: {
        height: 100,
        width: 200,
        padding: 20,
    },
    button: {
        backgroundColor: "#EEEEEE",
        borderRadius: 3,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        marginTop: 10,
    },
    text: {
        fontFamily: "Poppins_600SemiBold",
    }

})