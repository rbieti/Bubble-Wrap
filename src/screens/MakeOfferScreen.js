import React, { Component } from "react";
import { Alert, View, StyleSheet, Text, Button, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { PRIMARY_COLOR } from '../constants/style';
import { connect } from 'react-redux';
import { makeOffer, offerUpdate } from '../actions/offer_actions';
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

  onButtonPress() {
    const {price, item} = this.props;
    if (this.props.price == "") {
      alert("Please enter a price");
    } else {
      this.props.makeOffer({ price, key: item.key});
      alert("Your offer has been sent!");
      this.props.navigation.navigate('search');
    }
  }

  render() {
    const { name, price, images } = this.props.item;
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.backgroundImage} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Image 
            style={styles.backgroundImage} 
            source={{ uri: images[0].url }}
            blurRadius={10}
            keyboardShouldPersistTaps={'never'}
            >
            <View style={styles.root}>
              <View style={styles.topArea}>
                <TextInput
                  style={styles.textInput}
                  keyboardType='numeric'
                  maxLength={5}
                  placeholder={`Suggested Price $${price}`}
                  onChangeText={(price) => this.props.offerUpdate({price})}
                />
                <Text style={styles.text}>Enter your offer for</Text>
                <Text style={styles.text}>{name}</Text>
              </View>
              <TouchableOpacity style={styles.offerBtn} onPress={ this.onButtonPress.bind(this)}>
                <Text style={styles.btnText}>Make offer</Text>
              </TouchableOpacity>
           </View>
          </Image>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    bottom: "20%",
  },

  btnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  }
});

const mapStateToProps = (state) => {
  const { item } = state.buyItems;
  const { price } = state.offers;
  return { item, price };
};

export default connect(mapStateToProps, {makeOffer, offerUpdate})(MakeOfferScreen);