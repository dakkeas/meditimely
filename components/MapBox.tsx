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

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={focusMap}>
                    <View style={{ padding: 10 }}>
                        <Text>FOCUS</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }, [])


    const focusMap = () => {
        const pupManila = {
            latitude: 14.5580,
            longitude: 121.0594,
            latitudeDelta: 1,
            longitudeDelta: 1,
        };

        mapRef.current?.animateCamera({ center: pupManila, zoom: 12 })

    }
    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE}
                // initialCamera={{INITIAL_REGION}}
                initialRegion={INITIAL_REGION}
                showsUserLocation
                showsMyLocationButton
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