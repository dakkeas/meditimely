import { ScrollView, Image,FlatList, TouchableOpacity, Pressable, View, Text, StyleSheet, Button, TextInput} from "react-native";
import {useState, useEffect } from "react"
import { MaterialIcons } from '@expo/vector-icons';
import { getDatabase, ref, onValue } from "firebase/database";
import { setPersistence } from "firebase/auth";
const doctorProfile = require("../assets/images/doctor_profile.jpg");
import { getAuth} from "firebase/auth";
import CircularLoading from "@/components/CircularLoading";
import {useData} from "../DataContext"
export default function AppointmentScreen({navigation}) {
    const { sharedData, setSharedData } = useData();
    const auth = getAuth();
    const [detailActive, setDetailActive] = useState(0)
    const db = getDatabase();
    
    const [isLoading, setIsLoading] = useState(true)
    const [appointmentsList, setAppointmentsList] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [useruid, setUseruid] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const handleRefresh = () => {
        setRefreshing(true)
        onValue(appointmentsRef, (snapshot) => {
            const data = snapshot.val();
            setAppointmentsList(data)
        })
        setRefreshing(false)

    }

    // update badge counter

    useEffect(() => {
        
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                tabBarBadge: undefined
            })
        })
    })
    
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


    const appointmentsRef = ref(db, `appointments/${useruid}`);
    useEffect(() => {
        
        const unsubscribe = onValue(appointmentsRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setAppointmentsList(data)
                    setIsLoading(false)
                    // console.log(appointmentsList)


                } else {
                    
                    setErrorMessage('Unable to fetch appointments')
                    setIsLoading(false)
                }
            }, (error) => {
                console.error('Error fetching data:', error);
                console.error(error.message);
                setIsLoading(false);
                
            });
        
            // clear cache
            // 
            return () => unsubscribe();


    }, [useruid])

    async function fetchAppointments() { 
        setIsLoading(true)
        try {
            await onValue(appointmentsRef, (snapshot) => {
                const data = snapshot.val();
            });
            
            
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error(error.message);
            setIsLoading(false);

        } finally {
            setIsLoading(false)
        }
    }
    
    if (isLoading) {
        return (
            <CircularLoading></CircularLoading>
        )
    }
    
    const AppointmentCard = ({
        doctorName,
        specialty,
        doctorRating,
        hospitalName,
        time,
        date,
        status,
        
    }) => {
        return (
                <View style={styles.appointmentCardContainer}>
                    <View style={{ rowGap: 10 }}>
                        <View style={styles.doctorImage}>
                            <Image style={{ height: 50, width: 50 }} source={doctorProfile} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.doctorRatingContainer}>
                            {/* <Text>Stars</Text>  */}
                            <MaterialIcons name="star" size={16} color="#FFD700" />
                            <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#00807f", fontSize: 12, }}>{doctorRating}</Text>
                        </View>
                    </View>
                    <View style={styles.doctorInformationContainer}>
                        <Text style={styles.clinicBookedText}>{hospitalName}</Text>
                        <Text style={styles.doctorNameText}>{doctorName}</Text>
                        <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                            <Text style={styles.specializationText}>{specialty}</Text>
                        </View>
                        <View style={styles.bookingInformationContainer}>
                            <Text style={{ color: "#00807f", fontFamily: "Poppins_400Regular", fontSize: 12, }}>Date: </Text>
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                <Text style={styles.bookingStatusText}>{date}</Text>
                            </View>
                        </View>
                        <View style={styles.bookingInformationContainer}>
                            <Text style={{ color: "#00807f", fontFamily: "Poppins_400Regular", fontSize: 12, }}>Time: </Text>
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                <Text style={styles.bookingStatusText}>{time}</Text>
                            </View>
                        </View>
                        <View style={styles.bookingInformationContainer}>
                            <Text style={{ color: "#00807f", fontFamily: "Poppins_400Regular", fontSize: 12, }}>Status: </Text>
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                <Text style={styles.bookingStatusText}>{status}</Text>
                            </View>
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start", marginLeft: "auto" }}>
                                <Text style={styles.rateText}>RATE</Text>
                            </View>
                        </View>

                    </View>

                </View>

        )
    }
        
    const Booked = () => {
        return (
            <View>
                <FlatList>
                    
                </FlatList>
            </View>
        )
    }
    
    const renderDetailContent = (tab) => {
        switch (tab) {
            case 0:
                return (
                    <Booked
                    ></Booked>
                )
            case 1:
                return (
                    <CompletedBookings
                    ></CompletedBookings>
                )
        }
    }
        // const appoinmentsExistText = () => {

        //     if (appointmentsList.length == undefined) {
        //         return (
        //             <Text style={styles.appointmentsExistText}>You have no current appointments</Text>
        //         )
        //         return null
        //     }
        // }
    

    return (
        <View style={styles.container}>
            <Button title="as" onPress={() => console.log(appointmentsList)}></Button>
            <View style={styles.appointmentsTabContainer}>
                <TouchableOpacity style={[styles.detailTabButton, detailActive === 0 ? styles.tabActive : null, { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }]}
                    onPress={() => setDetailActive(0)}
                >
                    <Text style={[styles.detailTabButtonText, detailActive === 0 ? { color: "white" } : null]}>Booked</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.detailTabButton, detailActive === 1 ? styles.tabActive : null]}
                    onPress={() => setDetailActive(1)}
                >
                    <Text style={[styles.detailTabButtonText, detailActive === 1 ? { color: "white" } : null]}>Completed</Text>
                </TouchableOpacity>
            </View>



                <FlatList
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={{ height: 85 }}></View>}
                    data={Object.values(appointmentsList)}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
                    renderItem={({ item }) => {
                        return (

                            <TouchableOpacity>
                                <AppointmentCard


                                    doctorName={item.doctorName}
                                    specialty={item.doctorSpecialty}
                                    doctorRating={item.doctorRating}
                                    hospitalName={item.hospitalName}
                                    time={item.time}
                                    date={item.date}
                                    status={item.status}
                                ></AppointmentCard>
                            </TouchableOpacity>
                        )
                    }}
                ></FlatList>

            
                
        </View>

    )
}


