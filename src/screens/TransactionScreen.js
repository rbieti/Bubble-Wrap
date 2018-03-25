import React, { Component } from "react";
import { View, StyleSheet, Text, Button,TouchableOpacity, Image, ScrollView} from "react-native";
import { PRIMARY_COLOR } from '../constants/style';
export default class Untitled extends Component {
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: 'Transaction',
    tabBarLabel: 'Transaction',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });
    
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.root}>
        <View style={styles.mainView}> 
          <View style={styles.headerView}>
            <View style={styles.horizontalText}>
              <Text style={styles.headerTxt}>Confirm payment to </Text>
              <Text style={styles.sellerNameTxt}>Kyle Nakamura</Text> 
            </View>
            <Text style={styles.priceTxt}>$50.00</Text>
            <Text style={styles.itemTxt}>Canon T5i DSLR w/ 18-55 lens</Text> 
          </View>

          <Image style={styles.itemImg} source={require("../../assets/item01.jpg")}/>

          <View style={styles.buttonsView}>
            <TouchableOpacity style={styles.btnOpacity} onPress={() => {console.log("Button pressed")}}>
              <Text style={styles.btnText}>Confirm Transaction</Text>
            </TouchableOpacity>
            <Text style={styles.orTxt}>or</Text> 
            <TouchableOpacity style={styles.btnOpacity} onPress={() => {console.log("Button pressed")}}>
              <Text style={styles.btnText}>Checkout with PayPal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  root: { 
    
  },

  mainView: {
    position: 'relative',
    height: "100%",
    width: "100%",
    flex: 1,
  },

  /* Header Area */
  headerView: {
    width: window.width,
    height: 135,
  },
  horizontalText: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  headerTxt: {
    fontSize: 20,
  },
  sellerNameTxt: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  priceTxt: {
    width: "100%",
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemTxt: {
    width: "100%",
    textAlign: 'center',
    marginBottom: 20,
  },
  /* End: Header Area */

  itemImg: {
    width: window.width,
    height: window.width,
    marginBottom: 20,
  },

  buttonsView: {
    flex: 1,
    alignItems: 'center',
  },

  btnOpacity: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 70,
    width: "80%",
    backgroundColor: "#33a3f3",
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },

  orTxt: {
    marginTop: 10,
    marginBottom: 10,
  }
});