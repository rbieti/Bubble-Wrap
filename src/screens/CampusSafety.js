import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
export default class CampusSafety extends Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.rect1} />
        <Text style={styles.text2}>Call</Text>
        <View style={styles.rect2} />
        <Text style={styles.text1}>Campus Safety</Text>
        <View style={styles.rect3} />
        <Text style={styles.text3}>Campus Safety Info</Text>
        <Text style={styles.text4}>Location: </Text>
        <Text style={styles.text5}>Phone Number:555-555-5555</Text>
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
  text1: {
    backgroundColor: "transparent",
    top: 51.71,
    left: 19.44,
    position: "absolute",
    height: 70.92,
    width: 336.12,
    fontSize: 30,
    textAlign: "center"
  },
  rect1: {
    backgroundColor: "rgba(10,46,243,1)",
    height: 128.97,
    width: 329.53,
    top: 583.45,
    left: 18.6,
    position: "absolute",
    opacity: 1
  },
  text2: {
    backgroundColor: "transparent",
    top: 620.38,
    left: 60.84,
    position: "absolute",
    height: 31.34,
    width: 245.06,
    fontSize: 50,
    textAlign: "center",
    color: "rgba(255,255,255,1)"
  },
  rect2: {
    backgroundColor: "rgb(230, 230, 230)",
    height: 55.09,
    width: 377.03,
    top: 41.15,
    left: 0.29,
    position: "absolute"
  },
  rect3: {
    backgroundColor: "rgb(230, 230, 230)",
    height: 374.39,
    width: 380.96,
    top: 142.75,
    left: 0.1,
    position: "absolute"
  },
  text3: {
    backgroundColor: "transparent",
    top: 165.2,
    left: 93.44,
    position: "absolute",
    fontSize: 23
  },
  text4: {
    backgroundColor: "transparent",
    top: 211.38,
    left: 20,
    position: "absolute"
  },
  text5: {
    top: 239.85,
    left: 20,
    position: "absolute",
    backgroundColor: "transparent"
  },
  image1: {
    position: "absolute",
    width: 380.26,
    height: 234.53,
    top: 282.32,
    left: -7.92
  }
});
