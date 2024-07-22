import { StatusBar, Pressable, View, Text, StyleSheet, Button, TextInput, ScrollView, FlatList, TouchableOpacity} from "react-native";
// import { SearchBar } from "react-native-elements";
import { SearchBar } from "react-native-screens";
import { useNavigation } from "expo-router";
import ClinicCard from "@/components/ClinicCard";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import specialistList from "../specialistList.json";
const clinicImage = require('../assets/images/clinic_image.jpg')
export default function HomeScreen() {
    const specialistActive = {
        backgroundColor: 'rgba(31, 159, 162, 0.19)',
        borderColor: "rgba(31, 159, 162, 0.25)",
        
        
    } 
    const navigation = useNavigation();
    const [search, updateSearch] = useState('')
    // invoke navigation object
    const [specialistSelected,setSpecialistSelected]  = useState('')
    return (

            <View style={styles.homePageContainer}>
            <StatusBar backgroundColor="#1F9FA2"></StatusBar>
                <ScrollView
                showsVerticalScrollIndicator={false}
                    style={{
                    }}
                >
                    <View style={{rowGap: 10}}>

                        <View
                            style={styles.searchBarContainer}
                        >
                            <TouchableOpacity
                                onPress={() => {

                                    navigation.navigate('Search')
                                }}
                                style={styles.searchContainer}
                            >
                                <View style={styles.searchBarIcon}>
                                    <MaterialIcons name="search" size={22} color="grey" />
                                </View>
                                <TextInput
                                    placeholder="Search for clinics"
                                    style={styles.searchBar}
                                    editable={false}
                                ></TextInput>
                            </TouchableOpacity>

                            
                            <TouchableOpacity>
                                
                                <View style={styles.filterIcon}>
                                    <MaterialIcons name="filter-list" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.specialistSection}>
                            <View style={styles.sectionTextRowContainer}>
                                <Text style={styles.sectionTitle}>Specialists</Text>
                                <TouchableOpacity
                                onPress= {
                                    ()=>{
                                        navigation.navigate("Specialists More Info")
                                    }
                                }
                                >
                                    <Text style={styles.sectionInfoText}>More Info</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            directionalLockEnabled={true}
                            alwaysBounceVertical={false}>


                            
                                 <FlatList
                                 data={specialistList}
                                contentContainerStyle={{ alignSelf: 'flex-start' }}
                                numColumns={Math.ceil(specialistList.length / 2)}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                columnWrapperStyle={{gap: 5,}}
                                ItemSeparatorComponent={() => <View style={{ height: 5}} />}
                                 renderItem={({item})=> {
                                    return(
                                        <TouchableOpacity onPress={()=>{
                                            console.log(specialistSelected)
                                            setSpecialistSelected(item.name)
                                        }}>
                                        
                                            <SpecialistBox
                                            selectedStyle={item.name == specialistSelected ? specialistActive : ""}
                                            key = {item.id}
                                            specialist={item.name}
                                            iconName={item.iconName}
                                            iconColor={item.iconColor}
                                            ></SpecialistBox>
                                            
                                        </TouchableOpacity>
                                    )
                                 }}
                                 keyExtractor={(item, index) => item.id.toString()}
                                 >
                                 </FlatList>

                            </ScrollView>
                        </View>
                        <View style={styles.specialistSection}>
                            <View style={styles.sectionTextRowContainer}>
                                <Text style={styles.sectionTitle}>Clinics</Text>
                                <TouchableOpacity>
                                    <Text style={styles.sectionInfoText}>Filter</Text>
                                </TouchableOpacity>

                            </View>
                                 <ScrollView>
                                 <ClinicCard
                                 imageSource={clinicImage}
                                 clinicName="Alvarez Clinic"
                                 specialistsCount="2"
                                 patientsCount="21"
                                 rating="5"
                                 locationDistance="35"
                                 ></ClinicCard>
                                 
                                 <ClinicCard
                                 imageSource={clinicImage}
                                 clinicName="Alvarez Clinic"
                                 specialistsCount="2"
                                 patientsCount="21"
                                 rating="5"
                                 locationDistance="35"
                                 ></ClinicCard>
                                 
                                 
                                <TouchableOpacity>
                                    <ClinicCard
                                    imageSource={clinicImage}
                                    clinicName="Alvarez Clinic"
                                    specialistsCount="1"
                                    patientsCount="20"
                                    rating="4"
                                    locationDistance="34"
                                    ></ClinicCard>
                                    
                                </TouchableOpacity>
                                 


                                 </ScrollView>
                        </View>
                    </View>
                </ScrollView> 
            </View>

    )
}

const SpecialistBox = ({
    specialist,
    iconColor,
    iconName,
    selectedStyle 

}) => {
    return(
        <View style={[styles.specialistBox,selectedStyle]} >
            <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
           <Text style={styles.specialistText}>{specialist}</Text>
        </View>

    )
}


const styles = StyleSheet.create({
    specialistActive: {
        backgroundColor: ""
    },
    sectionInfoText: {
        fontFamily: "Poppins_600SemiBold",
        alignSelf: "center",
        fontSize: 12,
        paddingHorizontal: 5,
        color: "#feb346"
    },
    sectionTextRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    specialistText: {
        
        fontFamily: "Poppins_400Regular",
        fontSize:10,
        textAlign: "center",
    },
    specialistSection: {
        
        padding: 10,
        // marginTop: 15,
        borderRadius: 3, 
        backgroundColor: "white",
    },
    specialistBox: {
        // borderWidth: 2,
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"rgba(248, 248, 248, 1)",
        // height: 80,
        paddingVertical: 5,
        paddingHorizontal: 8,
        rowGap: 5,
        // padding: 5,
        // width: 100,
    },

    sectionTitle: {
        backgroundColor: "#FF8A5B",
        paddingHorizontal: 5,
        borderRadius: 3,
        color: "white",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
        marginBottom: 7,
    },
    searchBarContainer: {
        // backgroundColor: "red",
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 3,
        backgroundColor: "white",
    },
    searchBarIcon: {
        alignSelf: "center",
        padding: 12,
        
    },
    filterIcon: {
        backgroundColor: "#FF8A5B",
        borderRadius: 3,
        alignSelf: "center",
        padding: 12
    },
    searchContainer: {
        flexDirection: "row",
        flex: 1,
        
    },
    container: {
        
        justifyContent: "center",
        alignItems: "center"
    },
    homePageContainer: {
        
        paddingHorizontal: 10,
        // rowGap: 15,
        
        flex: 1,
        backgroundColor: "rgba(244, 244, 244, 1)",
        justifyContent: "center",
        alignContent: "center",

    },
    text: {
        fontSize: 24,
        textAlign: "center"
    },
    searchBar: {
        flex: 1,
        
        height: 50,
        paddingTop: 4,
        fontFamily: "Poppins_400Regular",
    },


})
