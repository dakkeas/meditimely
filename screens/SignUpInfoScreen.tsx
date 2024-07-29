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
    ActivityIndicator,
    SafeAreaView

    
} from "react-native";
import { useNavigation } from "expo-router";
import InputTextTemplate from "@/components/InputTextTemplate";
import ButtonTemplate from "@/components/ButtonTemplate";
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Switch } from 'react-native-switch';
import CheckBox from 'expo-checkbox'
import { checkEmpty } from "@/auth";
import { emailValidation } from "@/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase_setup";
import CircularLoading from "@/components/CircularLoading";


export default function SignUpInfoScreen({ route }) {

    // destructure data from signup screen
    const { email } = route.params
    const { password } = route.params
    
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const navigation = useNavigation();


    const formatDate = (rawDate) => {
        let date = new Date(rawDate)

        let year = date.getFullYear();
        let month = monthNames[date.getMonth()];
        let day = date.getDate();

        return `${day} ${month} ${year}`

    }

    const toggleActive = {
        backgroundColor: 'rgba(31, 159, 162, 0.19)',
        borderColor: "#00807f"
    }
    

    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [dateofBirth, setDateofBirth] = useState(date)
    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
        // toggles the showpicker when called
    }
    
    const [errorMessage, setErrorMessage] = useState("")
    
    const [firstName, setFirstName] = useState('Justine')
    const [lastName, setLastName] = useState('Daquis')
    const [age, setAge] = useState('')
    const [isMale, setisMale] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    
    const [isLoading, setIsLoading] = useState(false);

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
    
    // firebase authentication
    function signUpUser(email, password, fname, lname, dob, sex) {  
    }

    const database = getDatabase();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();


    
    if (isLoading) {
        return (
            <CircularLoading></CircularLoading>
        )
    }
    return (
        <View style={styles.container}>
        
        
            <Text style={styles.title}>Let us get to know you!</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>

            <View style={styles.fullNameInputContainer}>
                
                <InputTextTemplate
                placeholder="First name"
                label="First name"
                value = {firstName}
                onChangeText = {setFirstName}

                >
                </InputTextTemplate>

                <InputTextTemplate
                placeholder="Last name"
                label="Last name"
                value = {lastName}
                onChangeText = {setLastName}

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
                placeholder={typeof dateofBirth === "object" ? '28 Sept 2002' : formatDate(dateofBirth)}
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
                            
                            borderTopLeftRadius: 12,
                            borderBottomLeftRadius: 12,
                        }]}

                            onPress={()=> {
                                setisMale(!isMale)
                                
                            }}
                        >
                           <Text style={styles.toggleText}>Male</Text> 
                        </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.toggleOption, !isMale ? toggleActive : null, {
                            borderTopRightRadius: 12,
                            borderBottomRightRadius: 12,
                            // borderLeftWidth: 0,
                                
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
                    color="#00807f"
                    style={{
                        marginTop: 5,
                        color: "red" 
                    }}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)
                    }
                    ></CheckBox>
                    <Text style={{fontFamily: "Poppins_400Regular"}}>I have read and accept Meditimely's Terms of Use and Privacy Policy.</Text>
                        
                    
                </View>
                <ButtonTemplate
                title="Sign Up"
                buttonStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: "#00807f",
                }}
                textStyle={{
                    color: "#00807f",
                }}

                onPress={() => {

                    switch (true) {
                        case checkEmpty(firstName): 
                            setErrorMessage("Empty first name!")
                            break
                        case checkEmpty(lastName): 
                            setErrorMessage("Empty last name!")
                            break
                        case !toggleCheckBox:
                            setErrorMessage('Please check the box to agree to the Terms and Conditions')
                            break

                        default:
                            setIsLoading(true)
                            console.log('signing uppp')
                            createUserWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    // Signed up 
                                    console.log('signed up complete')
                                    const user = userCredential.user;
                                    // ...

                                    // write user credentials under their unique uid to firebase!
                                    // adjust database ref

                                    set(ref(database, 'users/' + user.uid + '/userInfo'), {
                                        fname: firstName,
                                        lname: lastName,
                                        email: email,
                                        dob: formatDate(dateofBirth),
                                        sex: isMale ? 'M' : "F",
                                        last_login: Date.now(),

                                    }).then(() => {
                                        
                                        navigation.navigate('Landing')
                                        setIsLoading(false)
                                    })

                                })
                                .catch((error) => {
                                    setIsLoading(false)

                                    console.log("failed!")
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    console.log(error.code)
                                    console.log(error.message)
                                    setErrorMessage(errorCode)
                                });


                    }




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
        // marginTop: 20,
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
    errorMessage: {
        fontFamily: "Poppins_600SemiBold",
        color: "red",
        
    },

})
