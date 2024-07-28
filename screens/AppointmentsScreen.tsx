import { Image,FlatList, TouchableOpacity, Pressable, View, Text, StyleSheet, Button, TextInput} from "react-native";
import {useState, useEffect } from "react"
import { MaterialIcons } from '@expo/vector-icons';

const doctorProfile = require("../assets/images/doctor_profile.jpg");
export default function AppointmentScreen() {
    const [detailActive, setDetailActive] = useState(0)
    
    
    const AppointmentCard = () => {
        return (
            <View style={styles.appointmentCardContainer}>
                <View style={{rowGap: 10}}>
                    <View style={styles.doctorImage}>
                        <Image style={{ height: 70, width: 70 }} source={doctorProfile} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.doctorRatingContainer}>
                        {/* <Text>Stars</Text>  */}
                        <MaterialIcons name="star" size={16} color="#FFD700" />
                        <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#27ccd2", fontSize: 12,}}>4.8</Text>
                    </View>
                </View>
                <View style={styles.doctorInformationContainer}>
                    <Text style={styles.clinicBookedText}>Alvarez Medical Center</Text>
                    <Text style={styles.doctorNameText}>Dr. Rodger Struck</Text>
                    <View style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
                        <Text style={styles.specializationText}>Cardiologist</Text>
                    </View>
                    <View style={styles.bookingStatusContainer}>
                        <Text style={{ color: "#27ccd2", fontFamily: "Poppins_400Regular", fontSize: 12,}}>Status: </Text>
                        <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                            <Text style={styles.bookingStatusText}>PENDING</Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", marginLeft: "auto"}}>
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

    return (
        <View style={styles.container}>
            <View style={styles.appointmentsTabContainer}>
                <TouchableOpacity style={[styles.detailTabButton, detailActive === 0 ? styles.tabActive : null, { borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }]}
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
            <View style={styles.bookingsContainer}>
                <TouchableOpacity>
                    <AppointmentCard></AppointmentCard>
                </TouchableOpacity>
                <TouchableOpacity>
                    <AppointmentCard></AppointmentCard>
                </TouchableOpacity>
                <TouchableOpacity>
                    <AppointmentCard></AppointmentCard>
                </TouchableOpacity>
                <TouchableOpacity>
                    <AppointmentCard></AppointmentCard>
                </TouchableOpacity>
                {/* {
                <TouchableOpacity>
                    <AppointmentCard></AppointmentCard>
                </TouchableOpacity>
                    renderDetailContent(detailActive)
                }
                 */}
            </View>
            
                
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
        backgroundColor: "#52BE80"
    },
    bookingStatusText: {
        paddingVertical: 1,
        paddingHorizontal: 6,
        alignItems: 'center',
        borderRadius: 3,
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        color: "#F5B041"
    },
    bookingStatusContainer: {
        marginTop: 8,
        flexDirection: "row",
    },
    specializationText: {
        color: "white",
        paddingVertical: 1,
        paddingHorizontal: 6,
        alignItems: 'center',
        borderRadius: 3,
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        backgroundColor: "#A569BD"
    },
    doctorSpecialtyText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        color: "#27ccd2"
    },
    doctorNameText: {
        
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "#27ccd2"
    },
    clinicBookedText: {
        fontFamily: "Poppins_600SemiBold",
        color: "#27ccd2"

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
        backgroundColor: "rgba(31,159,162,0.19)",
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: "#27ccd2",
        paddingHorizontal: 20,
        
    },
    bookingsContainer: {
        rowGap: 10,
        borderRadius: 3,
        backgroundColor: "white",
        // height: 100,
        padding: 10,
    },
    appointmentsTabContainer: {
        flexDirection: 'row',
        // backgroundColor: "white",
        
    },
    container: {
        rowGap: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        
    },
    detailTabButtonText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
        color: "#FF8A5B"
    },
    detailsTabContainer: {
        flexDirection: "row",
        flex: 1,
        columnGap: 5,

    },
    detailTabButton: {
        flex: 1,
        height: 30,
        backgroundColor: "#FEF5E7",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    tabActive: {
        backgroundColor: "#DC7633",

        borderRadius: 3,
    },
    doctorImage: {
        justifyContent: "center",
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 75,
        overflow: "hidden"
    },


})