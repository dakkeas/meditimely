import { Dimensions, 
    Image, 
    Modal, 
    StatusBar, 
    Pressable, 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TextInput, 
    ScrollView, 
    FlatList, 
    TouchableOpacity,
    Touchable, 
} from "react-native";
// import { SearchBar } from "react-native-elements";
import { SearchBar } from "react-native-screens";
import { useNavigation } from "expo-router";
import ClinicCard from "@/components/ClinicCard";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import specialistList from "../specialistList.json";
import ButtonTemplate from "@/components/ButtonTemplate";
const clinicImage = require('../assets/images/clinic_image.jpg')
const clinicImage2 = require('../assets/images/clinic_image2.jpg')
const clinicImage3 = require('../assets/images/clinic_image3.jpg')
import Reviews from "../Reviews.json"
import { jsiConfigureProps } from "react-native-reanimated/lib/typescript/reanimated2/core";
// import Doctors from "../doctors.json"


const doctor = require("../assets/images/doctor3.jpg")

const StarRating = (rating) => {

    // Array to hold the star components
    const stars = [];

    // Create an array of stars based on the rating
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<MaterialIcons name="star" key={i} size={16} color="#FFD700" />);
        } else {
            stars.push(<MaterialIcons name="star" key={i} size={16} color="#FCF3CF" />);
        }
    }

    return <View style={styles.starContainer}>{stars}</View>;
};
// function imageRequire(source) {
//     const image = require(source)
//     return image

// }

// const ClinicDetails = () => {
//     return(

