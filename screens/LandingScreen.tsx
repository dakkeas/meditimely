import {StatusBar, View, Text, StyleSheet, Button, TextInput, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonTemplate from "@/components/ButtonTemplate";
import { useEffect } from "react";

const logoImg = require("../assets/images/meditimely-logo.png")
export default function LandingScreen() {

    const navigation = useNavigation();
    // invoke navigation object
    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                // if (!hasUnsavedChanges) {
                //     // If we don't have unsaved changes, then we don't need to do anything
                //     return;
                // }

                // // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen

            }),
        [navigation]
    );
    return (
        <View style={styles.container}>
       
            <StatusBar backgroundColor="whitesmoke"></StatusBar>
            <Image source={logoImg} style={styles.logoImg}></Image> 
            
            <View style={styles.buttonContainers}>

                <ButtonTemplate
                    title={"Get Started"}
                    buttonStyle={[{ 
                        backgroundColor: "#27ccd2"
                     },styles.buttonLayout]}
                     
                    textStyle={{
                        color: "white"
                    }}

                    onPress={() => {
                        navigation.navigate("Sign Up")
                    }}


                ></ButtonTemplate>

                <ButtonTemplate
                    title={"Login"}
                    buttonStyle={[{
                        backgroundColor: "white",
                        marginTop: 10,
                    }, styles.buttonLayout]}
                    
                    textStyle={{
                        color: "#27ccd2"
                    }}

                    
                    onPress={() => {
                        navigation.navigate("Login")
                    }}
                ></ButtonTemplate>  
                
                    
                    
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "whitesmoke",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 50
    },
    buttonContainers: {
        width: "100%"
    },
    logoImg: {
        height: 300,
        width: 300,
    },
    text: {
        fontSize: 24,
        textAlign: "center"
    },




})
