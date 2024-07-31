import { Dimensions, StatusBar, Pressable, View, Text, StyleSheet, Button, TextInput, ScrollView, Alert} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import React, { Component } from "react";
import ButtonTemplate from "@/components/ButtonTemplate";
import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect, useState } from "react";
const WIDTH = Dimensions.get('window').width;
import Doctors from "../Doctors.json"
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, set } from "firebase/database";
import CircularLoading from "@/components/CircularLoading";
import { checkEmpty } from "@/auth";

export default function ScheduleAppointmentScreen({route}) {
    
    // initialize database
    const db = getDatabase();
    

    const [selectedDoctorID, setSelectedDoctorId] = useState('')
    
    const [selectedDoctor, setSelectedDoctor] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [selectedStartDate, setSelectedStartDate] = useState('');



    const navigation = useNavigation();
    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };


    
    const {clinicObject} = route.params
    const {clinicId} = route.params
    const {useruid} = route.params

    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
     
    // map doctors for drop down format
    
    const doctorData = Object.keys(clinicObject.doctors).map(doctorID => ({
        key: doctorID,
        value: `${clinicObject.doctors[doctorID].name}, ${clinicObject.doctors[doctorID].specialty}`
    }));

    // const doctorDataObject = Object.values(clinicObject.doctors).reduce((acc, doctor) => {
    //     acc[doctor.id] = `${doctor.name}, ${doctor.specialty}`;
    //     return acc;
    // }, {});

    
    const doctorObject = Object.fromEntries(
        Object.values(clinicObject.doctors).map(item => [item.id, item])
    );
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    function formatDate(rawDate) {
        return `${rawDate.getDate()} ${months[rawDate.getMonth()]} ${rawDate.getFullYear()}`
    }
    
    


    const timeData = 
        [
            "09:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "01:00 PM",
            "02:00 PM",
            "03:00 PM",
            "04:00 PM",
            "05:00 PM"
        ]
    
    

    
    const [isLoading, setIsLoading] = useState(false)
    
        
    const [errorMessage, setErrorMessage] = useState("")
    
    

    if (isLoading) {
        return (
            <CircularLoading></CircularLoading>
        )
    }


    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>

                <StatusBar backgroundColor="#00807f"></StatusBar>
                 
                 <Button title='debug button' onPress={() => {

                 }}></Button>
                 
                <View style={styles.sectionContainer}>

                    <View style={styles.scheduleSectionTextContainer}>
                        <Text style={styles.scheduleSectionText}>Select Date</Text>
                    </View>

                    <View style={styles.calendarContainer}>
                        <CalendarPicker onDateChange={onDateChange}
                            width={WIDTH - 60}
                            selectedDayColor="#fe8b5c"
                            selectedDayTextColor="white"
                            textStyle={{
                                fontFamily: "Poppins_400Regular"

                            }}
                        />
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.scheduleSectionTextContainer}>
                        <Text style={styles.scheduleSectionText}>Booking Info</Text>
                    </View>

                    <View style={styles.selectTimeContainer}>

                        {/* <Text style={styles.selectTimeTitle}>Schdule an appointment below</Text> */}
                        <View style={{ flex: 0, rowGap: 5 }}>
                            <View style={{ rowGap: 3 }}>
                                <Text style={styles.selectedDateTitle}> SELECTED DATE: </Text>
                                <Text style={styles.dateText}>{startDate.split(" ").splice(0, 3).join(' ')}</Text>
                            </View>
                            <View style={{ rowGap: 3 }}>
                                <View style={{ rowGap: 3 }}>
                                    <Text style={styles.selectedDateTitle}> SELECTED TIME: </Text>
                                    <SelectList
                                        setSelected={(val) => setSelectedTime(val)}
                                        searchPlaceholder="Search"
                                        placeholder="Select Time"
                                        boxStyles={{
                                            borderRadius: 12,
                                            borderColor: "whitesmoke",
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: 12,
                                        }}
                                        dropdownStyles={{
                                            borderRadius: 12,
                                            borderColor: "whitesmoke",
                                        }}
                                        inputStyles={{
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: 12,

                                        }}
                                        // setSelected={(val) => setSelected(val)}
                                        data={timeData}
                                        save="value"
                                    />

                                </View>
                                
                            </View>
                            <View style={{ rowGap: 3 }}>
                                <Text style={styles.selectedDateTitle}> DOCTOR: </Text>
                                <SelectList
                                setSelected={(val) => setSelectedDoctor(val)} 
                                searchPlaceholder="Search"
                                placeholder="Select Doctor"
                                boxStyles={{
                                    borderRadius: 12,
                                    borderColor: "whitesmoke",
                                }}
                                dropdownTextStyles={{
                                    fontFamily: "Poppins_400Regular",
                                    fontSize: 12,
                                }}
                                dropdownStyles={{
                                    borderRadius: 12,
                                    borderColor: "whitesmoke",
                                }}
                                inputStyles={{
                                    fontFamily: "Poppins_400Regular",
                                    fontSize: 12,
                                    
                                }}
                                    // setSelected={(val) => setSelected(val)}
                                    data={doctorData}
                                    save="key"
                                />
                                
                            </View>


                            <View style={{ rowGap: 3 }}>
                                <Text style={styles.selectedDateTitle}> NUMBER OF APPOINTMENTS: </Text>
                                <Text style={styles.dateText}>{startDate != "" ? "3" : ""}</Text>
                            </View>
                        <Text style={styles.errorMessage}>{errorMessage ? errorMessage : ""}</Text>
                        </View>


                    </View>
                </View>


                <ButtonTemplate
                    title="Finish Appointment"
                    onPress={()=> {

                        // console.log(selectedDoctor)
                        // console.log(doctorDataObject[selectedDoctor])
                        switch(true) {
                            case checkEmpty(selectedStartDate):
                                setErrorMessage('No date is selected')
                                break
                            case checkEmpty(selectedTime):
                                setErrorMessage('No time is selected')
                                break
                            case checkEmpty(selectedDoctor):
                                setErrorMessage('No doctor is selected')
                                break
                            default:
                                console.log("booking...")
                                
                                setErrorMessage('')
                                writeAppointment()
                                async function writeAppointment() {
                                    setIsLoading(true)
                                    try {
                                        // doctor id
                                        // 

                                        const id = Date.now();
                                        await set(ref(db, 'appointments/' + `${useruid}/` + id), {
                                            clinicID: clinicObject.id,
                                            doctorID: selectedDoctor,
                                            doctorName: clinicObject.doctors[selectedDoctor].name,
                                            doctorRating: clinicObject.doctors[selectedDoctor].rating,
                                            doctorSpecialty: clinicObject.doctors[selectedDoctor].specialty,
                                            hospitalName: clinicObject.hospitalName,
                                            date: selectedTime,
                                            time: formatDate(selectedStartDate),
                                            status: "PENDING",

                                        })


                                        // setIsLoading(false) 
                                    } catch (error) {
                                        // setIsLoading(false) 
                                        console.error('Error writing document: ', error)
                                        setErrorMessage('Failed to book appointment')

                                    } finally {
                                        setIsLoading(false);

                                    }
                                }

                                navigation.navigate('Home Screen')
                                
                                Alert.alert('Booking Complete', `You have successfully created your appointment with ${clinicObject.doctors[selectedDoctor].name} at ${clinicObject.hospitalName}`)

                        }
                        
                    }}  
                    buttonStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: "#00807f",
                    }}
                    textStyle={{
                        color: "#00807f"
                    }}
                ></ButtonTemplate>
            </View>
            
        </ScrollView>

    );
}




