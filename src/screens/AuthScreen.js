import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  SocialIcon
} from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Spinner } from '../components/Spinner';

import { PRIMARY_COLOR } from '../constants/style';

// Purpose of this auth screen is just to call action creator
class AuthScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // State definition
  state = { inSignupMode: false, showLoading: true }; // Just for local use

  //////////////////////////////////////////////////////////////////////////////////
  // Register the event which detects a change of state in the logged-in user
  componentWillMount() {
    //this.props.loading = true;

    // Check if user is persisted and "login" by navigating to main if so
    if (firebase.auth().currentUser) {
      console.log(`${firebase.auth().currentUser.email} already logged in.`);
      return this.props.navigation.navigate('main'); // Navigate to main page
    }

    //console.log(this.props.navigation.state.params);

    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      // Show login screen b/c firebase has just authenticated/denied user
      this.props.loading = false;
      this.setState({ showLoading: this.props.loading }); // Retrigger components

      console.log('onAuthStateChanged()');
      if (user) {
        // Print out debug info
        console.log('--We are authenticated now!');
        console.log(`--Display Name: ${user.displayName}`);
        console.log(`--Email: ${user.email}`);
        //console.log(`--Provider: ${user.providerId}`);
        console.log(`--uid: ${user.uid}`);

        // Navigate to main page
        this.props.navigation.navigate('main');
        return;
      }

      this.props.navigation.navigate('auth');
    });
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Called whenever one of the props (properties) changes - when the login/token
  // property from the auth reducer changes, this will be called.
  componentWillReceiveProps(nextProps) {
    this.setState({ showLoading: nextProps.loading });
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Handler for facebook login button
  onFbButtonPress = () => {
    this.props.facebookLogin();
    //AsyncStorage.removeItem('fb_token'); // Just used for testing to clear item
    //SecureStore.deleteItemAsync('fb_token');
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Update the property when changed
  onEmailChange = text => {
    this.props.emailChanged(text);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Update the property when changed
  onPasswordChange = text => {
    this.props.passwordChanged(text);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Update the property when changed
  onPasswordRetypeChange = text => {
    this.props.passwordRetypeChanged(text);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Login user via username/password
  onStandardLoginButtonPress = () => {
    const { email, password } = this.props;
    this.props.loginUser(email, password);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Login user via username/password
  onStandardSignupButtonPress = () => {
    const { email, password, passwordRetype } = this.props;
    this.props.signupUser(email, password, passwordRetype);
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Toggles between Login mode and Signup mode
  onSignupLoginToggle = () => {
    this.setState({ inSignupMode: !this.state.inSignupMode });
    this.props.resetSignupLoginPages();
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Render login buttons conditionally (show spinner when working on login)
  renderButtons() {
    if (this.state.inSignupMode) {
      return (
        <View>
          <Button
            title="Sign Up"
            //icon={{ name: 'vpn-key' }}
            backgroundColor={PRIMARY_COLOR}
            onPress={this.onStandardSignupButtonPress}
          />

          <Text style={{ textAlign: 'center', marginTop: 10 }}>- OR -</Text>

          <SocialIcon
            type="facebook"
            title="Sign Up With Facebook"
            raised={false}
            button
            onPress={this.onFbButtonPress}
          />

          <View style={styles.detailWrapperStyle}>
            <Text style={{ textAlign: 'center' }}>Already have an account?&nbsp;</Text>
            <TouchableWithoutFeedback onPress={this.onSignupLoginToggle}>
              <View>
                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Log In</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }
    return (
      <View>
        <Button
          title="Log In"
          //icon={{ name: 'vpn-key' }}
          backgroundColor={PRIMARY_COLOR}
          onPress={this.onStandardLoginButtonPress}
        />

        <Text style={{ textAlign: 'center', marginTop: 10 }}>- OR -</Text>

        <SocialIcon
          type="facebook"
          title="Log In With Facebook"
          raised={false}
          button
          onPress={this.onFbButtonPress}
        />

        <View style={styles.detailWrapperStyle}>
          <Text style={{ textAlign: 'center' }}>Don't have an account?&nbsp;</Text>
          <TouchableWithoutFeedback onPress={this.onSignupLoginToggle}>
            <View>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Sign Up</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Render password retype button if in signup mode
  renderPasswordRetypeButton() {
    if (this.state.inSignupMode) {
      return (
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Retype Password</FormLabel>
          <FormInput
            placeholder="p@ssw0rd"
            secureTextEntry
            value={this.props.passwordRetype}
            onChangeText={this.onPasswordRetypeChange}
          />
        </View>
      );
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Get screen style (used to center activity spinner when loading)
  getScreenStyle() {
    if (this.state.showLoading) {
      return styles.spinnerStyle;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Render loading screen (if attempting a persist login) or login screen
  renderContent() {
    if (this.state.showLoading) {
      return <Spinner size="large" message="Authenticating..." />;
    }
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>E-mail</FormLabel>
          <FormInput
            placeholder="jon@email.com"
            value={this.props.email}
            onChangeText={this.onEmailChange}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Password</FormLabel>
          <FormInput
            placeholder="p@ssw0rd"
            secureTextEntry
            value={this.props.password}
            onChangeText={this.onPasswordChange}
          />
        </View>

        {this.renderPasswordRetypeButton()}

        <FormValidationMessage containerStyle={{ marginBottom: 10 }}>
          {this.props.error}
        </FormValidationMessage>

        {this.renderButtons()}
      </View>
    );
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Main render method
  render() {
    return <View style={this.getScreenStyle()}>{this.renderContent()}</View>;
  }
}

//////////////////////////////////////////////////////////////////////////////////
// Styles object
const styles = {
  detailWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

//////////////////////////////////////////////////////////////////////////////////
// Map redux reducers to component props.
function mapStateToProps({ auth }) {
  return {
    email: auth.email,
    password: auth.password,
    passwordRetype: auth.passwordRetype,
    error: auth.error,
    loading: auth.loading
  };
}

export default connect(mapStateToProps, actions)(AuthScreen);
