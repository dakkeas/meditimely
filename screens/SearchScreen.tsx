import { FlatList, StatusBar, Pressable, View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity} from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import firebaseConfig from "@/firebase_setup";
import {useState, useEffect} from "react"
import CircularLoading from "@/components/CircularLoading";
// import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import ClinicCard from "@/components/clinicCard2";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen({route}) {
    const clinicImage = require('../assets/images/clinic_image3.jpg')

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
    // const {clinicList} = route.params
    const navigation = useNavigation();
    const app = initializeApp(firebaseConfig);
    const [isLoading, setIsLoading] = useState(true)
    const [test, setTest] = useState('')
    const [specialistSelected, setSpecialistSelected] = useState('')
    const db = getDatabase();
    const {useruid} = route.params
    const [clinicRankedList, setClinicRankedList] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [finalClinicList, setFinalClinicList] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const nodeRef = ref(db, 'clinic_test');

    const handleRefresh = () => {
        setRefreshing(true)
        onValue(nodeRef, (snapshot) => {
            const data = snapshot.val();
            const formattedClinicList = Object.keys(data).map((clinicId) => {
                const clinic = data[clinicId];
                return {
                    id: clinicId, // Unique identifier for each clinic
                    distance: clinic.distance,
                    doctors: clinic.doctors,
                    hospitalName: clinic.hospitalName,
                    location: clinic.location,
                    reviews: clinic.reviews,
                    clinicID: clinic.clinic_id
                };

            })

            setFinalClinicList(formattedClinicList)
        })
        setRefreshing(false)

    }

    async function fetchClinicData() {
        try {
            setIsLoading(true)


            await onValue(nodeRef, (snapshot) => {
                const data = snapshot.val();
                // console.log(data)
                // setClinicRankedList(data)
                const formattedClinicList = Object.keys(data).map((clinicId) => {
                    const clinic = data[clinicId];
                    return {
                        id: clinicId, // Unique identifier for each clinic
                        distance: clinic.distance,
                        doctors: clinic.doctors,
                        hospitalName: clinic.hospitalName,
                        location: clinic.location,
                        reviews: clinic.reviews,
                        clinicID: clinic.clinic_id
                    };

                })

                setFinalClinicList(formattedClinicList)
                console.log(finalClinicList)
                console.log('ranked clinic list fetched!')
            });
            setErrorMessage('')
        } catch (error) {
            // console.log(error)
            setErrorMessage("Unable to fetch clinics")
            // setSearchError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        
        const nodeRef = ref(db,`specialistSelected/userWants`)
        const unsubscribe = onValue(nodeRef, (snapshot) =>{
            if (snapshot.exists()) {
                const data = snapshot.val()
                setSpecialistSelected(data.specialistSelected)
                console.log('selected specialist found!')
                fetchClinicData();

                setIsLoading(false)
            } else {
                console.log('selected specialist not found!')
                setIsLoading(false)
            }
            return () => unsubscribe();
        }, (error) => {
            // console.error('Error fetching data: ', error)
            setIsLoading(false)
        })
        return () => unsubscribe();

    }, []);


    if (isLoading) {
        return (
        
            <CircularLoading
            // color="white"
            ></CircularLoading>
        )
    }


    return (
        <View style={styles.container}>
            <StatusBar></StatusBar>
            <Text>{errorMessage}</Text> 
            <View style={styles.mainContainer}>
            
                {/* <Text style={styles.errorMessage}>{errorMessage}</Text> */}
                <FlatList
                showsVerticalScrollIndicator={false}
                onRefresh={handleRefresh}
                refreshing={refreshing}

                ListFooterComponent={<View style={{ height:60 }}></View>}
                data={finalClinicList}
                // keyExtractor={}
                ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
                renderItem={({item}) => {
                   return (
                    <TouchableOpacity
                    
                    onPress={() => {
                        console.log(item.clinicID)
                        navigation.navigate('Home Screen') 
                        // go back to home screen
                    }}
                    >
                        <ClinicCard
                            // style={{width: "100%"}}
                            customStyling={{width: "300"}}
                            imageSource={clinicImage}
                            clinicName={item.hospitalName}
                            specialistsCount={item.doctors.length}
                            patientsCount="0"
                            // rating={getAverageRating(item.reviews)}
                            locationDistance={Math.round(item.distance)}
                            clinicLocation={item.location}
                        
                        ></ClinicCard>
                        
                    </TouchableOpacity>

                    
                   ) 
                }}
                ></FlatList>
                
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    errorMessage: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: "red"
        
    },
    mainContainer: {
        padding: 20,
        
    }
    
})