//     )
// }
export default function HomeScreen() {
    const specialistActive = {
        backgroundColor: 'rgba(31, 159, 162, 0.19)',
        borderColor: "rgba(31, 159, 162, 0.25)",


    }
    const navigation = useNavigation();
    const [search, updateSearch] = useState('')
    // invoke navigation object
    const [specialistSelected, setSpecialistSelected] = useState('')
    const [isClinicModalVisible, setisClinicModalVisible] = useState(false)


    const WIDTH = Dimensions.get('window').width;
    const [imgActive, setImgActive] = useState(0)
    onchange = (nativeEvent) => {

    }
    const images = [
        {
            "id": 1,
            "name": "Clinic Image 1",
            "source": require('../assets/images/clinic_image.jpg')
        },
        {
            "id": 2,
            "name": "Clinic Image 2",
            "source": require('../assets/images/clinic_image2.jpg')
        },
        {
            "id": 3,
            "name": "Clinic Image 3",
            "source": require('../assets/images/clinic_image3.jpg')
        }
    ]
    const doctors = 
    [
        {
            "id": 1,
            "name": "Dr. Juan dela Cruz",
            "specialty": "Cardiology",
            "location": "Manila, Philippines",
            "experience": "15 years",
            "image": require("../assets/images/doctor1.jpg"), // Example image path
            "ratings": 4.8,
            "reviews": 120
        },
        {
            "id": 2,
            "name": "Dr. Maria Santos",
            "specialty": "Pediatrics",
            "location": "Quezon City, Philippines",
            "experience": "12 years",
            "image": require("../assets/images/doctor2.jpg"), // Example image pathKjKj
            "ratings": 4.9,
            "reviews": 90
        },
        {
            "id": 3,
            "name": "Dr. Josefa Reyes",
            "specialty": "Orthopedics",
            "location": "Cebu City, Philippines",
            "experience": "18 years",
            "image": require("../assets/images/doctor3.jpg"), // Example image path
            "ratings": 4.7,
            "reviews": 150
        }
    ]



    return (

            <View style={styles.homePageContainer}>
            <StatusBar backgroundColor="#1F9FA2"></StatusBar>
                <ScrollView
                showsVerticalScrollIndicator={false}
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

                        <View style={styles.homeSection}>
                            <View style={styles.sectionTextRowContainer}>
                                <View style={styles.sectionTitleContainer}>
                                    <View style={{alignSelf: "center"}}>
                                        <MaterialIcons name="medical-services" size={14} color="white"  />

                                    </View>
                                    <Text style={styles.sectionTitle}>Specialists</Text>
                                </View>

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
                                            navigation.navigate('Search')
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
                        <View style={styles.homeSection}>
                            <View style={styles.sectionTextRowContainer}>
                                <View style={styles.sectionTitleContainer}>
                                    <View style={{ alignSelf: "center" }}>
                                        <MaterialIcons name="near-me" size={14} color="white" />

                                    </View>
                                    <Text style={styles.sectionTitle}>Clinics Near You</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.sectionInfoText}>Filter</Text>
                                </TouchableOpacity>

                            </View>

                                 
                                <TouchableOpacity
                                onPress={()=> setisClinicModalVisible(!isClinicModalVisible)}
                                >
                                    <ClinicCard
                                    imageSource={clinicImage}
                                    clinicName="Alvarez Clinic"
                                    specialistsCount="1"
                                    patientsCount="20"
                                    rating="4"
                                    locationDistance="34"
                                    ></ClinicCard>
                                    
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    
                                    <ClinicCard
                                        imageSource={clinicImage2}
                                        clinicName="Oliver Diagnostic Center"
                                        specialistsCount="2"
                                        patientsCount="25"
                                        rating="6"
                                        locationDistance="129"
                                    ></ClinicCard>
                                </TouchableOpacity>
                                
                                <TouchableOpacity>
                                    
                                    <ClinicCard
                                        imageSource={clinicImage3}
                                        clinicName="St. Joseph Clinic"
                                        specialistsCount="4"
                                        patientsCount="19"
                                        rating="3"
                                        locationDistance="12"
                                    ></ClinicCard>
                                </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={[styles.expandSectionContainer, {marginBottom: -10}]}>
                                    <Text style={styles.expandSectionText}>See More</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </ScrollView> 

                <Modal
                visible={isClinicModalVisible}
                onRequestClose={() => setisClinicModalVisible(!isClinicModalVisible)}
                animationType="slide"
                // presentationStyle="fullscreen"
                //k transparent={true}
                >
                   <View style={[styles.clinicModalContainer]}>
                        <View style={styles.clinicUpperContentContainer}>
                            <View style={styles.clinicModalHeader}>
                                <TouchableOpacity 
                                onPress={()=> setisClinicModalVisible(!isClinicModalVisible)}
                                >
                                    <MaterialIcons name="arrow-back" size={22} color="white" />
                                </TouchableOpacity>
                            </View>         
                            <View style={styles.clinicTitleContainer}>
                                
                                <Text style={styles.clinicName}>Alvarez Medical Clinic</Text>
                                <View style={styles.clinicDistanceContainer}>
                                    <MaterialIcons name="location-on" size={20}color="white" />
                                    <Text style={styles.clinicDistanceText}>11 KM</Text>
                                </View>
                            </View>
                        </View>
                                    
                        <View style={styles.clinicMainContentContainer}>
                            <ScrollView
                            showsVerticalScrollIndicator={false}
                            >

                                 <View style={{rowGap: 15}}>
                                    <View style={styles.clinicImageContainer}>
                                        <FlatList
                                            data={images}
                                            horizontal
                                            snapToAlignment="start"
                                            pagingEnabled
                                            decelerationRate={"normal"}


                                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item }) => {
                                                return (
                                                    <Image source={item.source} style={{ height: "100%", width: WIDTH - 40, flex: 1, borderRadius: 10 }}></Image>

                                                )
                                            }}
                                        >

                                        </FlatList>
                                    </View>
                                    <View style={styles.clinicInfoContainer}>
                                        <View style={styles.clinicSectionContainer}>
                                            <Text style={styles.clinicSectionText}>Details</Text>
                                        </View>

                                        <View style={styles.detailsContainer}>
                                            <View style={styles.detailRow}>
                                            <MaterialIcons name="medical-information" size={20} color="#F5B041" />
                                                
                                                <View style={[styles.clinicSpecializationsRow,{width: WIDTH-90}]}>
                                                    
                                                    <Text style={styles.clinicSpecializationText}>Cardiologist</Text>
                                                    <Text style={styles.clinicSpecializationText}>Dentist</Text>
                                                    <Text style={styles.clinicSpecializationText}>ENT</Text>
                                                    <Text style={styles.clinicSpecializationText}>Pulmonologist</Text>
                                                    <Text style={styles.clinicSpecializationText}>Immunologist</Text>
                                                </View>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <MaterialIcons name="local-phone" size={20} color="#F5B041" />
                                                <Text style={styles.detailText}>+639164137270</Text>
                                            </View>

                                            <View style={styles.detailRow}>
                                                <MaterialIcons name="email" size={20} color="#F5B041" />
                                                <Text style={styles.detailText}>alvarexhospitalmedical@gmail.com</Text>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <MaterialIcons name="location-city" size={20} color="#F5B041" />
                                                <Text style={styles.detailText}>San Juan, Metro Manila</Text>
                                            </View>

                                            {/* <ButtonTemplate
                                                title="Open in Maps"
                                                buttonStyle={{ backgroundColor: "rgba(31,159,162,0.19)", height: 40 }}
                                            textStyle={{ color: "#1F9FA2" }}
                                            ></ButtonTemplate> */}
                                        <TouchableOpacity>
                                            <View style={styles.expandSectionContainer}>
                                                <Text style={styles.expandSectionText}>View All</Text>
                                            </View>
                                        </TouchableOpacity>
                                        </View>

                                    </View>

                                    <View style={styles.clinicDoctorsContainer}>
                                        <View style={styles.clinicSectionContainer}>
                                            <Text style={styles.clinicSectionText}>Doctors</Text>
                                        </View>
                                        <View style={styles.doctorsListContainer}>
                                            
                                            <FlatList
                                            ItemSeparatorComponent={() => <View style={{ height: 15}} />}
                                            scrollEnabled = {false}
                                            data={doctors}
                                            renderItem={({item})=> {

                                                
                                                // const image = require(item.image)
                                                return (
                                                    <TouchableOpacity style={styles.doctorCard}>
                                                    
                                                        <View style={styles.doctorImage}>
                                                            
                                                            <Image source={item.image} style={{height: 100, width: 100}} resizeMode="cover"></Image>
                                                        </View>
                                                        <View style={styles.doctorInfoContainer}>
                                                            
                                                            <Text style={styles.doctorNameText}>{item.name}</Text>
                                                            <Text style={[styles.clinicSpecializationText]}>{item.specialty}</Text>
                                                            <Text style={styles.doctorInfoText}>{item.experience}</Text>
                                                            <View style={{ alignItems: "flex-start", flexDirection: "row", columnGap: 5 }}>{<MaterialIcons name="star" size={12} color="#FFD700" />}<Text style={styles.doctorInfoText}>{item.ratings}</Text></View>
                                                            
                                                            <Text style={styles.doctorInfoText}>{item.reviews} Reviews</Text>



                                                        </View>
                                                        <View style={{alignSelf: "center", marginLeft: "auto"}}>
                                                            
                                                            <MaterialIcons name="arrow-forward-ios" size={12} color="grey" />
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                                
                                            }}
                                            >
                                                
                                            </FlatList>
                                        </View>

                                        <TouchableOpacity>
                                            <View style={styles.expandSectionContainer}>
                                                <Text style={styles.expandSectionText}>View All</Text>
                                            </View>
                                        </TouchableOpacity>
                                        

                                    </View>

                                    <View style={styles.clinicReviewsContainer}>
                                    
                                    <View style={styles.clinicSectionContainer}>
                                        <Text style={styles.clinicSectionText}>Reviews</Text>
                                    </View>
                                        <View style={styles.reviewsContainer}>
                                            <FlatList
                                                horizontal
                                                data={Reviews}
                                                
                                                ItemSeparatorComponent={() => <View style={{ width: 10}} />}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <View style={styles.reviewCard}>
                                                            <Text style={[styles.reviewName ]}>{item.name}</Text>
                                                            {StarRating(item.stars)}
                                                            <Text style={[styles.reviewComment ]}>{item.comment}</Text>
                                                        </View>
                                                    )

                                                }}
                                            >
                                            </FlatList>
                                            {/* <ButtonTemplate
                                                title="Write A Review"
                                            ></ButtonTemplate> */}
                                            <TouchableOpacity>
                                                <View style={styles.expandSectionContainer}>
                                                    <Text style={styles.expandSectionText}>See All Reviews</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                 </View>


                                    <ButtonTemplate
                                    title="Book an Appointment"
                                buttonStyle={{ backgroundColor: "rgba(31,159,162,0.19)", marginTop: 10}}

                                    textStyle={{color: "#1F9FA2"}}
                                    >
                                        
                                    </ButtonTemplate>
                                    
                            </ScrollView>
                        </View>
                   </View> 
                </Modal>
                 
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
    homeSection: {
        rowGap: 10,

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
    clinicSectionContainer: {
        borderTopLeftRadius: 3,
        justifyContent: "center",
        borderTopRightRadius: 3, 
        backgroundColor: "#DC7633",
        paddingTop:2,
    },
    clinicSectionText: {
        color: "white",

        paddingHorizontal: 10,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
    },
    sectionTitleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DC7633",
        paddingHorizontal: 10,
        paddingVertical: 1,
        columnGap: 5,
        borderRadius: 3,
    },
    sectionTitle: {
        color: "white",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
        alignSelf: "flex-end",
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
    headerContainer: {
        backgroundColor: "grey",
        flex: 1
    },
    homePageContainer: {
        
        // tom: 10,
        //
        //
        // paddingBottom: 10,
        marginBottom: 48,
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
    clinicModalHeader: {
        // backgroundColor: "yellow",
        width: "100%",
    },
    clinicModalContainer: {
        flex: 1,
        backgroundColor: "#1F9FA2",
        // padding: 30
    },
    clinicMainContentContainer: {
         
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "rgba(244, 244, 244, 1)",
        flexGrow: 6,
        padding: 20,
        flex: 1,
    },
    clinicUpperContentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,

    },
    clinicDistanceContainer :{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        columnGap: 5
    },
    clinicDistanceText: {
        fontFamily: "Poppins_600SemiBold",
        color: "white",
        fontSize: 14,
        
    },
    clinicName: {
        
        fontFamily: "Poppins_600SemiBold",
        color: "white",
        fontSize: 20,
        textAlign: 'center'
    },
    clinicImageContainer: {
        width: "100%",
        height: 200,
        
        // backgroundColor: "yellow"
    },
    clinicInfoContainer: {
        backgroundColor: "white",
        borderRadius: 3,

    },
    detailsContainer: {
        paddingHorizontal: 18,
        paddingTop: 15,
        rowGap:10,
    },
    detailText: {
        alignSelf: "flex-end",
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
    
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        columnGap: 7,
    },
    rmBottomBorderRadius: {

        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0, 
    },
    clinicReviewsContainer: {
        backgroundColor: "white",
        borderRadius: 3,
        
    },
    reviewCard: {
        maxWidth: 200,
        padding: 10,
        borderRadius: 3,
    },
    reviewsContainer: {
        rowGap: 10,
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    clinicSpecializationsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 4,
        columnGap: 4,
        

    },
    clinicSpecializationText: {
        color: "white",
        paddingVertical: 1,
        paddingHorizontal: 6,
        textAlign: "center",
        alignItems: 'center',
        borderRadius: 3,
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        backgroundColor: "#A569BD"
    },
    reviewName: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,

    },
    reviewComment: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
    },
    starContainer: {
        flexDirection: "row"
        
    },
    expandSectionContainer: {
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: "#ECF0F1"
    },
    expandSectionText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        color: "grey"
    },
    doctorsListContainer: {
        padding: 20,
        
    },
    clinicDoctorsContainer:{
        backgroundColor: "white"
    },
    doctorCard: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 15,
    },
    doctorInfoContainer: {

    },
    
    doctorImage: {
        justifyContent: "center",
        alignItems: 'center',
        height: 80,
        width: 80,
        borderRadius: 75,
        borderColor: "whitesmoke",
        borderWidth: 2,
        overflow: "hidden"
    },
    doctorNameText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12
    },
    doctorInfoText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        lineHeight: 15,
        
        
    }
    

})
