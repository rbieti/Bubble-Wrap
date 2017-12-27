import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Spinner } from '../components/Spinner';

import { PRIMARY_COLOR } from '../constants/style';

// Purpose of this auth screen is just to call action creator
class AuthScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = {
    //tabBarVisible: false,
    title: 'Sign Out',
    drawerIcon: ({ tintColor }) => <Icon type="entypo" name="log-out" size={25} color={tintColor} />
  };

  //////////////////////////////////////////////////////////////////////////////////
  // State definition
  state = { inSignupMode: false }; // Just for local use

  //////////////////////////////////////////////////////////////////////////////////
  // Register the event which detects a change of state in the logged-in user
  componentWillMount() {
    //this.props.resetSignupLoginPages();

    this.props.signoutUser();
    // // Debug sign-out
    // if (firebase.auth().currentUser) {
    //     console.log(`Signing Out ${firebase.auth().currentUser.email}`);
    //     firebase.auth().signOut();
    // } else {
    //     console.log('No User Logged In');
    // }

    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Print out debug info
        console.log(`${user.email} still logged in?!?!?`);
        this.props.navigation.navigate('search');

        // Navigate to main page
        //this.props.navigation.navigate('main');
        //return;
      } else {
        console.log('User logged out successfully.');
        //this.props.navigation.navigate('auth');

        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'auth' })],
        // });

        this.props.navigation.dispatch({
          type: 'Navigation/RESET',
          index: 0,
          actions: [{ type: 'Navigate', routeName: 'searchResults' }]
        });
        this.props.navigation.navigate('auth');
      }
    });
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Called whenever one of the props (properties) changes - when the login/token
  // property from the auth reducer changes, this will be called.
  // componentWillReceiveProps(nextProps) {
  //     this.onAuthComplete(nextProps);
  // }

  //////////////////////////////////////////////////////////////////////////////////
  // Render loading button while logging out
  renderScreen() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Main render method
  render() {
    return <View>{this.renderScreen()}</View>;
  }
}

//////////////////////////////////////////////////////////////////////////////////
// Map redux reducers to component props.
function mapStateToProps({ auth }) {
  return {
    loading: auth.loading
  };
}

export default connect(mapStateToProps, actions)(AuthScreen);
