import { StatusBar, SafeAreaView, View, Text, StyleSheet, Button, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import InputTextTemplate from "@/components/InputTextTemplate";
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import ButtonTemplate from "@/components/ButtonTemplate";
import { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";


export default function SignUpEmailScreen() {

    const [email, setEmail] = useState("");
    
    const navigation = useNavigation();
    // invoke navigation object

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold
    });

    const handleEmailChange = (text) => {
        setEmail(text)
        // additional code with the email change
    }
    
    if (!fontsLoaded) {
        return null
    }
    return (
        <View style={styles.container}>

            <StatusBar backgroundColor="#1F9FA2"></StatusBar>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.sectionInfoText}>
                
                Discover the optimal clinics near you with personalized recommendations powered by AI.
            </Text>

            <InputTextTemplate
            placeholder={"juandelacruz@gmail.com"}
            label="Email Address"
            initialValue = {email}
            onChangeText = {handleEmailChange}
            ></InputTextTemplate>
            
            <InputTextTemplate
            placeholder={"Enter your password"}
            label="Password"
            // complete here state change
            //
            ></InputTextTemplate>
            <InputTextTemplate
            placeholder={"Confirm your password"}
            label="Confirm Password"
            // complete here state change
            //
            ></InputTextTemplate>
            

            
            <ButtonTemplate
            title="Continue "
            buttonStyle={{
                backgroundColor: "#1F9FA2",
                marginTop: 10
            }}
            textStyle={{
                color: "white"
            }}

            onPress = {() => {
                navigation.navigate("Info Sign Up")
            }}
            ></ButtonTemplate>
        
            
            <View style={{
                marginTop: 10, 
                alignItems: "center", 
                flexDirection: "row", 
                justifyContent: "center"}}>
                
                <Text style={styles.loginText}>Already have an account?</Text>

                <TouchableOpacity 
                style = {{
                    justifyContent: "center",
                    marginLeft: 5
                }}
                onPress = {() => {navigation.navigate("Login")}}
                >

                    <Text style={styles.pressableLoginText}>Log In</Text>

                </TouchableOpacity>
                
            </View>
        </View>
    )
}





const styles = StyleSheet.create({
    pressableLoginText: {
        color: "#1F9FA2",
        fontFamily: "Poppins_600SemiBold"

    },
    loginText: {
        
        fontFamily: "Poppins_400Regular"
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "whitesmoke",
        justifyContent: "flex-start"
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
