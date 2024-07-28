import { Dimensions, StatusBar, Pressable, View, Text, StyleSheet, Button, TextInput, ScrollView } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import React, { Component } from "react";
import ButtonTemplate from "@/components/ButtonTemplate";
import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect, useState } from "react";
const WIDTH = Dimensions.get('window').width;
import Doctors from "../Doctors.json"
import { useNavigation } from "@react-navigation/native";
export default function ScheduleAppointmentScreen({route}) {
    const [selectedStartDate, setSelectedStartDate] = useState(null);

    const navigation = useNavigation();
    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const {clinicObject} = route.params
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";

    const doctorData = Object.values(clinicObject.doctors).map(doctor => ({
        key: doctor.id.toString(),
        value: `${doctor.name}, ${doctor.specialty}`
    }));

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
    
    const [selectedDoctor, setSelectedDoctor] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    

        


    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>

                <StatusBar backgroundColor="#27ccd2"></StatusBar>
                
                <View style={styles.sectionContainer}>

                    <View style={styles.scheduleSectionTextContainer}>
                        <Text style={styles.scheduleSectionText}>Select Date</Text>
                    </View>

                    <View style={styles.calendarContainer}>
                        <CalendarPicker onDateChange={onDateChange}
                            width={WIDTH - 60}
                            selectedDayColor="#FF8A5B"
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
                                            borderRadius: 3,
                                            borderColor: "whitesmoke",
                                        }}
                                        dropdownTextStyles={{
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: 12,
                                        }}
                                        dropdownStyles={{
                                            borderRadius: 3,
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
                                    borderRadius: 3,
                                    borderColor: "whitesmoke",
                                }}
                                dropdownTextStyles={{
                                    fontFamily: "Poppins_400Regular",
                                    fontSize: 12,
                                }}
                                dropdownStyles={{
                                    borderRadius: 3,
                                    borderColor: "whitesmoke",
                                }}
                                inputStyles={{
                                    fontFamily: "Poppins_400Regular",
                                    fontSize: 12,
                                    
                                }}
                                    // setSelected={(val) => setSelected(val)}
                                    data={doctorData}
                                    save="value"
                                />
                                
                            </View>


                            <View style={{ rowGap: 3 }}>
                                <Text style={styles.selectedDateTitle}> NUMBER OF APPOINTMENTS: </Text>
                                <Text style={styles.dateText}>{startDate != "" ? "3" : ""}</Text>
                            </View>
                        </View>


                    </View>
                </View>

                <ButtonTemplate
                    title="Finish Appointment"
                    onPress={()=> {
                        navigation.navigate("Home Screen")
                    }}  
                    buttonStyle={{
                        backgroundColor: "rgba(31,159,162,0.19)"
                    }}
                    textStyle={{
                        color: "#27ccd2"
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
        color:"#27ccd2"
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
        borderRadius: 3,
        
    },
    scheduleSectionTextContainer: {
        borderTopLeftRadius: 3,
        justifyContent: "center",
        borderTopRightRadius: 3,
        backgroundColor: "#F5B041",
        paddingTop: 2,
        
    },
    scheduleSectionText: {
        color: "white",

        paddingHorizontal: 10,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
    },
    selectTimeContainer: {
        padding: 20,
        rowGap: 10,
        // backgroundColor: "yellow"
        // height: 120,
    }


})