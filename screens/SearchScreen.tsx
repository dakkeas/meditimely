import { StatusBar, Pressable, View, Text, StyleSheet, Button, TextInput, ScrollView} from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import firebaseConfig from "@/firebase_setup";
import {useState, useEffect} from "react"
import CircularLoading from "@/components/CircularLoading";

export default function SearchScreen({route}) {
    const app = initializeApp(firebaseConfig);
    const [isLoading, setIsLoading] = useState(true)
    const [test, setTest] = useState('')
    const [specialistSelected, setSpecialistSelected] = useState('')
    const db = getDatabase();
    const {useruid} = route.params
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        
        const nodeRef = ref(db,`specialistSelected/userWants`)
        const unsubscribe = onValue(nodeRef, (snapshot) =>{
            if (snapshot.exists()) {
                const data = snapshot.val()
                setSpecialistSelected(data.specialistSelected)
                setIsLoading(false)
                console.log('selected specialist found!')
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
    
    useEffect(()=> {
        const nodeRef = ref(db,`specialistSelected/hospitalList`)
        const unsubscribe = onValue(nodeRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                if (data.length > 1) {
                    console.log('clinic can load')
                } else {
                    
                   setErrorMessage('Please try again later.')
                   console.log('clinics wont load!')
                }
                    
                // setSpecialistSelected(data.specialistSelected)
                setIsLoading(false)
            } else {
                console.log('clinics wont load!')
                setErrorMessage('Please try again later.')
                setIsLoading(false)
            }
            return () => unsubscribe();
        }, (error) => {
            // console.error('Error fetching data: ', error)
            setIsLoading(false)
        })
        return () => unsubscribe();

        
    }, [specialistSelected])

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
            <View style={styles.mainContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                
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