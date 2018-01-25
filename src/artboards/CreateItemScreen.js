import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionic";
import { View, StyleSheet, Text, Image } from "react-native";
export default class CreateItemScreen extends Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.rect1} />
        <View style={styles.rect2} />
        <View style={styles.rect3} />
        <View style={styles.rect4}>
          <View style={styles.rect6} />
          <View style={styles.rect7} />
          <View style={styles.rect8} />
        </View>
        <Text style={styles.text1}>Create Offer</Text>
        <Image
          source={require("../assets/640x478_ac.jpg")}
          style={styles.image1}
        />
        <Icon name="ios-camera-outline" size={40} style={styles.icon1} />
        <Icon name="ios-add" size={40} style={styles.icon2} />
        <Text style={styles.text2}>Name</Text>
        <Text style={styles.text3}>Price</Text>
        <Text style={styles.text4}>Description</Text>
        <Image
          style={styles.image2}
          source={require("../assets/640x478_ac.jpg")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1, flexDirection: "column" },
  rect1: { flex: 0.52, backgroundColor: "rgb(227, 227, 227)" },
  rect2: { flex: 0.09, backgroundColor: "rgb(250, 250, 250)" },
  rect3: { flex: 0.09, backgroundColor: "rgb(231, 231, 231)", height: 0 },
  rect4: {
    flex: 0.31,
    backgroundColor: "rgb(253, 253, 253)",
    flexDirection: "column"
  },
  text1: {
    backgroundColor: "transparent",
    left: 85.04,
    position: "absolute",
    fontSize: 40,
    height: 71.83,
    bottom: -8.98,
    color: "rgba(155,155,155,1)"
  },
  image1: {
    position: "absolute",
    width: 374.99,
    height: 382.06,
    top: 37.08,
    left: 0
  },
  icon1: {
    backgroundColor: "transparent",
    top: 433.51,
    left: 100,
    position: "absolute",
    color: "grey",
    fontSize: 50
  },
  icon2: {
    backgroundColor: "transparent",
    top: 434,
    left: 252.83,
    position: "absolute",
    color: "grey",
    fontSize: 50
  },
  rect6: { flex: 0.33, backgroundColor: "rgb(215, 215, 215)" },
  rect7: { flex: 0.33, backgroundColor: "rgb(227, 227, 227)" },
  rect8: { flex: 0.34, backgroundColor: "rgb(232, 232, 232)" },
  text2: {
    backgroundColor: "transparent",
    top: 513.38,
    left: 29.87,
    position: "absolute",
    fontSize: 32,
    color: "rgba(155,155,155,1)"
  },
  text3: {
    top: 589.23,
    left: 29.88,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 32,
    color: "rgba(155,155,155,1)"
  },
  text4: {
    top: 671.33,
    left: 29.88,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 32,
    color: "rgba(155,155,155,1)"
  },
  image2: {
    top: 344.66,
    left: 412.75,
    width: 374.99,
    height: 382.06,
    position: "absolute"
  }
});
