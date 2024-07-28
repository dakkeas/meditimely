import { Pressable, 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TextInput, 
    ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut} from "firebase/auth";
import CircularLoading from "@/components/CircularLoading";
import { useState } from "react";



import ButtonTemplate from "@/components/ButtonTemplate";
export default function SettingsScreen() {
    const [isLoading, setIsLoading] = useState(false)
    
    const auth = getAuth();
    const navigation = useNavigation();

    if (isLoading) {
        return (
            <CircularLoading></CircularLoading>
        )
    }
    return (
        <View style={styles.container}>

            <View style={styles.logoutContainer}>
                
                <ButtonTemplate 
                title='Logout' 
                
                buttonStyle = {{ backgroundColor: '#27ccd2'}}
                textStyle={{color:"white"}}
                onPress={() => {
                    navigation.navigate('Landing')
                    console.log("Logout clicked")
                    // setIsLoading(true)
                    // signOut(auth).then(() => {
                    //     console.log('SIGN OUT SUCCESSFUL')
                    //     setIsLoading(false)
                    //     // Sign-out successful.
                    // }).catch((error) => {
                    //     console.log('SIGN OUT UNSUCCESSFUL')
                    //     console.log(error.code)
                    //     console.log(error.message)
                    //     // An error happened.
                    // });
                }}></ButtonTemplate>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    logoutContainer: {
        flex: 1,
        padding: 30,
    },
    container: {
        justifyContent: "center",
        // alignItems: "center"
    }

})