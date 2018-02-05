import React, { Component } from "react";
import { View, StyleSheet, Text, Button,TouchableOpacity, Image, ScrollView} from "react-native";
import { PRIMARY_COLOR } from '../constants/style';
export default class Untitled extends Component {
    static navigationOptions = ({ navigation }) => ({
        //tabBarVisible: false,
        title: 'Payments Screen',
        tabBarLabel: 'Payments Screen',
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
            <ScrollView 
              style={styles.scroll1} 
              automaticallyAdjustInsets={true}
              horizontal={false}
              pagingEnabled={false}
              scrollEnabled={true}
              decelerationRate={0.5}
              scrollEventThrottle={16}
            >
              <Text style={styles.text1}>
                Waiting for Handshake...
              </Text>
              <Text style={styles.text1}>
                Both parties must accept the transaction to continue.
              </Text>
              <Image
                source={require("../../assets/icon.png")}
                style={styles.image1}
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.btnOpacity}
                onPress={() => { 
                    paymentRequest.show().then(paymentResponse => { 
                    const { transactionIdentifier, serializedPaymentData } = paymentResponse.details;
                    return fetch('...', {
                        method: 'POST',
                        body: {
                        transactionIdentifier,
                        serializedPaymentData
                        }
                    })
                    .then(res => res.json())
                    .then(console.log("It worked!"))
                    .catch(console.log("It failed!"))
                    }); 
                    }}
                    >
                    <Text style={styles.btnText}>
                        User Profile
                    </Text>
                </TouchableOpacity>
            </ScrollView>
          </View>
        );
      }
    }
    global.PaymentRequest = require('react-native-payments').PaymentRequest;
    const styles = StyleSheet.create({
      root: { 
        flex: 1
      },
      button1: {
        backgroundColor: "#fff",
        height: 100,
        width: 300,
        marginBottom: 50,
        opacity: 1
      },
      image1: {
        left: 0,
        right: 0,
        height: 300,
        backgroundColor:"#fff"
      },
      text1: {
        
      },
      scroll1: {

      },
      rect1: {
        height: 50,
        backgroundColor: "#fff",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        justifyContent: 'center',
        paddingLeft: 12
      }
    });
    const METHOD_DATA = [{
        supportedMethods: ['apple-pay'],
        data: {
          merchantIdentifier: 'merchant.com.your-app.namespace',
          supportedNetworks: ['visa', 'mastercard', 'amex'],
          countryCode: 'US',
          currencyCode: 'USD'
        }
      }];
      const DETAILS = {
        id: 'basic-example',
        displayItems: [
          {
            label: 'Movie Ticket',
            amount: { currency: 'USD', value: '15.00' }
          }
        ],
        total: {
          label: 'Merchant Name',
          amount: { currency: 'USD', value: '15.00' }
        }
      };
      const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
      const OPTIONS = {
        requestPayerName: true,
        requestPayerPhone: true,
        requestPayerEmail: true
      };