import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Button, TouchableOpacity, Image, ScrollView } from "react-native";
import { PRIMARY_COLOR } from '../constants/style';

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

  renderOffers() {
    const { users } = this.props;
    const { offers } = this.props.item;
    if (offers !== undefined) {
      return offers.map(({ amount, user, key }) => (
        <View 
          style={styles.cardView}
          key={key}
        >
          <View style={styles.sections}>
            <View style={styles.cardSection}>
              <Text style={styles.cardText}> {users[user]} offered: ${amount} </Text>
            </View>
          </View>
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
  const { users } = state.users;
  return { item, users };
};

export default connect(mapStateToProps)(SingleOfferViewScreen);
