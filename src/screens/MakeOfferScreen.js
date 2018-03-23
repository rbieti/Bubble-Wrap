import React, { Component } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, Image, TextInput } from "react-native";
import { PRIMARY_COLOR } from '../constants/style';
export default class Untitled extends Component {
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: 'Make an Offer',
    tabBarLabel: 'MakeOfferScreen',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Image
        style={styles.backgroundImage}
        source={require("../../assets/item01.jpg")}
      >
        <View style={styles.root}>
          <View style={styles.topArea}>
            <TextInput
              style={styles.textInput}
              placeholder="$145"
              onChangeText={(text) => this.setState({text})}
            />
            <Text style={styles.text}>Enter your offer for [item name]</Text>
          </View>
          <TouchableOpacity 
            style={styles.offerBtn}
            onPress={() => {console.log("Button pressed")}}
            >
            <Text style={styles.btnText}>Make offer</Text>
          </TouchableOpacity>
       </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height: null,
    width: null,
  },

  root: { 
    flex: 1,
    alignItems: "center",
    opacity: 1.0
  },

  topArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    maxHeight: 100,
    backgroundColor: "transparent"
  },

  textInput: {
    width: "80%",
    backgroundColor: "white",
    textAlign: "center",
    padding: 20,
    marginTop: 100,
  },

  text: {
    width: "100%",
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },

  offerBtn: {
    backgroundColor: "#33a3f3",
    width: "80%",
    height: 100,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    bottom: 60,
  },

  btnText: {

  }
});