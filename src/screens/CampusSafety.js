import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from "react-native";
export default class CampusSafety extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Campus Safety',
    tabBarLabel: 'Campus Safety',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.contactInformation}>
          <Text style={styles.contactTxt}> Contact Information: </Text>
          <Text style={styles.contactTxt}> </Text>
          <Text style={styles.contactTxt}> Email: campussafety@apu.edu </Text>
          <Text style={styles.contactTxt}> General Phone #: 626-388-5416 </Text>
          <Text style={styles.contactTxt}> Emergency Phone #: 626-388-5416 </Text>
          <Text style={styles.contactTxt}> </Text>
          <Text style={styles.contactTxt}> For critical emergencies, call 911 </Text>
        </View>

        <Image 
          source={require("../../assets/map_sample.jpg")}
          style={styles.mapImg}
          resizeMode="cover"
        />

        <TouchableOpacity 
          style={styles.btnOpacity}
          onPress={() => {console.log("Button pressed")}}
          >
          <Text style={styles.btnText}>
            Contact Campus Safety
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  root: { 
    backgroundColor: "white", 
    flex: 1,
    alignItems: "center",
  },

  contactInformation: {
    width: window.width,
    backgroundColor: "#3d4756",
    padding: 25,
    paddingLeft: 50,
  },
  contactTxt: {
    color: "#fff",
    fontWeight: "bold",
  },

  mapImg: {
    width: window.width,
    height: window.width,
  },

  btnOpacity: {
    backgroundColor: "#2ecc71", // green
    width: 250,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  }
});
