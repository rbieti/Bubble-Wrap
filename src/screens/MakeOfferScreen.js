import React, { Component } from "react";
import { View, StyleSheet, Text, Button,TouchableOpacity, Image } from "react-native";
import { PRIMARY_COLOR } from '../constants/style';
export default class Untitled extends Component {
    static navigationOptions = ({ navigation }) => ({
        //tabBarVisible: false,
        title: 'MakeOfferScreen',
        tabBarLabel: 'MakeOfferScreen',
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center'
        },
        /*
        headerLeft: (
        
          <Button
          //  navigate={navigation.navigate}
            large
            icon={{ name: 'menu' }}
            backgroundColor={PRIMARY_COLOR}
            onPress={() => navigation.navigate('DrawerOpen')}
          />
         
        ),
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" size={25} color={tintColor} />
        )
        */
      });
     
      //######################
      //ADD YOUR CODE HERE!!!!!
      //######################
      render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.root}>
            <Text style={styles.text1}>
              Make an offer:
            </Text>
            <Text style={styles.text2}>
              $99
            </Text>
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.text3}>
                Message Seller...
              </Text> 
            </TouchableOpacity>
            <Image
	            source={require("../../assets/icon.png")}
              style={styles.image1}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.text3}>Make Offer</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
    const styles = StyleSheet.create({
      root: { 
        backgroundColor: "white",
        flex: 1,
        alignItems: "center"
      },
      text1: {

      },
      text2: {
        fontSize: 50
      },
      rect1: {
        backgroundColor: "blue",
        height: 60
      },
      image1: {
        height: 250,
        width: 400,
        left: 0,
        right: 0
      },
      text3: {
        color: "white",
      },
      button1: {
        backgroundColor: "blue",
        height: 50,
        width: 200,
        left: 0,
        right: 0,
        opacity: 1,
        alignItems: "center",
        justifyContent: "center"
      },





    });