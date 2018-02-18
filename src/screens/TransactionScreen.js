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
        const { navigate } = this.props.navigation;// THIS IS NECESSARY FOR NAVIGATION
        return (
          <View style={styles.root}>
            <ScrollView
            style={styles.scroll1} 
            automaticallyAdjustInsets={true}
            horizontal={false}
            pagingEnabled={false}
            scrollEnabled={true}
            decelerationRate={0.5}
            scrollEventThrottle={16}
            >
            <Text style={styles.confirmPaymentLbl}>Confirming payment to</Text>
            <View style={styles.view001}>
              <Image
                source = {require("../../assets/logo.png")}
                style={styles.image1}
                resizeMode = "cover"
                />
              <Text style={styles.sellerNameLbl}>Seller Name</Text>
            </View>
            <Text style={styles.cost}>$50.00</Text>
            <Image
              source = {require("../../assets/logo.png")}
              style={styles.image2}
              resizeMode = "cover"
              />
              <TouchableOpacity style={styles.checkOutButton}>
                <Text style={styles.checkOutText}>Check out with PayPal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              </ScrollView>
          </View>
        );
      }
    }
    const styles = StyleSheet.create({
      root: { 
        backgroundColor: "white", 
        flex: 1,

      },
      checkOutButton: {
        backgroundColor: "blue",
        height: 50.0,
        width: 320.0,
        //top: 350.07, //541.07
        //left: 20.0,
        justifyContent: 'center',
        alignItems: 'center',

        opacity: 1,

  
      },
      checkOutText: {
        //top: 0.0,
        //left: 10.00,

        backgroundColor: "transparent",
        fontSize: 30,
        color: "rgba(245,236,236,1)",

      },
      cancelButton: {

        backgroundColor: "blue",
        height: 50,
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        opacity: 1
      },
      cancelText: {


        backgroundColor: "transparent",
        fontSize: 30,
        color: "rgba(245,236,236,1)"
      },
      confirmPaymentLbl: {
        
        backgroundColor: "blue",
        fontSize: 30,
        color: "rgba(245,236,236,1)",
      },
      cost: {

        backgroundColor: "transparent",
        fontSize: 50,
        color: "rgba(0,0,0,1)",

      },
      image1:
      {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      },
      image2:
      {
        height: 500,
        width: 500,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      },

      view001:
      {
        height: 100,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#7f7',
        padding: 20,
        justifyContent: 'center'
      },

      sellerNameLbl:
      {
        marginLeft: 20,
        fontSize: 40
      },





      ////////////////////
      rect1: {

        backgroundColor: "rgb(230, 230, 230)",
        height: 360.84,
        width: 370.23,

      },
      rect2: {
        backgroundColor: "rgb(230, 230, 230)",
        height: 45.84,
        width: 390.04,

      },
      text2: {
        backgroundColor: "transparent",

      },
      text3: {
        backgroundColor: "transparent",


        height: 30.2,
        width: 197.08
      },
      text4: {
        backgroundColor: "transparent",

      }
    });