import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import MapView, { Marker } from 'react-native-maps';

export default class CreateItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Handshake',
    tabBarLabel: 'Handshake',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.text}>Waiting for both parties to be present.</Text>
          <Text style={styles.text}>We'll let you know when your Bubble Buddy is nearby so you can continue with your transaction.</Text>
        </View>
        <MapView
          initialRegion={{
            latitude: 34.130075,
            longitude: -117.888359,
            latitudeDelta: 0.0461 * 0.5,    // Controls the scale
            longitudeDelta: 0.02105 * 0.5,  // Controls the scale
          }}
          style={styles.map}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },

  header: {
    width: window.width,
    height: 100,
    backgroundColor: "#3d4756",
    padding: 25,
    paddingLeft: 50,
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
  },

  map: {
    position: "absolute",
    top: 100,
    right: 0,
    bottom: 0,
    left: 0,
  }
});