const styles = StyleSheet.create({
    rateText: {
        
        color: "white",
        paddingVertical: 1,
        paddingHorizontal: 18,
        alignItems: 'center',
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        borderRadius: 12,
        backgroundColor: "#00807f",
    },
    bookingStatusText: {
        paddingVertical: 1,
        paddingHorizontal: 6,
        alignItems: 'center',
        borderRadius: 12,
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        color: "#F5B041"
    },
    bookingInformationContainer: {
        marginTop: 8,
        flexDirection: "row",
    },
    specializationText: {
        color: "white",
        paddingVertical: 1,
        paddingHorizontal: 6,
        alignItems: 'center',
        borderRadius: 12,
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        backgroundColor: "#A569BD"
    },
    doctorSpecialtyText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        color: "#00807f"
    },
    doctorNameText: {
        
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "#00807f"
    },
    clinicBookedText: {
        fontFamily: "Poppins_600SemiBold",
        color: "#00807f"

    },
    doctorInformationContainer: {
        // rowGap: 2,
        flex: 1,
    },
    doctorRatingContainer: {
        flexDirection: "row",
        columnGap: 5,
        justifyContent: "center"
    },
    appointmentCardContainer: {
        padding: 10,
        flexDirection: "row",
        columnGap: 10,
        backgroundColor: "white",
        // borderWidth: 1,
        // borderColor: '#00807f',
        borderRadius: 12,
        // borderWidth: 1,
        // borderColor: "#00807f",
        paddingHorizontal: 20,
        
    },
    bookingsContainer: {
        rowGap: 10,
        borderRadius: 3,
        
        padding: 10,
    },
    appointmentsTabContainer: {
        flexDirection: 'row',
        // backgroundColor: "white",
        columnGap: 5,
        
    },
    container: {
        // backgroundColor: "white",
        rowGap: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        
    },
    putMiddle: {
        
        justifyContent: "center",
        alignItems: 'center'
    },
    detailTabButtonText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
        color: "#FF8A5B"
    },
    detailsTabContainer: {
        flexDirection: "row",
        flex: 1,
        columnGap: 15,

    },
    detailTabButton: {
        flex: 1,
        height: 30,
        backgroundColor: "rgba(236,116,66,0.12)",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    tabActive: {
        backgroundColor: "#fe8b5c",

        borderRadius: 12,    
    },
    doctorImage: {
        borderWidth: 1,
        borderColor: "#00807f",
        justifyContent: "center",
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 75,
        overflow: "hidden"
    },
    
    appointmentsExistText: {
        fontFamily: "Poppins_600SemiBold",
        textAlign: "center",
        fontSize: 14,
        marginTop: 10,

    }
    


})