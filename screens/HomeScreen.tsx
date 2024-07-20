import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useNavigation } from "expo-router";



export default function HomeScreen() {

    const navigation = useNavigation();
    // invoke navigation object

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
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
