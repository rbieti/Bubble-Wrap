import React, { Component } from "react";
import firebase from 'firebase';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Button, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { PRIMARY_COLOR } from '../constants/style';
import { fetchOffers } from '../actions/user_items_actions';
import { fetchUsers } from '../actions/user_profile_actions';
import { seeOffers } from '../actions/offer_actions';

class SingleOfferViewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: 'Single Offer View Screen',
    tabBarLabel: 'Single Offer View Screen',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    },
  });

  componentDidMount() {
    this.props.fetchOffers({ itemId: this.props.item.key });
    this.props.seeOffers({ itemId: this.props.item.key });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.offersFetched !== this.props.offersFetched) {
      let userIds = this.props.offers.map(({ user }) => user);
      userIds = userIds.filter(n => n !== undefined);
      this.props.fetchUsers({ userKeys: userIds, reducerPlacement: 'offers' });
    }
  }

  acceptOffer(key) {
    firebase.database().ref(`offers/${key}/accepted`).set('true');  // Set value of 'accepted' to 'true'

    alert("Thanks! We'll let the buyer know.");
    // TODO: Notify buyer that their offer was accepted

    this.props.navigation.navigate('trans');
  }

  renderOffers() {
    const { offers } = this.props;
    if (offers.length > 0) {
      return offers.map(({ amount, name, key }) => (
        <View
          style={styles.cardView}
          key={key}
        >
          <TouchableOpacity onPress={() => { 
            Alert.alert(
              `Accept ${name}\'s offer for $${amount}?`,
              '',
              [
                {text: 'Cancel', onPress: () => console.log("Canceled accepting offer.")},
                {text: 'Okay', onPress: () => this.acceptOffer(key)}
              ],
              { cancelable: false }
            );
          }}>
            <View style={styles.sections}>
              <View style={styles.cardSection}>
                <Text style={styles.cardText}> {name} offered: ${amount} </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ));
    }
    return (
      <View style={styles.cardView}>
        <View style={styles.sections}>
          <View style={styles.cardSection}>
            <Text style={styles.cardText}> No offers </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { name, price, images } = this.props.item;
    return (
      <View style={styles.root}>

        <View style={styles.headerView}>
          <Image
            source={{ uri: images[0].url }}
            style={styles.profileImg}
            resizeMode="cover"
          />
          <View style={styles.titleArea}>
            <Text style={styles.userNameLbl}> {name} </Text>
            <Text style={styles.userUniversityLbl}> asking price: ${price} </Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          {this.renderOffers()}
        </ScrollView>
      </View>
    );
  }
}

let profileImgWidth = 100;
let reviewerImgWidth = 60;

const styles = {
  root: {

  },

  /* Header Section */
  headerView: {
    backgroundColor: '#37474F',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },

  profileImg: {
    width: profileImgWidth,
    height: profileImgWidth,
    borderRadius: profileImgWidth / 8
  },

  titleArea: {
    alignItems: 'center'
  },

  userNameLbl: {
    color: '#fff',
    marginTop: 12,
    fontWeight: 'bold'
  },

  userUniversityLbl: {
    color: '#fff',
    marginTop: 0,
    fontStyle: 'italic'
  },
  /* End Header Section */

  scrollView: {
    height: "100%",
  },

  cardView: {
    position: "relative",
    top: 0,
    height: 50,
    margin: 20,
    marginBottom: 10,
    flexDirection: 'column',
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.33,
    shadowRadius: 5,
    elevation: 0,
  },

  cardSection: {
    justifyContent: 'center',
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderColor: '#d6d7da',
  },

  cardText: {
    fontSize: 16,
    marginLeft: 15
  }
};

const mapStateToProps = (state) => {
  const { item } = state.buyItems;
  const { offers, offersFetched } = state.userItems;
  return { item, offers, offersFetched };
};

export default connect(mapStateToProps, { fetchOffers, fetchUsers, seeOffers })(SingleOfferViewScreen);
