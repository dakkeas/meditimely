import { Modal, View, Text, StyleSheet, ImageBackground, Dimensions, Image, Pressable} from "react-native";
import { useState } from "react";
import { withDecay } from "react-native-reanimated";


export default function ClinicCard({
    imageSource,
    clinicName,
    specialistsCount,
    patientsCount,
    rating,
    locationDistance,
    clinicLocation
}) {
    const [clinicModalVisible, setClinicModalVisible] = useState(false);

    return (
        
            <View style={[styles.mainCardContainer]}>
                <View style={styles.visualCardContainer}>
                    <View style={styles.clinicImageContainer}>
                        <Image resizeMode= "cover" source={imageSource} style={styles.clinicImage}>

                        </Image>

                    </View>

                    <View style={[styles.clinicInfoContainer]}>

                        <View style={styles.clinicMiniTextContainer}>
                            <View style={[styles.flexContainerRow, { columnGap: 3 }]}>
                                <View style={[styles.miniInfoTab, { flexGrow: 1.5 }]}>
                                    {/* mini-info-section-big */}
                                    <Text style={styles.infoTabText}>{specialistsCount} Specialists</Text>
                                </View>
                                {/* flex row */}
                                <View style={styles.miniInfoTab}>
                                    {/* mini-info-section-small */}
                                    <Text style={styles.infoTabText}>{patientsCount} Patients</Text>
                                </View>
                            </View>
                            <View style={[styles.flexContainerRow, { columnGap: 3, marginTop: 5 }]}>
                                <View style={styles.miniInfoTab}>
                                    <Text style={styles.infoTabText}>{rating} Stars</Text>
                                    {/* mini-info-section-small */}
                                </View>
                                {/* flex row */}
                                <View style={[styles.miniInfoTab, { flexGrow: 1.5 }]}>
                                    <Text style={styles.infoTabText}>{locationDistance} KM away</Text>
                                    {/* mini-info-section-big */}
                                </View>
                            </View>
                            {/* <View style={{flex: 1}}>
                                <Text style={styles.moreInfoText}>Learn More</Text>
                            </View> */}
                        </View>
                    </View>
                    
                </View>
                <View style={styles.clinicNameLocationTextContainer}>
                    
                    <Text style={styles.clinicNameText}>{clinicName}</Text>
                    <Text style={styles.clinicLocationText}>{clinicLocation}</Text>
                </View>
                
            </View>


        
    )
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height; 
const styles = StyleSheet.create({
    moreInfoText: {
        marginTop: "auto",
        alignSelf: "flex-end",
        fontWeight: "bold",
        fontSize: 12,
        color: "orange"
    },
    clinicLocationText: {
        fontSize: 10,
        color:  "#00807f",
        fontFamily: "Poppins_400Regular"

    },
    clinicNameLocationTextContainer: {
        
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingTop: 2,
        flexWrap:"wrap",
        alignItems: "center"
    },
    visualCardContainer: {
        flexDirection: "row",
        flex: 1,
        
        
    },
    mainCardContainer: {
        backgroundColor: "rgba(0,128,127,0.19)",
        borderRadius: 12,
        padding: 8,
        flex: 1,
        maxWidth: 200,
        height: 160,
        rowGap: 3,
    },
    clinicMiniTextContainer: {
        flex: 1,
        
    },
    clinicNameText: {
        fontFamily: "Poppins_600SemiBold",
        // borderRadius: 7,
        color: "#00807f",
        // borderRadius: 12,
        fontSize: 12,
        // backgroundColor: "yellow"
    },
    clinicImage: {
        flex: 1,
        borderRadius: 8,
        height: "100%"

    },
    miniInfoTab: {
        flex: 1,
        // backgroundColor: 'rgba(39,204,210,0.33)',
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        
        // borderRadius: 3,
        display: "flex",
        justifyContent: "center",
        paddingHorizontal: 10,
        alignItems: "center"
        
    },


    infoTabText: {
        fontSize:10,
        textAlign: "center",
        fontFamily: "Poppins_400Regular",
        // color: '#00807f',
        color: "white",
     
    },
    flexContainerRow: {
       flexDirection: 'row',
       flex: 1,

    },
    clinicInfoContainer: {
       flexDirection: 'column',
       flex: 1,
       position: "absolute",
       right: 10,
       bottom: 10,
       rowGap: 5,
    },

    clinicImageContainer: {
       display: 'flex',
       flexDirection: 'row',
       flex: 1,
       justifyContent: "center",
       alignItems: "center"
       
    },
    
    
})
