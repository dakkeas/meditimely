import { StatusBar, View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useNavigation } from "expo-router";
import ButtonTemplate from "@/components/ButtonTemplate";
import InputTextTemplate from "@/components/InputTextTemplate";


export default function LoginScreen() {

    const navigation = useNavigation();
    // invoke navigation object

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1F9FA2"></StatusBar>
            <Text style={styles.title}>Welcome back!</Text>
            
            <Text style={styles.sectionInfoText}>

               Enter your email and password to continue.
            </Text>
            <View style={styles.inputContainer}>
                <InputTextTemplate
                label="Email"
                placeholder="Enter your email"
                ></InputTextTemplate>
                <InputTextTemplate
                label="Password"
                placeholder="Enter your password"
                ></InputTextTemplate>
                
            </View>

            <ButtonTemplate
                title="Login"
                buttonStyle={{
                    backgroundColor: "#1F9FA2",
                    marginTop: 10
                }}
                textStyle={{
                    color: "white"
                }}

                onPress={() => {
                    navigation.navigate("Main")
                }}
            ></ButtonTemplate>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "whitesmoke",
        alignContent: "center",

    },
    text: {
        fontSize: 24,
        textAlign: "center"
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
        fontFamily: "Poppins_700Bold"
    },
    sectionInfoText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        marginBottom: 20,

    },


})
