import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useNavigation } from "expo-router";



export default function SignUpEmailScreen() {

    const navigation = useNavigation();
    // invoke navigation object

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign Up</Text>
            <Text></Text>
            
            <View style={styles.inputContainer}>
                <TextInput></TextInput>
                
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
        fontSize: 16,
        // textAlign: "center"
    }

})
