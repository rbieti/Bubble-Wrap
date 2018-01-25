import React, { Component } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, ScrollView} from "react-native";
import { PRIMARY_COLOR } from '../constants/style';
export default class Untitled extends Component {
    static navigationOptions = ({ navigation }) => ({
        //tabBarVisible: false,
        title: 'HandShakeScreen',
        tabBarLabel: 'HandShakeScreen',
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
          const { navigate } = this.props.navigation; // THIS IS NECESSARY FOR NAVIGATION
        return (
            <ScrollView>
                <View style={styles.root}>
                    <TouchableOpacity style={styles.button1}>
                        <Text style={styles.text1}>Confirm</Text>
                    </TouchableOpacity>
                    <View style={styles.rect1} />
                    <View style={styles.rect2} />
                    <Text style={styles.text2}>Map</Text>
                </View>
            </ScrollView>
        );
      }
    }
    const styles = StyleSheet.create({
      root: { backgroundColor: "white", flex: 1 },
      button1: {
        backgroundColor: "rgba(44,16,229,1)",
        height: 133.46,
        width: 360.84,
        top: 541.07,
        left: 7.08,
        position: "absolute",
        opacity: 1
      },
      text1: {
        top: 32.33,
        flex:1,
        alignItems: 'center',
        position: "absolute",
        backgroundColor: "transparent",
        fontSize: 70,
        color: "rgba(245,236,236,1)"
      },
      rect1: {
        backgroundColor: "rgb(230, 230, 230)",
        height: 360.84,
        width: 370.23,
        top: 124.9,
        left: 2.88,
        position: "absolute"
      },
      rect2: {
        backgroundColor: "rgb(230, 230, 230)",
        height: 45.84,
        width: 390.04,
        top: 36.25,
        left: -4.43,
        position: "absolute"
      },
      text2: {
        backgroundColor: "transparent",
        top: 55.02,
        left: 98.19,
        position: "absolute"
      },
      text3: {
        backgroundColor: "transparent",
        top: 125.93,
        left: 112.39,
        position: "absolute",
        height: 30.2,
        width: 197.08
      },
      text4: {
        backgroundColor: "transparent",
        top: 179.14,
        left: 21.66,
        position: "absolute"
      }
    });