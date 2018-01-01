import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { PRIMARY_COLOR } from '../constants/style';

class SearchScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: 'MyApp',
    tabBarLabel: 'MyApp',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    },
    headerLeft: (
      <Button
        navigate={navigation.navigate}
        large
        icon={{ name: 'menu' }}
        backgroundColor={PRIMARY_COLOR}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    ),
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color={tintColor} />
    )
  });

  //////////////////////////////////////////////////////////////////////////////////
  // State definition (ES7 syntax)
  state = { place: '', location: '' };

  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
  componentWillMount() {
    // ***DTG - JUST FOR TESTING SO I DON"T HAVE TO KEEP TYPING THIS IN
    //this.setState({ place: "McDonalds" });
    //this.setState({ location: "Azusa, CA" });
    // Upon loading the app, load any static resources...
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the serach button
  onButtonPress = () => {
    this.props.fetchPlaces(this.state.place, this.state.location, () => {
      this.props.navigation.navigate('searchResults'); // Passing a callback function
    });
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Restaurant Search</FormLabel>
          <FormInput
            placeholder="Dan's Burgers"
            value={this.state.place}
            onChangeText={place => this.setState({ place })}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>City/State</FormLabel>
          <FormInput
            placeholder="Los Angeles, CA"
            value={this.state.location}
            onChangeText={location => this.setState({ location })}
          />
        </View>

        <Button
          title="Search"
          icon={{ name: 'search' }}
          backgroundColor={PRIMARY_COLOR}
          onPress={this.onButtonPress}
        />
      </View>
    );
  }
}

export default connect(null, actions)(SearchScreen);
