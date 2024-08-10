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
    Alert,
    
} from "react-native";
// import { SearchBar } from "react-native-elements";
import Feather from '@expo/vector-icons/Feather';

import { SearchBar } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from '@react-navigation/native';
import ClinicCard from "@/components/clinicCard";
import { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import specialistList from "../specialistList.json";
import ButtonTemplate from "@/components/ButtonTemplate";
import Reviews from "../Reviews.json"
import { jsiConfigureProps, setShouldAnimateExitingForTag } from "react-native-reanimated/lib/typescript/reanimated2/core";
import firebaseConfig from "@/firebase_setup";
import { initializeApp } from "firebase/app";
import { child, getDatabase, ref, set, onValue, get} from "firebase/database";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { getAuth, signOut} from "firebase/auth";
import CircularLoading from "@/components/CircularLoading";
import MapBox from "@/components/MapBox";
import { useData } from "../DataContext"
import filter from "lodash.filter"

// import MapTemplate from "@/components/MapTemplate";
// firebase setup
const app = initializeApp(firebaseConfig);
// const WIDTH = Dimensions.get('window').width;
const db = getDatabase();
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const doctor = require("../assets/images/doctor3.jpg")
// components
const clinicImage = require('../assets/images/clinic_image3.jpg')
const clinicImage2 = require('../assets/images/clinic_image2.jpg')
const clinicImage3 = require('../assets/images/clinic_image3.jpg')


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

const ClinicDetails = ({
    clinicDataObject, setisClinicModalVisible
}) => {
    const navigation = useNavigation();

    const specialties = new Set(Object.values(clinicDataObject.doctors).map(doctor => doctor.specialty));
    return(
        <View style={styles.clinicInfoContainer}>
            <View style={styles.clinicSectionContainer}>
                <Text style={styles.clinicSectionText}>Details</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <MaterialIcons name="medical-information" size={20} color="#fe8b5c" />

                    <View style={[styles.clinicSpecializationsRow, { width: WIDTH - 90 }]}>
                        {
                            Array.from(specialties).map((specialty, index) => (
                            <Text key={index} style={styles.clinicSpecializationText}>{specialty}</Text>
                            ))

                        }
                        {/* <Text style={styles.clinicSpecializationText}>Cardiologist</Text>
                        <Text style={styles.clinicSpecializationText}>Dentist</Text>
                        <Text style={styles.clinicSpecializationText}>ENT</Text>
                        <Text style={styles.clinicSpecializationText}>Pulmonologist</Text>
                        <Text style={styles.clinicSpecializationText}>Immunologist</Text> */}
                    </View>
                </View>
                <View style={styles.detailRow}>
                    <MaterialIcons name="local-phone" size={20} color="#fe8b5c" />
                    <Text style={styles.detailText}>+639164137270</Text>
                </View>

                <View style={styles.detailRow}>
                    <MaterialIcons name="email" size={20} color="#fe8b5c" />
                    <Text style={styles.detailText}>alvarexhospitalmedical@gmail.com</Text>
                </View>
                <View style={styles.detailRow}>
                    <MaterialIcons name="location-city" size={20} color="#fe8b5c" />
                    <Text style={styles.detailText}>{clinicDataObject.location}</Text>
                </View>

                {/* <ButtonTemplate
                                                title="Open in Maps"
                                                buttonStyle={{ backgroundColor: "rgba(0,128,127,0.19)", height: 40 }}
                                            textStyle={{ color: "#00807f" }}
                                            ></ButtonTemplate> */}

                    
                    <View style={styles.mapContainer}>
                        <MapBox></MapBox>
                        
                        <TouchableOpacity style={styles.openMaps}
                        onPress={()=> {
                            navigation.navigate('Map');
                            setisClinicModalVisible(false);
                        }}
                        >
                            <Feather name="external-link" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                <TouchableOpacity
                >
                    <View style={styles.expandSectionContainer}>
                        <Text style={styles.expandSectionText}>View All</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>

    )
}

const DoctorsDetails = ({
    clinicDataObject
}) => {

    const doctorProfile = require("../assets/images/doctor_profile.jpg");
    return (
        <View style={styles.clinicDoctorsContainer}>
            <View style={styles.clinicSectionContainer}>
                <Text style={styles.clinicSectionText}>Doctors</Text>
            </View>
            <View style={styles.doctorsListContainer}>

                <FlatList
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                    scrollEnabled={false}
                    data={clinicDataObject.doctors}
                    renderItem={({ item }) => {


                        // const image = require(item.image)
                        return (
                            <TouchableOpacity 
                            onPress={()=> {
                                

                            }}

                            >
                                <View style={styles.doctorCard}>
                                    <View style={styles.doctorImage}>

                                        <Image source={doctorProfile} style={{ height: 70, width: 70 }} resizeMode="cover"></Image>
                                    </View>
                                    <View style={styles.doctorInfoContainer}>

                                        <Text style={styles.doctorNameText}>{item.name}</Text>
                                        <View>
                                            <Text style={[styles.clinicSpecializationText]}>{item.specialty}</Text>
                                        </View>
                                        <Text style={styles.doctorInfoText}>{item.experience}</Text>
                                        <View style={{ alignItems: "flex-start", flexDirection: "row", columnGap: 5 }}>{<MaterialIcons name="star" size={12} color="#FFD700" />}<Text style={styles.doctorInfoText}>{item.rating}</Text></View>

                                        <Text style={styles.doctorInfoText}>{item.testimonies} Reviews</Text>



                                    </View>
                                    <View style={{ alignSelf: "center", marginLeft: "auto"}}>

                                        <MaterialIcons name="arrow-forward-ios" size={12} color="grey" />
                                    </View>
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

    )
}

const ClinicReviews = ({
    clinicDataObject
}) => {
    return (
        <View style={styles.clinicReviewsContainer}>

            <View style={styles.clinicSectionContainer}>
                <Text style={styles.clinicSectionText}>Reviews</Text>
            </View>
            <View style={styles.reviewsContainer}>
                <FlatList
                    horizontal
                    data={clinicDataObject.reviews}

                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.reviewCard}>
                                <Text style={[styles.reviewName]}>{item.name}</Text>
                                {StarRating(item.rating)}
                                <Text style={[styles.reviewComment]}>{item.comment}</Text>
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
    )
}


const SpecialistBox = ({
    specialist,
    iconColor,
    iconName,
    selectedStyle

}) => {
    return (
        <View style={[styles.specialistBox, selectedStyle]} >
            <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
            <Text style={styles.specialistText}>{specialist}</Text>
        </View>

    )
}


export default function HomeScreen({ route}) {
    const { sharedData, setSharedData } = useData();

    // set notification badge

    useEffect(() => {
        
        const unsubscribe = navigation.addListener('focus', () => {
            
        })
    })
    const specialistActive = {
        // color that sticks when a specialist is selected
    }
    const navigation = useNavigation();

    const [search, updateSearch] = useState('')
    // invoke navigation object
    const [specialistSelected, setSpecialistSelected] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [isClinicModalVisible, setisClinicModalVisible] = useState(false)

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

    const [detailActive, setDetailActive] = useState(0)
    const [clinicList, setClinicList] = useState("")


    async function fetchClinicData() {
        try{
            setIsLoading(true)

            const nodeRef = ref(db, 'clinics');

            await onValue(nodeRef, (snapshot) => {
                const data = snapshot.val();
                setClinicList(data)
            });
            
            console.log('clinic list fetched!')
        } catch (error) {
            console.log(error)
            setErrorMessage(error)
            setSearchError(error)
        } finally {
            setIsLoading(false)
        }
    }


    function getAverageRating(reviews) {
        let totalSum = 0
        let totalRatings = 0

        if (reviews) {
            Object.values(reviews).forEach(star => {
                totalSum += star.rating
                totalRatings++
            })
        }

        return totalRatings != 0 ? Math.round(totalSum / totalRatings) : 0
    }


    
    useEffect(()=>{
        // display clinics when home page mounts
        fetchClinicData(db, 'clinics')
        
    }, [])
    

    // CLINIC MODAL VARIABLES
    const [selectedClinicModalID, setSelectedClinicModalID] = useState('')
    const [clinicModalObject, setClinicModalObject] = useState({})
    const renderDetailContent = (tab) => {
        switch (tab) {
            case 0:
                return (
                    <ClinicDetails
                        clinicDataObject={clinicModalObject}
                        setisClinicModalVisible={setisClinicModalVisible}
                    ></ClinicDetails>
                )
            case 1:
                return (
                    <DoctorsDetails
                        clinicDataObject={clinicModalObject}
                    ></DoctorsDetails>
                )

            case 2:
                return (
                    <ClinicReviews
                        clinicDataObject={clinicModalObject}
                    ></ClinicReviews>
                )
        }
    }


    
    
    if (isLoading) {
        return (
            <CircularLoading></CircularLoading>
        )
    }



    const auth = getAuth();

    useEffect(
    // removes default function of back button
        () =>
            navigation.addListener('beforeRemove', (e) => {
                // if (!hasUnsavedChanges) {
                //     // If we don't have unsaved changes, then we don't need to do anything
                //     return;
                // }
                // // Prevent default behavior of leaving the screen
                e.preventDefault();
                // Prompt the user before leaving the screen
            }),
        [navigation]
    );
    

    // obtaining user unique id
    const [useruid, setUseruid] = useState('')
    const userRef = ref(db, 'users/' + useruid + '/userInfo');
    const [userFirstName, setUserFirstName] = useState('Guest')
    const [userLastName, setUserLastName] = useState('Guest')
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setUseruid(user.uid);
        } else {
            // setError('No user op in');
            console.error('No user logged in')
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (useruid) {
            const userRef = ref(db, `users/${useruid}/userInfo`);

            const unsubscribe = onValue(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserData(data);
                    setUserFirstName(data.fname || 'Guest');
                    setUserLastName(data.lname || 'Guest');
                    setIsLoading(false);
                } else {
                    console.error('User data not found');
                    setIsLoading(false);
                }
            }, (error) => {
                console.error('Error fetching data:', error);
                console.error(error.message);
                setIsLoading(false);
            });

            // Cleanup listener on component unmount
            return () => unsubscribe();
        }
    }, [useruid]);

    useEffect(() => {
        if (!isLoading && userData) {
            navigation.setOptions({
                header: () => (
                    <View style={styles.homeHeader}>
                        <View style={[styles.container, { flexDirection: "row", columnGap: 10 }]}>
                            <MaterialIcons name="account-circle" size={30} color="white" />
                            <Text style={styles.headerGreetText}>Welcome back, {userFirstName} {userLastName}</Text>
                        </View>
                    </View>
                ),
            });
        }
    }, [userData, isLoading]);

        

    const [refreshing, setRefreshing] = useState(false);

   function handleRefresh() {
        setRefreshing(true)
        fetchClinicData()
        setRefreshing(false)
        
   } 
   
   
   const formattedClinicList = Object.keys(clinicList).map((clinicId) => {
       const clinic = clinicList[clinicId];
       return {
           id: clinicId, // Unique identifier for each clinic
           distance: clinic.distance,
           doctors: clinic.doctors,
           hospitalName: clinic.hospitalName,
           location: clinic.location,
           reviews: clinic.reviews
       };
    
   })
   
   
   const [noOfAppointments, setNoOfAppointments] = useState(undefined)
    async function fetchNoAppointments() {
        const appointmentsRef = ref(db, `appointments/${useruid}`);
        try {
            await onValue(appointmentsRef, (snapshot) => 
                {
                const data = snapshot.val();
                setNoOfAppointments(Object.keys(data).length)
                //
            });


        } catch (error) {
            console.error('Error fetching data:', error);
            console.error(error.message);

        } finally {
            // console.log('done!')
        }
    }


    useEffect(() => {
        setData(formattedClinicList)
        setFullData(formattedClinicList)
        const unsubscribe = navigation.addListener('focus', () => {
            setSharedData(noOfAppointments)
            
            fetchNoAppointments()
            
        })

    }, [useruid])

    const [searchQuery, setSearchQuery] = useState('')

    const [data, setData] = useState([])
    const [fullData, setFullData] = useState([])
    const [searchError, setSearchError] = useState(null)
    
    const handleSearch = (query) => {
        // console.log(ry)
        setSearchQuery(query);

        const formattedQuery = query.toLowerCase();

        
        const filteredData = filter(fullData , (clinic) => {
            return contains(clinic, formattedQuery)
            
        })
        setData(filteredData)
        
    }
    
    const contains = ({hospitalName, location}, query) => {
        
        // setSearchData(formattedClinicList)
        if (query.length == 0) {
            return false
            
        } else if (hospitalName.toLowerCase().includes(query)) {
            // console.log(hospitalName)
            // console.log(query)
             
            return true
        } 
        return false 
    };


    return (
            <View style={styles.homePageContainer}>
            <StatusBar backgroundColor="#00807f"></StatusBar>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >   
                
                    <View style={{rowGap: 10}}>

                        <View
                            style={styles.searchBarContainer}
                        >
                            <TouchableOpacity
                                onPress={() => {

                                    
                                }}
                                style={styles.searchContainer}
                            >
                                <View style={styles.searchBarIcon}>
                                    <MaterialIcons name="search" size={22} color="grey" />
                                </View>
                                <TextInput
                                    placeholder="Search for clinics"
                                    style={styles.searchBar}
                                    autoCorrect={false}
                                    clearButtonMode="always"
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                    // editable={false }
                                    
                                ></TextInput>
                            </TouchableOpacity>


                            <TouchableOpacity

                            >
                                
                                <View style={styles.filterIcon}>
                                    <MaterialIcons name="filter-list" size={25} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    <View style={styles.searchResultsContainer}>

                        <FlatList
                            scrollEnabled={false}
                            data={data}
                            ItemSeparatorComponent={() => <View style={{ borderWidth: 0.2, borderColor: 'grey'}}></View>}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log('clicked!')
                                            setisClinicModalVisible(!isClinicModalVisible)
                                            setSelectedClinicModalID(item.id)

                                            // console.log(clinicModalIndex)
                                            setClinicModalObject(item)
                                        }}
                                    >
                                        <View style={[styles.searchResultTextContainer, {borderRadius: 0}]}>
                                            <Text style={styles.searchResultTitle}>{item.hospitalName}</Text>
                                            <Text style={styles.searchResultLocation}>{item.location}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        >
                        </FlatList>

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
                                            // on press of specialist
                                            
                                            setSpecialistSelected(item.name)
                                            navigation.navigate('Search', {
                                                useruid: useruid,
                                                clinicList: formattedClinicList
                                            })
                                            
                                            writeSpecialistSelected(specialistSelected)
                                            async function writeSpecialistSelected(specialistSelected) {
                                                try { 
                                                    setIsLoading(true)
                                                    await set(ref(db, `specialistSelected/`), {
                                                        userWants: specialistSelected,
                                                        hospitalList: ""
                                                    })
                                                        
                                                } catch (error) {
                                                    console.error('Error writing document: ', error)
                                                    setErrorMessage('Failed to book appointment')
                                                    

                                                } finally {
                                                    setIsLoading(false)

                                                }
                                            }
                                            
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
                                //  keyExtractor={(item, index) => item.id.toString()}
                                 >
                                 </FlatList>

                            </ScrollView>
                        </View>
                        <View style={styles.homeSection}>
                        <View style={[styles.sectionTextRowContainer]}>
                            <View style={[styles.sectionTitleContainer, { backgroundColor: "#fe8b5c" }]}>
                                    <View style={{ alignSelf: "center" }}>
                                        <MaterialIcons name="near-me" size={14} color="white" />

                                    </View>
                                    <Text style={styles.sectionTitle}>Clinics Near You</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.sectionInfoText}>Filter</Text>
                                </TouchableOpacity>

                            </View>
                                 <FlatList
                                 
                                 data={formattedClinicList}
                                 initialNumToRender={2}
                                 horizontal
                                 showsHorizontalScrollIndicator={false}
                                 ItemSeparatorComponent={() => <View style={{width: 10}}></View>}
                                 renderItem={({item, index})=> {
                                    return (
                                        <TouchableOpacity
                                        
                                            onPress={() => {
                                                // console.log(index)
                                                setisClinicModalVisible(!isClinicModalVisible)
                                                setSelectedClinicModalID(item.id)
                                                setClinicModalObject(item)
                                                
                                            }}
                                        >
                                            <ClinicCard
                                                imageSource={clinicImage}
                                                // customStyling={{maxWidth: 200}}
                                                clinicName= {item.hospitalName}
                                                specialistsCount= {item.doctors.length}
                                                patientsCount="0"
                                                rating={getAverageRating(item.reviews)}
                                                locationDistance={Math.round(item.distance)}
                                                clinicLocation ={item.location}
                                            ></ClinicCard>

                                        </TouchableOpacity> 
                                    )
                                    
                                 }}
                                 ></FlatList>
                                 

                            <TouchableOpacity>
                                <View style={[styles.expandSectionContainer, {marginBottom: -10}]}>
                                    <Text style={styles.expandSectionText}>See More</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    <View style={[styles.homeSection, {marginBottom: 10


                    }]}>
                        <View style={styles.sectionTextRowContainer}>
                            <View style={[styles.sectionTitleContainer, { backgroundColor: "#fe8b5c"}]}>
                                <View style={{ alignSelf: "center" }}>
                                    <MaterialIcons name="stars" size={14} color="white" />

                                </View>
                                <Text style={[styles.sectionTitle, {}]}>Popular Clinics</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.sectionInfoText}>Filter</Text>
                            </TouchableOpacity>

                        </View>
                        <FlatList


                            refreshing = {refreshing}
                            onRefresh={handleRefresh}
                            data={formattedClinicList}
                            initialNumToRender={2}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
                            // keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setisClinicModalVisible(!isClinicModalVisible)
                                            setSelectedClinicModalID(item.id)
                                            
                                            // console.log(clinicModalIndex)
                                            setClinicModalObject(item)

                                        }}
                                    >
                                        <ClinicCard
                                            imageSource={clinicImage}
                                            clinicName={item.hospitalName}
                                            specialistsCount={item.doctors.length}
                                            patientsCount="0"
                                            rating={getAverageRating(item.reviews)}
                                            locationDistance={Math.round(item.distance)}
                                            clinicLocation={item.location}
                                        ></ClinicCard>

                                    </TouchableOpacity>
                                )

                            }}
                        ></FlatList>


                        <TouchableOpacity>
                            <View style={[styles.expandSectionContainer, { marginBottom: -10 }]}>
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
                presentationStyle="fullscreen"
                style={{
                    backgroundColor: "yellow"
                }}


                
                >
                <ScrollView
                    showsVerticalScrollIndicator={false}
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
                                
                                <Text style={styles.clinicName}>{clinicModalObject.hospitalName}</Text>
                                <View style={styles.clinicDistanceContainer}>
                                    <MaterialIcons name="location-on" size={20}color="white" />
                                    <Text style={styles.clinicDistanceText}>{Math.round(clinicModalObject.distance)} KM</Text>
                                </View>
                            </View>
                        </View>
                                    

                            <View style={styles.clinicMainContentContainer}>

                                        <View style={[styles.clinicImageContainer, {marginBottom: 15,}]}>
                                            <FlatList
                                            scrollEnabled={true}
                                                data={images}
                                                horizontal
                                                snapToAlignment="start"
                                                pagingEnabled
                                                decelerationRate={"normal"}
                                                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <Image source={item.source} style={{ height: "100%", width: WIDTH - 40, flex: 1, borderRadius: 24}}></Image>

                                                    )
                                                }}
                                            >

                                            </FlatList>
                                        </View>
                                    <View style={{rowGap: 15, flex: 1}}>
                                        <View style={styles.detailsTabContainer}>
                                            <TouchableOpacity style={[styles.detailTabButton, detailActive === 0 ? styles.tabActive : null, {borderTopLeftRadius: 12, borderBottomLeftRadius: 12} ]}
                                            onPress={() => setDetailActive(0)}

                                            >
                                            <Text style={[styles.detailTabButtonText, detailActive === 0 ? { color: "white" } : null]}>Details</Text>
                                            </TouchableOpacity>
                                        <TouchableOpacity style={[styles.detailTabButton, detailActive === 1 ? styles.tabActive : null]}
                                            onPress={() => setDetailActive(1)}
                                            >
                                            <Text style={[styles.detailTabButtonText, detailActive === 1 ? { color: "white" } : null]}>Doctors</Text>
                                            </TouchableOpacity>
                                        <TouchableOpacity style={[styles.detailTabButton, detailActive === 2 ? styles.tabActive : null, { borderTopRightRadius: 12, borderBottomRightRadius: 12 }]}
                                            onPress={() => setDetailActive(2)}
                                            >
                                                <Text style={[styles.detailTabButtonText, detailActive === 2 ? {color: "white"} : null]}>Reviews</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flex: 1,}}>
                                            
                                            {
                                            renderDetailContent(detailActive)
                                            }
                                        </View>

                                    </View>



                            <ButtonTemplate
                                title="Book an Appointment"
                                buttonStyle={{
                                    backgroundColor: 'transparent',
                                    borderWidth: 1,
                                    borderColor: "#00807f",
                                    marginTop: 10 }}
                                onPress={() => {
                                    
                                    navigation.navigate('Schedule', {
                                        clinicObject: clinicModalObject,
                                        clinicId: selectedClinicModalID,
                                        useruid: useruid,
                                        
                                    })
                                    setisClinicModalVisible(!isClinicModalVisible)
                                }}

                                textStyle={{ color: "#00807f" }}
                            >

                            </ButtonTemplate>      
                            </View>

                   </View> 
                        </ScrollView>
                </Modal>
                
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
        color: "#fe8b5c"
    },
    sectionTextRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    specialistText: {
        color: "darkgrey",  
        fontFamily: "Poppins_400Regular",
        fontSize:10,
        textAlign: "center",
    },
    homeSection: {
        rowGap: 10,

        padding: 12,
        // marginTop: 15,
        borderRadius: 12,
        backgroundColor: "white",
    },
    specialistBox: {
        // borderWidth: 2,
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 12,
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
        borderTopLeftRadius: 12,
        justifyContent: "center",
        borderTopRightRadius: 12, 
        backgroundColor: "#fe8b5c",
        paddingTop:2,
    },
    clinicSectionText: {
        color: "white",

        paddingHorizontal: 12,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
    },
    sectionTitleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fe8b5c",
        paddingHorizontal: 10,
        paddingVertical: 1,
        columnGap: 5,
        borderRadius: 12,
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
        borderRadius: 12,
        backgroundColor: "white",
    },
    searchBarIcon: {
        alignSelf: "center",
        padding: 12,
        
    },
    filterIcon: {
        backgroundColor: "#fe8b5c",
        borderRadius: 12,
        marginRight: 1,
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
        paddingHorizontal: 20,
        paddingTop:20,
        // backgroundColor: "yellow",
        width: "100%",
    },
    clinicModalContainer: {
        backgroundColor: "#00807f",
        // height: HEIGHT,
       
        
        
        // backgroundColor: "yellow",
        // backgroundColor: "yellow"
        // padding: 30k
        
        
    },
    clinicTitleContainer:{
        paddingVertical: 20,
    },
    clinicMainContentContainer: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    clinicUpperContentContainer: {
        flexShrink: 0, // Ensure this child does not shrink beyond its content size
        flexGrow: 0, // Prevent this child from growing beyond its content size
        
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
        // backgroundColor: "white",
        backgroundColor: "#F8F9F9",

        borderRadius: 12,
        flex: 1,
        
    },
    detailsContainer: {
        flex: 1,
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
        backgroundColor: "#F8F9F9",
        flex: 1,
        borderRadius: 12,
        
    },
    reviewCard: {
        maxWidth: 200,
        padding: 10,
        borderRadius: 12,
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
        alignItems: 'center',
        borderRadius: 12,
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
        borderRadius: 12,
        backgroundColor: "#F8F9F9"
    },
    doctorCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        
        columnGap: 10,
    },
    doctorInfoContainer: {
        flexWrap: "wrap",
        
        alignItems: "flex-start"
        
        

    },
    doctorImage: {
        justifyContent: "center",
        alignItems: 'center',
        height: 70,
        width: 70,
        borderRadius: 75,
        // borderColor: "#fe8b5c",
        // borderWidth: 2,
        overflow: "hidden"
    },
    detailsTabContainer: {
        flexDirection: "row",
        flex: 1,
        columnGap: 5,
        
    },
    detailTabButtonText: {
        fontFamily: "Poppins_600SemiBold",
        color: "#fe8b5c",
        fontSize: 12,
    },
    detailTabButton: {
        flex: 1,
        height: 30,
        backgroundColor: "rgba(236,116,66,0.1)",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    doctorNameText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12
    },
    doctorInfoText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        lineHeight: 17,
    },
    tabActive: {
        backgroundColor: "#fe8b5c",
        
        borderRadius: 12,
    },
    headerGreetText: {
        paddingTop: 5,
        color: "white",
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        alignSelf: 'flex-end'
    },
    homeHeader: {
        height: 60,
        backgroundColor: "#00807f",
        // flex: 0,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: 19
    },
    mapContainer: {
        overflow: 'hidden',
        height: 180,
        flex: 1,
        borderRadius: 12,
    },
    openMaps: {
        position: "absolute",
        right: 10,
        top: 10,

    },
    searchResultsContainer: {
        marginTop: -5,
        
        // marginHorizontal: 10,
    },
    

    searchResultTextContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 3,
    },
    searchResultTitle: {
        fontFamily: "Poppins_400Regular",
    },
    searchResultLocation: {
        fontFamily: "Poppins_400Regular",
        color: "grey",
        fontSize: 10,
        marginTop: -5
        
    }
    

})

    
