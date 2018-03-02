import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Button, Text, TouchableOpacity } from "react-native";
import { navigate }  from "react-navigation";
import { PRIMARY_COLOR } from '../constants/style';
import CreateItemScreen from '../screens/CreateItemScreen';
import EditItemScreen from '../screens/EditItemScreen';
import BuyItemScreen from '../screens/BuyItemScreen';

import Item from '../components/Item';
import User from '../components/User';
import Review from '../components/Review';
import Community from '../components/Community';

export default class ScaffoldingScreen extends Component {
  render() {
    const { navigate } = this.props.navigation; // THIS IS NECESSARY FOR NAVIGATION
    return (
      <View style={styles.root}>
        <ScrollView 
          automaticallyAdjustInsets={true}
          scrollEnabled={true}
          decelerationRate={0.5}
          scrollEventThrottle={16}
          style={styles.scrollArea1}
          contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>

<TouchableOpacity 
           //THIS IS FOR CLASSES! HELP SEND HELP REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
            style={styles.btnOpacity}
            onPress={() => {

            // //new code 
            // var hi1 = Item();
            // //profilePicture userName rating numTransactions bubbleCommunity reviews purchaseHistory sellHistory strikeCount
            
            var u1 = new User();
            var u2 = new User();
            var u3 = new User();

            var reviews = [];
            var purchaseHistory = [];
            var sellHistory = [];

            u1.createUser('blah.png', 'John', 'Doe', 0.00, 1, 'Azusa', reviews, purchaseHistory, sellHistory, 0);
            u2.createUser('blah.png', 'Jane', 'Doe', 0.00, 2, 'Pasadena', reviews, purchaseHistory, sellHistory, 0);
            u3.createUser('blah.png', 'REEEEEEEEEEEE', 'Doe', 0.00, 3, 'GG', reviews, purchaseHistory, sellHistory, 0);

            var com1 = new Community();
            com1.addUser(u1);
            com1.addUser(u2);
            com1.addUser(u3);
            com1.printUsers();
            console.log("reeee");

            }}
            >
            <Text style={styles.btnText}>
              Testing
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('profile')}}
            >
            <Text style={styles.btnText}>
              User Profiles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('seller')}}
            >
            <Text style={styles.btnText}>
              Seller Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('messenger')}}
            >
            <Text style={styles.btnText}>
              Chat Messenger
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('settings')}}
            >
            <Text style={styles.btnText}>
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('campusSafety')}}
            >
            <Text style={styles.btnText}>
              Campus Safety
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('search')}}
            >
            <Text style={styles.btnText}>
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('createItem')}}
            >
            <Text style={styles.btnText}>
              Create Item
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('editItem')}}
            >
            <Text style={styles.btnText}>
              Edit Item
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('buyItem')}}
            >
            <Text style={styles.btnText}>
              Buy Item
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('shakenbake')}}
            >
            <Text style={styles.btnText}>
              Handshake
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('loo')}}
            >
            <Text style={styles.btnText}>
              List of Offers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('soview')}}
            >
            <Text style={styles.btnText}>
              Single Offer View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('mos')}}
            >
            <Text style={styles.btnText}>
              Make Offer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('trans')}}
            >
            <Text style={styles.btnText}>
              Transaction
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const flatColors = [
  '#e67e22', // carrot
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

const styles = StyleSheet.create({
  root: { 
    backgroundColor: 'white', 
    flex: 1
  },

  scrollArea1: {
    backgroundColor: '#f8f8f8',
  },

  btnOpacity: {
    backgroundColor: flatColors[Math.floor(Math.random()*7)], // random color each time
    height: 60,
    width: 180,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  btnText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  }
});
