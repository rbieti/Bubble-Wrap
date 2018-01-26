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
    title: 'BubbleWrap',
    tabBarLabel: 'BubbleWrap',
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
  state = { item: '', location: '' };

  //////////////////////////////////////////////////////////////////////////////////
  // Initialize the component
  componentWillMount() {
    // ***DTG - JUST FOR TESTING SO I DON"T HAVE TO KEEP TYPING THIS IN
    //this.setState({ item: "McDonalds" });
    //this.setState({ location: "Azusa, CA" });
    // Upon loading the app, load any static resources...
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the search button
  /*
  onButtonPress = () => {
    this.props.fetchPlaces(this.state.item, this.state.location, () => {
      this.props.navigation.navigate('searchResults'); // Passing a callback function
    });
  };
*/
  //////////////////////////////////////////////////////////////////////////////////
  // Render method
  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Item Search</FormLabel>
          <FormInput
            itemholder="What are you looking for?"
            value={this.state.item}
            onChangeText={item => this.setState({ item })}
          />
        </View>


        <Button
          title="Search"
          icon={{ name: 'search' }}
          backgroundColor={PRIMARY_COLOR}
          onPress={() => {navigate('test')} }     
             />
      </View>
    );
  }
}

export default connect(null, actions)(SearchScreen);
