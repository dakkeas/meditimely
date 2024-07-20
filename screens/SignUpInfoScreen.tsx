import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useNavigation } from "expo-router";
import InputTextTemplate from "@/components/InputTextTemplate";
import ButtonTemplate from "@/components/ButtonTemplate";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";

export default function SignUpInfoScreen() {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const navigation = useNavigation();
    // invoke navigation object

    return (
        <View style={styles.container}>
            <View>
                
                <InputTextTemplate></InputTextTemplate>
                <InputTextTemplate></InputTextTemplate>
                
                
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 30,
        backgroundColor: "whitesmoke",
        justifyContent: "center",
        alignContent: "center",

    },
    text: {
        fontSize: 24,
        textAlign: "center"
    }

})
