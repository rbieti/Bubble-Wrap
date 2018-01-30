import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Button, Text, TouchableOpacity } from "react-native";import { navigate }  from "react-navigation";
import { PRIMARY_COLOR } from '../constants/style';
import TestScreen from '../screens/TestScreen';
import CreateItemScreen from '../artboards/CreateItemScreen';
import EditItemScreen from '../artboards/EditItemScreen';
import BuyItemScreen from '../artboards/BuyItemScreen';

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
            style={styles.btnOpacity}
            onPress={() => {navigate('search')}}
            >
            <Text style={styles.btnText}>
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {navigate('searchRes')}}
            >
            <Text style={styles.btnText}>
              Search Results
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
            onPress={() => {navigate('profile')}}
            >
            <Text style={styles.btnText}>
              User Profile
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
