import { StyleSheet, ScrollView, Button, Pressable, Modal, StatusBar, Dimensions, SafeAreaView, Image} from 'react-native';
import {useState} from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Box from "../../components/box";
import Clinic from '@/components/clinicCard';

export default function TabOneScreen() {
  const windowWidth= Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;


  const alvarezClinic = {
    imageSource: require("../../assets/images/clinic_image.jpg"),
    clinicName: "Alvarez Medical Clinic",
    specialistsCount: 4,
    patientsCount: 84,
    rating: 5.0,
    locationDistance: 12
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  // false by default
  // const [variable, function to call] = useState(default value)

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      rowGap: 20,
      justifyContent: 'center',
      paddingLeft: 30,
      paddingRight: 30

    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    topScrollView: {
      width: windowWidth > 500 ? "80%" : "90%",
      height: windowHeight> 500 ? "50%" : "90%",

    }
  });
  ``
  return (
    <ScrollView>
      <View style={[styles.container, {padding: 20, display: "flex", flexDirection: "column", rowGap: 20}]}>
{/*         
        <StatusBar backgroundColor='green' barStyle="dark-content" ></StatusBar>


        <ScrollView style={styles.topScrollView}>

          <View style={styles.container}>
            <Box style={{ backgroundColor: "green" }}>{"hey"}</Box>
            <Box style={{ backgroundColor: "red" }}>Box 1</Box>
            <Box style={{ backgroundColor: "blue" }}>Box 1</Box>
            <Box style={{ backgroundColor: "green" }}>Box 1</Box>
          </View>
          <View style={styles.container}>
            <Text>
              📘 Courses - https://learn.codevolution.dev/

              💖 Support UPI - https://support.codevolution.dev/
              💖 Support Paypal - https://www.paypal.me/Codevolution
              💾 Github - https://github.com/gopinav

              📱 Follow Codevolution
              + Twitter -   / codevolutionweb
              + Facebook -   / codevolutionweb

              📫 Business - codevolution.business@gmail.com

              Scroll View
              React Native Tutorial
              React Native Tutorial for Beginners
              📘 Courses - https://learn.codevolution.dev/

              💖 Support UPI - https://support.codevolution.dev/
              💖 Support Paypal - https://www.paypal.me/Codevolution
              💾 Github - https://github.com/gopinav

              📱 Follow Codevolution
              + Twitter -   / codevolutionweb
              + Facebook -   / codevolutionweb

              📫 Business - codevolution.business@gmail.com

              Scroll View
              React Native Tutorial
              React Native Tutorial for Beginners
              📘 Courses - https://learn.codevolution.dev/

              💖 Support UPI - https://support.codevolution.dev/
              💖 Support Paypal - https://www.paypal.me/Codevolution
              💾 Github - https://github.com/gopinav

              📱 Follow Codevolution
              + Twitter -   / codevolutionweb
              + Facebook -   / codevolutionweb

              📫 Business - codevolution.business@gmail.com

              Scroll View
              React Native Tutorial
              React Native Tutorial for Beginners
              📘 Courses - https://learn.codevolution.dev/

              💖 Support UPI - https://support.codevolution.dev/
              💖 Support Paypal - https://www.paypal.me/Codevolution
              💾 Github - https://github.com/gopinav

              📱 Follow Codevolution
              + Twitter -   / codevolutionweb
              + Facebook -   / codevolutionweb

              📫 Business - codevolution.business@gmail.com

              Scroll View
              React Native Tutorial
              React Native Tutorial for Beginners        📘 Courses - https://learn.codevolution.dev/

              💖 Support UPI - https://support.codevolution.dev/
              💖 Support Paypal - https://www.paypal.me/Codevolution
              💾 Github - https://github.com/gopinav

              📱 Follow Codevolution
              + Twitter -   / codevolutionweb
              + Facebook -   / codevolutionweb

              📫 Business - codevolution.business@gmail.com

              Scroll View
              React Native Tutorial
              React Native Tutorial for Beginners        📘 Courses - https://learn.codevolution.dev/

              💖 Support UPI - https://support.codevolution.dev/
              💖 Support Paypal - https://www.paypal.me/Codevolution
              💾 Github - https://github.com/gopinav

              📱 Follow Codevolution
              + Twitter -   / codevolutionweb
              + Facebook -   / codevolutionweb

              📫 Business - codevolution.business@gmail.com

              Scroll View
              React Native Tutorial
              React Native Tutorial for Beginners
              📘 Courses - https://learn.codevolution.dev/

              💖 Support UPI - https://support.codevolution.dev/
              💖 Support Paypal - https://www.paypal.me/Codevolution
              💾 Github - https://github.com/gopinav

              📱 Follow Codevolution
              + Twitter -   / codevolutionweb
              + Facebook -   / codevolutionweb

              📫 Business - codevolution.business@gmail.com

              Scroll View
              React Native Tutorial
              React Native Tutorial for Beginners        📘 Courses - https://learn.codevolution.dev/

              💖 Support UPI - https://support.codevolution.dev/
              💖 Support Paypal - https://www.paypal.me/Codevolution
              💾 Github - https://github.com/gopinav

              📱 Follow Codevolution
              + Twitter -   / codevolutionweb
              + Facebook -   / codevolutionweb

              📫 Business - codevolution.business@gmail.com

              Scroll View
              React Native Tutorial
              React Native Tutorial for Beginners        📘 Courses - https://learn.codevolution.dev/

              💖 Support UPI - https://support.codevolution.dev/
              💖 Support Paypal - https://www.paypal.me/Codevolution
              💾 Github - https://github.com/gopinav

              📱 Follow Codevolution
              + Twitter -   / codevolutionweb
              + Facebook -   / codevolutionweb

              📫 Business - codevolution.business@gmail.com

              Scroll View
              React Native Tutorial
              React Native Tutorial for Beginners
            </Text>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="app/(tabs)/index.tsx" />

          </View>

        </ScrollView>
        <Button title='example' color="midnightblue" onPress={() => console.log("buttonpress")}></Button>
        <Pressable onLongPress={() => console.log("pressed!")} style={{ height: 100, width: 100, backgroundColor: 'red' }} >
        </Pressable>

        <Button onPress={() => setIsModalVisible(true)} title='example2'></Button>



        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType='slide'
          transparent={true}
        >
          <View style={{ height: 300, width: 300, position: "relative", alignSelf: "center" }}>
            <Text>Modal Content</Text>
            <Button onPress={() => setIsModalVisible(false)} title='Close Modal'></Button>
          </View>

        </Modal> */}






        <Clinic {...alvarezClinic}></Clinic>
        <Clinic {...alvarezClinic}></Clinic>
        <Clinic {...alvarezClinic}></Clinic>
        <Clinic {...alvarezClinic}></Clinic>
        <Clinic {...alvarezClinic}></Clinic>
        <Clinic {...alvarezClinic}></Clinic>

      </View>
    </ScrollView>


    
  );
}

