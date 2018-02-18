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
        <MapView
          initialRegion={{
            latitude: 34.130075,
            longitude: -117.888359,
            latitudeDelta: 0.0461 * 0.5,
            longitudeDelta: 0.02105 * 0.5,
          }}
          style={styles.mapView}
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
  mapView: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
});
