import { StatusBar, TouchableOpacity,FlatList, Pressable, View, Text, StyleSheet, Button, TextInput, ScrollView } from "react-native";

import { MaterialIcons } from '@expo/vector-icons';
import specialistList from "../specialistList.json";
import { useNavigation } from "expo-router";

export default function SpecialistInfoScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white"></StatusBar>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Find the right expert for your symptoms</Text>
                <Text style={styles.descriptionPara}>While you might refer to them simply as doctors, many physicians specialize in particular fields of medicine.</Text>
            </View>

            <View style={styles.specialistInfoPressableContainer}>
                <FlatList
                
                data = {specialistList}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 5}} />}
                renderItem={({item})=>{
                    return (
                        
                        <TouchableOpacity
                        onPress={() => {
                            // navigation.navigate('Diseases')
                            // 
                        }}
                        
                        >
                            
                            <View style={styles.pressableContainer}>
                                <Text style={styles.specialistNameText}>{item.type}</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </View>
                        </TouchableOpacity>

                    )
                }}
                ></FlatList>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    specialistNameText: {
        fontFamily: "Poppins_400Regular"   
    },
    specialistInfoPressableContainer: {
        marginBottom: 28,
        flex: 1,
        // backgroundColor: "yellow"
    },
    pressableContainer: {
        
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        
    },
    descriptionPara: {
        fontFamily: "Poppins_400Regular",
        textAlign: "justify",
    },
    descriptionContainer: {
        rowGap: 5,
        // padding: 30
    },
    container: {
        // justifyContent: "center",
        // alignItems: "center",
        padding: 30,
        flex: 1,
        backgroundColor: "white",
        rowGap: 15
    },
    descriptionTitle: {
        color: "#1F9FA2",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18,
        
    }

    

})