const styles = StyleSheet.create({
    dateText: {
        fontSize: 12,
        
        fontFamily: "Poppins_400Regular"
    },
    selectedDateTitle: {
        color: "white",
        // textAlign: "center",
        borderRadius: 3,
        fontSize: 10,
        // flexGrow: 0,
        // width: 180,
        fontFamily: 'Poppins_600SemiBold',
        // backgroundColor: "rgba(31,159,162,0.19)",
        color:"#00807f"
    },
    selectTimeTitle: {
        fontFamily: "Poppins_600SemiBold",

        
    },
    container: {
        backgroundColor: "rgba(244, 244, 244, 1)",
        flex: 1,
        padding: 20,
        rowGap: 10,
        marginBottom: 40,
    },
    calendarContainer: {
        backgroundColor: "white",
        paddingVertical: 20,
        
    },
    sectionContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        
    },
    scheduleSectionTextContainer: {
        borderTopLeftRadius: 12,
        justifyContent: "center",
        borderTopRightRadius: 12,
        backgroundColor: "#fe8b5c",
        paddingTop: 2,
        
    },
    scheduleSectionText: {
        color: "white",

        paddingHorizontal: 12,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
    },
    selectTimeContainer: {
        padding: 20,
        rowGap: 10,
        // backgroundColor: "yellow"
        // height: 120,
    },

    errorMessage: {
        fontFamily: "Poppins_600SemiBold",
        color: "red",

    },

})