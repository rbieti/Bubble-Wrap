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

        <View style={styles.offerBox}>
          <Text style={styles.text}>Offer John</Text>
          <Text style={styles.text}>$12.00</Text>
        </View>

        <Image
          source={require("../../assets/478x478-reeses.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.fieldBox}>
          <Text style={styles.text}>Reeses Pieces</Text>
          <Text style={styles.text}>A delicious treat for you and me</Text>
          <Text style={styles.text}>$115.00</Text>
        </View>
        <Text style={styles.buy}>Buy Item</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: { backgroundColor: "#0000ff", flex: 1, flexDirection: "column" },
  offerBox: { 
    flex: 0.10, 
    flexDirection: "row",
    backgroundColor: "rgb(227, 227, 227)",
    alignSelf: "stretch",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    flex: 0.60,
    width: 374.99,
    height: 382.06,
  },
  fieldBox: {
    flex: 0.2,
    backgroundColor: "rgb(215, 215, 215)",
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "space-around",
    alignItems: "stretch",
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 24,
    color: "#000000"
  },
  buy: {
    flex: 0.15,
    backgroundColor: "transparent",
    fontSize: 36,
    color: '#ffffff',
    textAlign: "center"
  },
});
