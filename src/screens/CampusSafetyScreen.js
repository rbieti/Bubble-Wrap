import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
export default class Untitled1 extends Component {
  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.text1}>Call</Text>
        </TouchableOpacity>
        <View style={styles.rect1} />
        <View style={styles.rect2} />
        <Text style={styles.text2}>Contact Campus Safety</Text>
        <Text style={styles.text3}>Contact Information</Text>
        <Text style={styles.text4}>Phone Number: (555)555-5555</Text>
        <Image
          source={require("../assets/Screen_Shot_2018-01-19_at_12.08.15_AM.png")}
          style={styles.image1}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1 },
  button1: {
    backgroundColor: "rgba(44,16,229,1)",
    height: 133.46,
    width: 360.84,
    top: 541.07,
    left: 7.08,
    position: "absolute",
    opacity: 1
  },
  text1: {
    top: 32.33,
    left: 124.56,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 70,
    color: "rgba(245,236,236,1)"
  },
  rect1: {
    backgroundColor: "rgb(230, 230, 230)",
    height: 360.84,
    width: 370.23,
    top: 124.9,
    left: 2.88,
    position: "absolute"
  },
  rect2: {
    backgroundColor: "rgb(230, 230, 230)",
    height: 45.84,
    width: 390.04,
    top: 36.25,
    left: -4.43,
    position: "absolute"
  },
  text2: {
    backgroundColor: "transparent",
    top: 55.02,
    left: 98.19,
    position: "absolute"
  },
  text3: {
    backgroundColor: "transparent",
    top: 125.93,
    left: 112.39,
    position: "absolute",
    height: 30.2,
    width: 197.08
  },
  text4: {
    backgroundColor: "transparent",
    top: 179.14,
    left: 21.66,
    position: "absolute"
  },
  image1: {
    position: "absolute",
    width: 405.25,
    height: 242.88,
    top: 227.38,
    left: -2.09
  }
});
