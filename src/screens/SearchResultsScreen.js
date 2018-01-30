import React, { Component } from 'react';
import { ScrollView, View, Text,StyleSheet } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import * as actions from '../actions';
import * as urlBuilder from '../utility/url_builder';
import { PRIMARY_COLOR } from '../constants/style';

class SearchResultsScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = {
    title: 'Search Results',
    tabBarLabel: 'Places'
  };

  
  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the button press on each list item
  onButtonPress = place => {
    this.props.loadPlaceDetails(place, () => {
      this.props.navigation.navigate('vendor', { headerTitle: place.name });
    });
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Whenever user drags the map view, update the search region


  render() {
    return (
      <View style={styles.root}>
        <View style={styles.rect1} />
        <Text style={styles.text1}>Item 1</Text>
        <View style={styles.rect2}>
          <Text style={styles.text2}>Item 2</Text>
        </View>
        <View style={styles.rect3}>
          <Text style={styles.text3}>Item 3</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1 },
  rect1: {
    backgroundColor: "rgb(230, 230, 230)",
    height: 102.17,
    width: 339.98,
    top: 87.36,
    left: 17.51,
    position: "absolute"
  },
  text1: {
    backgroundColor: "transparent",
    top: 128.03,
    left: 164.99,
    position: "absolute"
  },
  text2: {
    top: 45.86,
    left: 147.47,
    position: "absolute",
    backgroundColor: "transparent"
  },
  rect2: {
    top: 210.01,
    left: 14.37,
    width: 339.98,
    height: 102.17,
    position: "absolute",
    backgroundColor: "rgb(230, 230, 230)"
  },
  text3: {
    top: 44.82,
    left: 146.45,
    position: "absolute",
    backgroundColor: "transparent"
  },
  rect3: {
    top: 322.65,
    left: 17.06,
    width: 339.98,
    height: 102.17,
    position: "absolute",
    backgroundColor: "rgb(230, 230, 230)"
  }
});

export default SearchResultsScreen;
