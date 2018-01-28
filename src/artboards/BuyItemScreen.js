import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import PRIMARY_COLOR from '../constants/style';

export default class BuyItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    title: 'Buy Item',
    tabBarLabel: 'Buy Item',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });
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
        <Text style={styles.text1}>Buy Item</Text>
        <Image
          source={require("../assets/640x478_ac.jpg")}
          style={styles.image1}
        />
        <Text style={styles.text2}>Name</Text>
        <Text style={styles.text3}>Price</Text>
        <Text style={styles.text4}>Description</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: { backgroundColor: PRIMARY_COLOR, flex: 1, flexDirection: "column" },
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
    color: PRIMARY_COLOR
  },
  image1: {
    position: "absolute",
    width: 374.99,
    height: 382.06,
    top: 0,
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
  nameBox: {
    backgroundColor: "transparent",
    top: 300.00,
    left: 29.87,
    position: "absolute",
    fontSize: 24,
    color: "rgba(155,155,155,1)"
  },
  priceBox: {
    top: 325.00,
    left: 29.88,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 24,
    color: "rgba(155,155,155,1)"
  },
  descriptionBox: {
    top: 350.00,
    left: 29.88,
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 24,
    color: "rgba(155,155,155,1)"
  },
  // image2: {
  //   top: 344.66,
  //   left: 412.75,
  //   width: 374.99,
  //   height: 382.06,
  //   position: "absolute"
  // }
});
