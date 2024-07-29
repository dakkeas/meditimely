
import {
    View,
    Text,
    SafeAreaView,
    ActivityIndicator,
    StyleSheet,
    StatusBar
} from "react-native"


export default function CircularLoading({color}) {
    return (
        <SafeAreaView style={styles.loadingContainer}>
            <StatusBar backgroundColor={color ? color : "#00807f"}></StatusBar>
            <ActivityIndicator size="large" color="grey">
            </ActivityIndicator>
            <View style={styles.container}>
                
                <Text style={styles.loadingText}>Loading...</Text>
            </View>

        </SafeAreaView>
            
    )
    
}
const styles = StyleSheet.create({
    container: {
        
        justifyContent: "center",
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
        
    },
    loadingText: {
        fontFamily: "Poppins_400Regular",
        color: "grey",
        marginTop: 10,
        textAlign: "center",
        fontSize: 12,
    }
})