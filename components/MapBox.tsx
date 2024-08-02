import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useState, useEffect, useRef } from "react"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { useNavigation } from "expo-router";


const INITIAL_REGION = {
    latitude: 14.6,
    longitude: 121,
    latitudeDelta: 3,
    longitudeDelta: 3,
}


export default function MapBox() {
    const mapRef = useRef<any>();
    const navigation = useNavigation();


    return (
        <View pointerEvents="none"  style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_REGION}
                ref={mapRef}
            >

            </MapView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 1
    },
    map: {
        height: "100%",
        width: "100%"

    }
})