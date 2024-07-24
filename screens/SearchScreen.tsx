import { Pressable, View, Text, StyleSheet, Button, TextInput, ScrollView} from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState } from "react";
import firebaseConfig from "@/firebase_setup";

const app = initializeApp(firebaseConfig);

function readData() {
    const db = getDatabase();
    const starCountRef = ref(db, 'clinics/0');

    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
    });
}

export default function SearchScreen() {

    const [test, setTest] = useState('')

    return (
        <View style={styles.container}>
            <Button
            onPress={()=>{
                readData()
            }}
            title="Fetch"
            >
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
    
})