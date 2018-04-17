import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Spinner } from '../components/Spinner';

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Sign Out',
    drawerIcon: ({ tintColor }) => <Icon type="entypo" name="log-out" size={25} color={tintColor} />
  };

  state = { inSignupMode: false };

  componentWillMount() {
    try {
      firebase.auth().signOut();
      alert("Signing out...");
      this.props.navigation.navigate('auth')
    } catch(e) {
      alert("Error signing out");
    }
  }

  renderScreen() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
  }

  render() {
    return <View>{this.renderScreen()}</View>;
  }
}

// Map redux reducers to component props.
function mapStateToProps({ auth }) {
  return {
    loading: auth.loading
  };
}

export default connect(mapStateToProps, actions)(AuthScreen);