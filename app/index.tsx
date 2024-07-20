import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from "@/screens/LandingScreen";
import SignUpEmailScreen from "@/screens/SignUpEmailScreen";
import SignUpInfoScreen from "@/screens/SignUpInfoScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import {useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold} from "@expo-google-fonts/poppins";
const Stack = createNativeStackNavigator();
import { useNavigation } from "@react-navigation/native";

function SignUpStack() {
    const navigation = useNavigation();


    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#1F9FA2",
            },
            headerTitle: "",
            headerTintColor: "white"
            
        }}
        >
            <Stack.Screen 
            name="Email Sign Up"  
            
            component={SignUpEmailScreen} 
            options= {{
                headerTitle: "",
                headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate("Welcome")}><Text style={styles.headerBackText}>Cancel</Text></TouchableOpacity>
                
            }}
            />
            <Stack.Screen 
            name="Info Sign Up"
            component={SignUpInfoScreen}
            options={{
                headerTitle: "Profile",
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                },

            }}
        
        
            />
        </Stack.Navigator>
    );
}


export default function App() {

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold
    });

    if (!fontsLoaded) {
        return null
    }
    return (

        <NavigationContainer
       independent={true}
        >
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name="Welcome" component={LandingScreen}></Stack.Screen>
            {/* re routes to either login or sign up stack */}
            <Stack.Screen name="Sign Up" component={SignUpStack}></Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        </Stack.Navigator>
            
        </NavigationContainer>
    )


}



const styles = StyleSheet.create({
    box: {
        height: 100,
        width: 200,
        padding: 20,
    },
    headerBackText: {
        fontFamily: "Poppins_600SemiBold",
        color: "white",
        fontSize: 16,
        marginLeft: 5
    }

})