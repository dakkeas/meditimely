import { View, 
    Text, 
    StyleSheet, 
    Button, 
    TextInput, 
    Pressable, 
    Platform,
    Switch,
    TouchableOpacity,
    BackHandler,
    
} from "react-native";
import { useNavigation } from "expo-router";
import InputTextTemplate from "@/components/InputTextTemplate";
import ButtonTemplate from "@/components/ButtonTemplate";
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Switch } from 'react-native-switch';
import CheckBox from 'expo-checkbox'


export default function SignUpInfoScreen() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [selectedLanguage, setSelectedLanguage] = useState();
    const navigation = useNavigation();
    // invoke navigation object
    // DateTimePickerAndroid.open(params: AndroidNativeProps)

    const formatDate = (rawDate) => {
        let date = new Date(rawDate)

        let year = date.getFullYear();
        let month = monthNames[date.getMonth()];
        let day = date.getDate();

        return `${day} ${month} ${year}`

    }
    const toggleActive = {
        backgroundColor: 'rgba(31, 159, 162, 0.19)',
        borderColor: "#1F9FA2"
    }
    
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    
    const [dateofBirth, setDateofBirth] = useState(date)
    
    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
        // toggles the showpicker when called
    }
    const [isMale, setisMale] = useState(false);
    
    const onChange = ({ type }, selectedDate) => {
        // function receives event and selected date
        
        if (type == "set") {
            const currentDate = selectedDate
            setDate(currentDate)

            if (Platform.OS === "android") {
                toggleDatePicker();
                setDateofBirth(formatDate(currentDate))

            }
        } else {
            toggleDatePicker
            
        }
    

        
    }
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let us get to know you!</Text>

            <View style={styles.fullNameInputContainer}>
                
                <InputTextTemplate
                placeholder="First name"
                label="First name"
                

                >
                </InputTextTemplate>

                <InputTextTemplate
                placeholder="Last name"
                label="Last name"

                >
                </InputTextTemplate>
                

            </View>


                <Pressable
                onPress={toggleDatePicker}
                style={{
                    // backgroundColor: "yellow",
                }}
                >
                <InputTextTemplate
                placeholder={typeof dateofBirth === "object" ? '28 Sept 2002' : dateofBirth }
                label="Date of Birth"
                value={dateofBirth}
                onChangeText={setDateofBirth}
                editable={false}
                ></InputTextTemplate>
                
                </Pressable>

                {showPicker && (
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={date}
                        onChange={onChange}
                        maximumDate={new Date()}
                    ></DateTimePicker>
                )}
                
                <View >

                    <Text
                    style={{
                        marginBottom: 5,
                        fontFamily: "Poppins_600SemiBold",
                        color: "grey"
                    }}
                    
                    >Sex</Text>
                    <View style={styles.sexToggleContainer}>
                        
                        <TouchableOpacity style={[styles.toggleOption, isMale ? toggleActive : null, {
                            
                            borderTopLeftRadius: 3,
                            borderBottomLeftRadius: 3,
                        }]}

                            onPress={()=> {
                                setisMale(!isMale)
                                
                            }}
                        >
                           <Text style={styles.toggleText}>Male</Text> 
                        </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.toggleOption, !isMale ? toggleActive : null, {
                            borderTopRightRadius: 3,
                            borderBottomRightRadius: 3,
                                
                            }]}
                            onPress={()=> {
                                setisMale(!isMale)
                                
                            }}
                            >
                            <Text style={styles.toggleText}>Female</Text>
                            
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                    style={{
                        marginTop: 5,
                        
                    }}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)
                    }
                    ></CheckBox>
                    <Text style={{fontFamily: "Poppins_400Regular"}}>I have read and accept Meditimely's Terms of Use and Privacy Policy.</Text>
                        
                    
                </View>
                <ButtonTemplate
                title="Continue"
                buttonStyle={{
                    backgroundColor: "#1F9FA2"
                }}
                textStyle={{
                    color: "white",
                }}

                onPress={() => {
                    navigation.navigate('Welcome')
                }}
                ></ButtonTemplate>
                    
        </View>
    )
}




const styles = StyleSheet.create({
    checkboxContainer: {
        marginBottom: 20,
        marginTop: 70,
        columnGap: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row"
    },
    fullNameInputContainer: {
        marginHorizontal: 76,
        marginTop: 20,
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        columnGap: 5
    },
    toggleText: {
        fontFamily: "Poppins_400Regular",
        color: "grey"
    },
    birthDatePicker: {
        // backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center"
        
    },
    container: {
        padding: 30, 

        justifyContent: "center",
        alignContent: "center",

    },
    text: {
        fontSize: 24,
        textAlign: "center"
    },
    toggleOption: {
        height: 50,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        flex: 1,
        borderColor: "grey"
    },
    sexToggleContainer: {
        // marginTop: 30,
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        columnGap: 0.3,
        // alignItems: "center" 
    },
    title: {
        fontSize: 20,
        fontFamily: "Poppins_700Bold"
    },

})
