import {View, Text, StyleSheet, Button, TextInput, Image} from "react-native";
import { useNavigation } from "expo-router";
import ButtonTemplate from "@/components/ButtonTemplate";


const logoImg = require("../assets/images/meditimely-logo.png")
export default function LandingScreen() {

    const navigation = useNavigation();
    // invoke navigation object

    return (
        <View style={styles.container}>
        
            <Image source={logoImg} style={styles.logoImg}></Image> 
            
            <View style={styles.buttonContainers}>

                <ButtonTemplate
                    title={"Get Started"}
                    buttonStyle={[{ 
                        backgroundColor: "#1F9FA2"
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
                    }, styles.buttonLayout]}
                    
                    textStyle={{
                        color: "#1F9FA2"
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
    buttonLayout: {
        
    }
    



})
