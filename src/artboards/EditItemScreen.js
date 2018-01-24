import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionic";
import { View, StyleSheet, Text, Image } from "react-native";
export default class EditItemScreen extends Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.rect5}>
          <View style={styles.rect6} />
          <View style={styles.rect7} />
          <View style={styles.rect8} />
        </View>
        <View style={styles.rect1} />
        <Text style={styles.text1}>Description</Text>
        <Text style={styles.text2}>Price</Text>
        <View style={styles.rect2} />
        <View style={styles.rect3} />
        <View style={styles.rect4} />
        <View style={styles.rect9} />
        <View style={styles.rect10} />
        <Image
          style={styles.image1}
          source={require("../assets/640x478_ac.jpg")}
        />
        <Icon style={styles.icon1} name="ios-add" size={40} />
        <Text style={styles.text3}>Name</Text>
        <Text style={styles.cYkOOA}>SAVE</Text>
        <Icon style={styles.icon2} name="ios-camera-outline" size={40} />
        <Text style={styles.text4}>Description</Text>
        <Text style={styles.text5}>Price</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1 },
  rect1: { height: 0, flex: 0.16, backgroundColor: "rgb(231, 231, 231)" },
  text1: {
    top: 681.33,
    left: 39.88,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 32,
    color: "rgba(155,155,155,1)",
    height: 30.78
  },
  text2: {
    top: 599.23,
    left: 39.88,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 32,
    color: "rgba(155,155,155,1)",
    height: 30.78
  },
  rect2: { flex: 0.42, backgroundColor: "rgb(232, 232, 232)" },
  rect3: { flex: 0.17, backgroundColor: "rgb(215, 215, 215)" },
  rect4: { flex: 0.52, backgroundColor: "rgb(227, 227, 227)" },
  rect9: { flex: 0.16, backgroundColor: "rgb(250, 250, 250)" },
  rect10: { flex: -0.76, backgroundColor: "rgb(227, 227, 227)" },
  image1: {
    top: 40.67,
    left: 0,
    width: 374.99,
    height: 382.06,
    position: "absolute"
  },
  icon1: {
    top: 438.84,
    left: 258.96,
    position: "absolute",
    backgroundColor: "transparent",
    color: "grey",
    fontSize: 50,
    height: 48.74
  },
  text3: {
    top: 523.38,
    left: 38.54,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 32,
    color: "rgba(155,155,155,1)",
    height: 30.78
  },
  cYkOOA: {
    left: 117.18,
    bottom: 5.13,
    height: 71.83,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 60,
    color: "rgba(155,155,155,1)"
  },
  icon2: {
    top: 437.04,
    left: 89.45,
    position: "absolute",
    backgroundColor: "transparent",
    color: "grey",
    fontSize: 50,
    height: 48.74
  },
  rect5: {
    flex: 0.34,
    flexDirection: "column",
    backgroundColor: "rgb(253, 253, 253)"
  },
  rect6: { flex: 0.33, backgroundColor: "rgb(215, 215, 215)" },
  rect7: { flex: 0.33, backgroundColor: "rgb(227, 227, 227)" },
  rect8: { flex: 0.34, backgroundColor: "rgb(232, 232, 232)" },
  text4: {
    top: 651.83,
    left: 41.13,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 32,
    color: "rgba(155,155,155,1)",
    height: 30.78
  },
  text5: {
    top: 585.11,
    left: 41.13,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 32,
    color: "rgba(155,155,155,1)",
    height: 30.78
  }
});
