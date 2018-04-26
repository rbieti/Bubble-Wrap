import React, { Component } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, Image, TextInput } from "react-native";
import { PRIMARY_COLOR } from '../constants/style';
import { connect } from 'react-redux';
import firebase from 'firebase';

class MakeOfferScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: 'Make an Offer',
    tabBarLabel: 'MakeOfferScreen',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  makeOffer = (amount, item) => {
    const name = firebase.auth().currentUser.uid;
    const offerRef = firebase.database().ref('offers')
      .push( { amount, item, name });
  }


  render() {
    const { name, price, images } = this.props.item;
    const { navigate } = this.props.navigation;
    return (
      <Image 
        style={styles.backgroundImage} 
        source={{ uri: images[0].url }}
        blurRadius={15}
        >
        <View style={styles.root}>
          <View style={styles.topArea}>
            <TextInput
              style={styles.textInput}
              keyboardType='numeric'
              // value={"$" + price}  // get offer value from price variable
              // value={"$" + "0"}
              maxLength={5}
              onChangeText={(text) => this.setState({text})}
            />
            <Text style={styles.text}>Enter your offer for</Text>
            <Text style={styles.text}>{name}</Text>
          </View>
          <TouchableOpacity style={styles.offerBtn} onPress={() => { 
            this.makeOffer(0, this.props.item.key);
           }}>
            <Text style={styles.btnText}>Make offer</Text>
          </TouchableOpacity>
       </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height: null,
    width: null,
  },

  root: { 
    flex: 1,
    alignItems: "center",
    opacity: 1.0
  },

  topArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    maxHeight: 180,
    backgroundColor: "transparent"
  },

  textInput: {
    width: "80%",
    height: 45,
    backgroundColor: "white",
    color: "black",
    textAlign: "left",
    borderRadius: 15,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 100,
    marginBottom: 20,
  },

  text: {
    width: "100%",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 20,
  },

  offerBtn: {
    backgroundColor: "#33a3f3",
    width: "80%",
    height: 100,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    bottom: 60,
  },

  btnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  }
});

const mapStateToProps = (state) => {
  const { item } = state.buyItems;
  return { item };
};

export default connect(mapStateToProps)(MakeOfferScreen);