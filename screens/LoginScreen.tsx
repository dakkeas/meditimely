import { StatusBar, 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TextInput,
    ActivityIndicator,
    SafeAreaView
} from "react-native";
import { useNavigation } from "expo-router";
import ButtonTemplate from "@/components/ButtonTemplate";
import InputTextTemplate from "@/components/InputTextTemplate";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase_setup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { checkEmpty, emailValidation } from "@/auth";
import CircularLoading from "@/components/CircularLoading";
export default function LoginScreen() {
    //initialize firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    
    const [errorMessage, setErrorMessage] = useState('')


    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    // invoke navigation object
    const [email, setEmail] = useState("justinedaquis2020@gmail.com")
    const [password, setPassword] = useState('justinekiel')

    if (isLoading) {
        return (
            <CircularLoading></CircularLoading>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#00807f"></StatusBar>
            <Text style={styles.title}>Welcome back!</Text>
            
            <Text style={styles.sectionInfoText}>
               Enter your email and password to continue.
            </Text>
            <Text style={styles.errorMessage}>
                {errorMessage ? errorMessage : " "}
            </Text>
            <View style={styles.inputContainer}>
                <InputTextTemplate
                label="Email"
                placeholder="Enter your email"
                autoCapitalize = 'none'
                value={email}
                onChangeText = {setEmail}
                ></InputTextTemplate>
                <InputTextTemplate
                label="Password"
                placeholder="Enter your password"
                autoCapitalize = 'none'
                value={password}
                onChangeText = {setPassword}
                secureTextEntry
                ></InputTextTemplate>
                
            </View>

            <ButtonTemplate
                title="Login"
                buttonStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: "#00807f", 
                    
                    marginTop: 10
                }}
                textStyle={{
                    color: "#00807f"
                }}

                onPress={() => {
                    switch (true) {
                        case checkEmpty(email):
                            setErrorMessage("Email is empty!")
                        case checkEmpty(password):
                            setErrorMessage("Password is empty!")
                        case emailValidation(email):
                            setErrorMessage('Not a valid email!')
                        default: 
                            setIsLoading(true)
                            signInWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    // Signed in 
                                    const user = userCredential.user;
                                    // ...
                                    console.log('successfully logged in!')
                                    console.log(user.uid)
                                    navigation.navigate("Main")

                                })
                                .catch((error) => {
                                    setErrorMessage(error.code)
                                    setIsLoading(false)
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                
                                    console.log(errorCode)
                                    console.log(errorMessage)
                                })

                    }

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
        // marginBottom: 20,

    },
    errorMessage: {
        fontFamily: "Poppins_600SemiBold",
        color: "red",

    },


})
