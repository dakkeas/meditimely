import {View, Text, StyleSheet, TouchableOpacity, Touchable} from "react-native"
import { useState, useEffect, useRef } from "react"
import  MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useNavigation } from "expo-router";
import ClinicMarkers from "../components/ClinicMarkers.json"


const INITIAL_REGION = {
    latitude: 15,
    longitude: 121,
    latitudeDelta: 1,
    longitudeDelta: 1, 

}



export default function MapTemplate() {
    const mapRef = useRef<any>();
    const navigation = useNavigation();
    
    
    useEffect(() => {
        
        focusMap()
    }, [])


    const focusMap = () => {
        const pupManila = {
            "latitude": 14.5767,
            "longitude": 120.9870,
            "latitude_delta": 0.0020,
            "longitude_delta": 0.0040

        };
        
        mapRef.current?.animateCamera({center: pupManila, zoom: 12})
        
    }
    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE}
            // initialRegion={INITIAL_REGION  }
            showsUserLocation = {true}
            
            showsMyLocationButton = {true}
            ref={mapRef}
            loadingEnabled={true}
            >
            
            
                {ClinicMarkers.map((marker,index)=> (
                    <TouchableOpacity key= {index} onPress={()=> {
                        mapRef.current?.animateCamera({center: marker, zoom: 12})
                    }}>
                        
                        <Marker coordinate={marker}></Marker>
                    </TouchableOpacity>
                ))} 
            </MapView>
            
            <TouchableOpacity onPress={focusMap}>
                <View style={{padding:10}}>
                    <Text style={styles.resetText}>Reset</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
    },
    map: {
        height: "100%",
        width: "100%",
    },
    resetText:{
        fontFamily: "Poppins_600SemiBold",
        color: "white"
        
    }
})