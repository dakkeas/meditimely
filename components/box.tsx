import {View, Text, StyleSheet } from "react-native";


export default function Box({ children, style}) {

    return (
        <View style={[styles.box, style]}>
        {/* multiple styles */}
            <Text>{children}</Text>
        </View>
    )
    
    
}

const styles = StyleSheet.create({
    box: {
        
        height: 100,
        width: 200,
        padding: 20,
    }

})