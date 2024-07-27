import { StatusBar, SafeAreaView, View, Text, StyleSheet, Button, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import InputTextTemplate from "@/components/InputTextTemplate";
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import ButtonTemplate from "@/components/ButtonTemplate";
import { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

import { checkEmpty } from "../auth"
import { emailValidation } from "../auth"



export default function SignUpEmailScreen() {
    const [email, setEmail] = useState('justinedaquis2020@gmail.com');
    const [password, setPassword] = useState('justinekiel');
    const [confirmPassword, setConfirmPassword] = useState('justinekiel');
    const [errorMessage, setErrorMessage] = useState('');
    
    // function checkEmpty(inputWord) {
    //     if (inputWord == null || inputWord.length == 0) {
    //         console.log('returning TRUE')

    //         return true
    //     } else {
    //         console.log('returning FALSE')
    //         return false
    //     }
    // }

    function passwordSignUpValidation(password, confirmPassword) {
        if (password.length < 6) {
            // if password is too short, throw an error!
            console.error('Password too short');
            setErrorMessage("Password has to be more than 6 letters")
        } else {

            if (confirmPassword.length == 0) {
                // if confirming password not needed
                return true
            } else {
                if (password == confirmPassword) {
                    // if password does not match confirm password
                    setPassword(password)
                    return true
                } else {
                    console.error('Passwords does not match')
                    setErrorMessage('Passwords do not match')
                }
            }

        }

        return false
    }





    // const [email, setEmail] = useState("");
    
    const navigation = useNavigation();
    // invoke navigation object

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

            <StatusBar backgroundColor="#1F9FA2"></StatusBar>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.sectionInfoText}>
                
                Discover the optimal clinics near you with personalized recommendations powered by AI.
            </Text>
            <View style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
                
                <Text style={styles.errorMessage}>{errorMessage ? errorMessage : " "}</Text>
            </View>

            <InputTextTemplate
            placeholder="juandelacruz@gmail.com"
            label="Email Address"
            value = {email}
            onChangeText = {setEmail}
            autoCapitalize="none"
            ></InputTextTemplate>
            
            <InputTextTemplate
            placeholder="Enter your password"
            label="Password"
            value = {password}
            onChangeText = {setPassword}

            autoCapitalize="none"
            secureTextEntry={true}
            //
            autoCapitalize={false}
            ></InputTextTemplate>
            <InputTextTemplate
            placeholder="Confirm your password"
            label="Confirm Password"
            secureTextEntry={true}
            value = {confirmPassword}
            onChangeText = {setConfirmPassword}
            autoCapitalize="none"
            
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
                // check empty first!~
                if (checkEmpty(email)) {
                    
                    setErrorMessage("Email is empty!")
                } else if (checkEmpty(password)) {
                    setErrorMessage("Password is empty!")
                } else if (checkEmpty(confirmPassword)) {
                    setErrorMessage("Confirm Password is empty!")
                } else {
                    console.log('no fields are empty!')     
                    if (emailValidation(email)) {
                    if (passwordSignUpValidation(password, confirmPassword)){
                        navigation.navigate('Info Sign Up', {
                            email: email,
                            password: password
                        })
                        setErrorMessage('')
                    }
                    } else {
                        setErrorMessage("Not a Valid Email!")
                    }
                }
                
                

                
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
                onPress = {() => {

                    navigation.navigate("Login")

                }}
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
        
    },
    errorMessage: {
        fontFamily: "Poppins_600SemiBold",
        color: "red",

    }
    


})
