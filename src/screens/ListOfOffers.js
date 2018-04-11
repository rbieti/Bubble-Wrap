import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, AppRegistry, Dimensions, Switch, TextInput, Button } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/style';
import { Cell, Section, TableView, } from 'react-native-tableview-simple';
import { fetchItems, fetchOffers } from '../actions/user_items_actions';
import { loadItem } from '../actions/buy_items_actions';
import { fetchUsers } from '../actions/users_actions';

const CellVariant = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View style={styles.customCell} >
        <Text
          allowFontScaling
          numberOfLines={1}
          style={styles.cellText}
        >
          {props.title}
        </Text>
      </View>
    }
  />
);

class ListOfOffers extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Offers',
    tabBarLabel: 'Offers',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    },
  });

  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchUsers();
  }

  componentDidUpdate(prevProps) {
    // if items is no longer empty
    if (prevProps.items.length <= 0) {
      this.props.fetchOffers(this.props.items);
    }
  }

  renderOffers({ offers }) {  
    const { users } = this.props;
    if (offers !== undefined) {
      offers.sort((a, b) => (a.amount < b.amount ? 1 : -1)); // sort descending
      return offers.slice(0, 2).map(({ amount, user, key }) => (
        <TouchableOpacity
          style={styles.cardSection}
          onPress={() => console.log(key)}
          key={key}
        >
          <Text style={styles.cardText}> {users[user]} offered: ${amount} </Text>
        </TouchableOpacity>
      ));
    }
  }

  renderCards() {
    return this.props.items.map(item => {
      const { name, price, images, key } = item;
      return (
        <TouchableOpacity
          style={styles.cardView}
          key={key}
          onPress={() => {
            this.props.loadItem(item);
            this.props.navigation.navigate('editItem');
          }}
        >
          <Image
            source={{ uri: images[0].url }}
            style={styles.profileImg}
            resizeMode="cover"
          />
          <View style={styles.titleArea}>
            <Text style={styles.cardTitle}> {name} </Text>
            <Text style={styles.cardSubtitle}> asking price: ${price} </Text>
          </View>

          <View style={styles.sections}>
            {this.renderOffers(item)}

            <TouchableOpacity
              style={styles.cardSection}
              onPress={() => {
                this.props.loadItem(item);
                this.props.navigation.navigate('soview');
              }}
            >
              <Text style={styles.cardText}> See more... </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <ScrollView>
          {this.renderCards()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  root: {

  },

  cardView: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 20,
    margin: 20,
    marginBottom: 30,
    height: 300,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.33,
    shadowRadius: 5,
    elevation: 0,
  },

  profileImg: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 0,
    left: 0,
  },

  titleArea: {
    width: "50%"
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    position: "relative",
    left: 160,
    textAlign: 'left',
  },

  cardSubtitle: {
    fontSize: 16,
    position: "relative",
    left: 160,
  },

  sections: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
  const { items } = state.userItems;
  const { users } = state.users;
  return { items, users };
};

export default connect(mapStateToProps, {
  fetchItems, fetchOffers, fetchUsers, loadItem
})(ListOfOffers);
