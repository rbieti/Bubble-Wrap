import React, { Component } from "react";
import { View, StyleSheet, Text, Button,TouchableOpacity, Image, ScrollView } from "react-native";
import { PRIMARY_COLOR } from '../constants/style';
export default class Untitled extends Component {
    static navigationOptions = ({ navigation }) => ({
        //tabBarVisible: false,
        title: 'ListOfOffers',
        tabBarLabel: 'ListOfOffers',
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
              <Image
                source={require("../../assets/icon.png")}
                style={styles.image1}
                resizeMode="cover"
              />
              <View style={styles.rect1}>
                <Text style={styles.text1}>
                  John offered: $100,000,000
                </Text>
              </View>
              <View style={styles.rect1}>
                <Text style={styles.text1}>
                  Stacy offered: $15
                </Text>
              </View>
              <View style={styles.rect1}>
                <Text style={styles.text1}>
                  Brian offered: $420
                </Text>
              </View>

              <Image
                source={require("../../assets/icon.png")}
                style={styles.image1}
                resizeMode="cover"
              />
              <View style={styles.rect1}>
                <Text style={styles.text1}>
                  John offered: $100,000,000
                </Text>
              </View>
              <View style={styles.rect1}>
                <Text style={styles.text1}>
                  Stacy offered: $15
                </Text>
              </View>
              <View style={styles.rect1}>
                <Text style={styles.text1}>
                  Brian offered: $420
                </Text>
              </View>
            </ScrollView>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      root: { 
        flex: 1
      },
      image1: {
        left: 0,
        right: 0,
        height: 200,
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