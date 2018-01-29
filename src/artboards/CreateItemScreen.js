import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

export default class CreateItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: 'Create Item',
    tabBarLabel: 'Create',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });
  render() {
    return (
      // <ScrollView 
      //   //style={styles.scroll1} 
      //   automaticallyAdjustInsets={true}
      //   horizontal={false}
      //   pagingEnabled={false}
      //   scrollEnabled={true}
      //   decelerationRate={0.5}
      //   scrollEventThrottle={16}
      // >
        <View style={styles.root}>
          <View style={styles.imageBox}>
            <Image
              style={styles.image}
              source={require("../../assets/478x478-reeses.jpg")}
              resizeMode="cover"
            />
          </View>

          <View style={styles.iconBox}>
            <Icon style={styles.cameraIcon} name="ios-camera-outline" size={40} />
            <Icon style={styles.plusIcon} name="ios-add" size={40} />
          </View>

          <View style={styles.fieldBox}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.text}>Description</Text>
            <Text style={styles.text}>Price</Text>
          </View>

          <Text style={styles.save}>Post Item</Text>
        </View>
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#0000ff",
    flex: 1,
    alignItems: "center",
    flexDirection: "column"
  },

  imageBox: {
    flex: 0.64,
    backgroundColor: "rgb(231, 231, 231)",
    alignSelf: "stretch",
    margin: 0,
    minHeight: 0,
    width: 374.98,
    height: 3,
    justifyContent: "flex-end",
    alignItems: "center"
  },

  iconBox: {
    backgroundColor: "rgb(232, 232, 232)",
    alignSelf: "stretch",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 374.98
  },

  fieldBox: {
    flex: 0.2,
    backgroundColor: "rgb(215, 215, 215)",
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "space-around",
    alignItems: "stretch",
    width: 374.98,
    height: 146.41
  },
  
  save: {
    height: 71.82,
    flex: 0.15,
    backgroundColor: "transparent",
    fontSize: 36,
    color: "rgba(255,255,255,1)",
    width: 359.12,
    textAlign: "center"
  },

  plusIcon: {
    backgroundColor: "transparent",
    color: "grey",
    fontSize: 50,
    width: 25.01,
    height: 48.94
  },

  cameraIcon: {
    backgroundColor: "transparent",
    color: "grey",
    fontSize: 50,
    textAlign: "left",
    width: 37.52,
    height: 48.94
  },

  text: {
    backgroundColor: "transparent",
    fontSize: 24,
    color: "rgba(0,0,0,1)",
    //width: 80.03
    height: 30.75
  },

  image: { width: 374.99, height: 382.04 }
});
