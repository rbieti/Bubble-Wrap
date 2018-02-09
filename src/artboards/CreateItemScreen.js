import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";

export default class CreateItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create Item',
    tabBarLabel: 'Create',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.mainImg}
            source={require("../../assets/478x478-reeses.jpg")}
            resizeMode="cover"
          />
          <View style={styles.thumbnailsContainer}>
            <View style={styles.thumbnailView}>
            </View>
            <View>
            </View>
            <View>
            </View>
          </View>
        </View>

        <View style={styles.iconContainer}>
          <Icon style={styles.iconImg} name="ios-camera-outline" size={40} />
          <Icon style={styles.iconImg} name="ios-add" size={40} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.textCell}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type here to translate!"
              onChangeText={(text) => this.setState({text})}
            />
          </View>

          <View style={styles.textCell}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type here to translate!"
              onChangeText={(text) => this.setState({text})}
            />
          </View>

          <View style={styles.textCell}>
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type here to translate!"
              onChangeText={(text) => this.setState({text})}
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={() => {console.log("Button pressed")}}
            >
            <Text style={styles.btnText}>
              Post Item
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },

  imageContainer: {
    flex: 1,
    width: window.width,
    height: window.width,
    height: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mainImg: {
    marginTop: 0,
    width: "100%",
    height: "100%",
  },
  thumbnailsContainer: {
    
  },
  thumbnailView: {

  },

  iconContainer: {
    flex: 1,
    flexDirection: "row",
    paddingRight: "25%",
    paddingLeft: "25%",
    backgroundColor: "#f5f5f5",
    maxHeight: 70,
    alignItems: 'center',
    justifyContent: "space-between",
  },
  iconImg: {
    height: 50,
    width: 50,
    marginTop: 15,
  },

  textContainer: {
    padding: 15,
    backgroundColor: "#fff",
    height: 150,
  },
  textCell: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 5,
  },
  textInput: {
    height: 40,
    paddingLeft: 20,
  },

  btnContainer: {
    width: window.width,
    height: 70,
  },
  btnOpacity: {
    backgroundColor: "#33a3f3",
    width: "100%",
    height: "100%",
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  }
});
