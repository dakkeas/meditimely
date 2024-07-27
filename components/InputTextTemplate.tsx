import { SafeAreaView, TextInput, View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

export default function InputTextTemplate({label, inputStyle, ...props }) {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold
    });

    const [text, setText] = useState('')
    
    const handleChangeText = (newText) => {
        setText(newText);
        if (onChangeText) {
            onChangeText(newText);
        }
    };
 

    if (!fontsLoaded) {
        return null
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.labelText}>{label}</Text>
            <TextInput
            {...props}
            // secureTextEntry={secureTextEntry}
            // placeholder={placeholder}
            style = {[styles.inputField, inputStyle]}
            // value={text}
            // onChangeText={handleChangeText}
            // autoCapitalize="none"
            // editable= {editable}
            ></TextInput>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    labelText: {
        marginBottom: 5,
        fontFamily: "Poppins_600SemiBold",
        color: "grey"
    },
    container: {
        width: "100%"

    },

    inputField: {
        
        marginBottom: 10,
        height: 50,
        padding: 10,
        borderRadius: 3,
        fontFamily: "Poppins_400Regular",
        borderWidth: 1,
        borderColor: "grey"
        
    }


    
})


