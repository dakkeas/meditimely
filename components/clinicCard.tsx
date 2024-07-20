import { Modal, View, Text, StyleSheet, ImageBackground, Dimensions, Image, Pressable} from "react-native";
import { useState } from "react";
import { withDecay } from "react-native-reanimated";


export default function Clinic({
    imageSource,
    clinicName,
    specialistsCount,
    patientsCount,
    rating,
    locationDistance
}) {
    const [clinicModalVisible, setClinicModalVisible] = useState(false);

    return (
        
        <Pressable onPress={() => setClinicModalVisible(true)} style={[styles.cardContainer, styles.boxShadow]}>
            <View style={[styles.flexContainerRow, {columnGap: 30}]}>
                <View style={[styles.flexContainerRow, {alignContent: "center", justifyContent: "center"}]}>
                    <Image source={imageSource} style={styles.clinicImage}>

                    </Image>

                </View>

                <View style={[styles.flexContainerColumn, {rowGap: 20, paddingTop: 10, paddingRight: 10, paddingBottom: 10}]}>
                    <Text style={{fontSize: 28}}>{clinicName}</Text>

                    <View style={{flex: 1}}>
                        <View style={[styles.flexContainerRow, {columnGap: 10}]}>
                            <View style={[styles.miniInfoTab, {flexGrow: 1.5}]}>
                                {/* mini-info-section-big */}
                                <Text style={styles.infoTabText}>{specialistsCount} Specialists</Text>
                            </View>
                            {/* flex row */}
                            <View style={styles.miniInfoTab}>
                                {/* mini-info-section-small */}
                                <Text style={styles.infoTabText}>{patientsCount} Patients</Text>
                            </View>
                        </View>
                        <View style={[styles.flexContainerRow, {columnGap: 10, marginTop: 5}]}>
                            <View style={styles.miniInfoTab}>
                                <Text style={styles.infoTabText}>{rating} Stars</Text>
                                {/* mini-info-section-small */}
                            </View>
                            {/* flex row */}
                            <View style={[styles.miniInfoTab, { flexGrow: 1.5}]}>
                                <Text style={styles.infoTabText}>{locationDistance} KM away</Text>
                                {/* mini-info-section-big */}
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{marginTop: "auto",alignSelf: "flex-end",fontWeight: "bold", fontSize: 12}}>Learn More</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Modal 
            visible={clinicModalVisible}
            onRequestClose={() => setClinicModalVisible(false)}
            animationType='slide'
            >
                <View style={{padding: 20, display: "flex", justifyContent: "center", alignItems: "center", flex: 1}}>
                    <Text style={{fontSize: 30, fontWeight: "bold"}}>Test Info</Text> 
                    
                </View>
            </Modal>
            
        </Pressable>
        
    )
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height; 
const styles = StyleSheet.create({
    cardContainer: {
        height: 240,
        backgroundColor: "white",
        width: "80%",
        borderRadius: 10,
        padding: 10
        
        
    },

    clinicImage: {
        flex: 1,
        borderRadius: 3,
        
        height: "100%",
        width: "100%",
    },
    miniInfoTab: {
        height: 30,
        flex: 1,
        backgroundColor: 'rgba(31, 159, 162, 0.19)',
        borderRadius: 7,
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
            
        
    },
    clinicTitle: {
        
    },
    infoTabText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1F9FA2',
        
    },
    flexContainerRow: {
       display: 'flex',
       flexDirection: 'row',
       flex: 1,
       
    },
    flexContainerColumn: {
       flexDirection: 'column',
       flex: 1,
        
    },
    boxShadow: {
        shadowColor: '#000',
        elevation: 2,
        
    }


    


    
})
