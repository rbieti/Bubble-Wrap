import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
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

class AuthScreen extends Component {
  state = { inSignupMode: false, showLoading: true };

  // Register the event which detects a change of state in the logged-in user
  componentWillMount() {
    // Check if user is persisted and "login" by navigating to main if so
    if (firebase.auth().currentUser) {
      console.log(`${firebase.auth().currentUser.email} already logged in.`);
      return this.props.navigation.navigate('search'); // Navigate to main page
    }

    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      this.props.loading = false;
      this.setState({ showLoading: this.props.loading }); // Retrigger components

      console.log('onAuthStateChanged()');
      if (user) {
        console.log('We are authenticated now!');
        try{console.log(`Display Name: ${user.displayName}`)} catch(e){};
        try{console.log(`Email: ${user.email}`)} catch(e){};
        try{console.log(`UID: ${user.uid}`)} catch(e){};

        this.props.navigation.navigate('search'); // Navigate to main page
        return;
      } else {
        this.props.navigation.navigate('auth');
      }
    });
  }

  // Called whenever one of the props (properties) changes - when the login/token
  // property from the auth reducer changes, this will be called.
  componentWillReceiveProps(nextProps) {
    this.setState({ showLoading: nextProps.loading });
  }

  onEmailChange = text => {
    this.props.emailChanged(text);
  };

  onPasswordChange = text => {
    this.props.passwordChanged(text);
  };

  onPasswordRetypeChange = text => {
    this.props.passwordRetypeChanged(text);
  };

  onStandardLoginButtonPress = () => {
    const { email, password } = this.props;
    this.props.loginUser(email, password);
  };

  onStandardSignupButtonPress = () => {
    const { email, password, passwordRetype } = this.props;
    this.props.signupUser(email, password, passwordRetype);
  };

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
            backgroundColor={PRIMARY_COLOR}
            onPress={this.onStandardSignupButtonPress}
          />
          <View style={styles.detailWrapperStyle}>
            <Text style={{ textAlign: 'center' }}>Already have an account?</Text>
            <TouchableWithoutFeedback onPress={this.onSignupLoginToggle}>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Sign In</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }
    return (
      <View>
        <Button
          title="Sign In"
          backgroundColor={PRIMARY_COLOR}
          onPress={this.onStandardLoginButtonPress}
        />
        <View style={styles.detailWrapperStyle}>
          <Text style={{ textAlign: 'center'}}>Don't have an account?</Text>
          <TouchableWithoutFeedback onPress={this.onSignupLoginToggle}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline', borderRadius: 10 }}>Sign Up</Text>
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

  // Get screen style (used to center activity spinner when loading)
  getScreenStyle() {
    if (this.state.showLoading) {
      return styles.spinnerStyle;
    }
  }

  // Render loading screen (if attempting a persist login) or login screen
  renderContent() {
    if (this.state.showLoading) {
      return <Spinner size="large" message="Authenticating..." />;
    }

    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 10, marginTop: "33%"}}>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="jonWallace@uni.edu"
            value={this.props.email}
            onChangeText={this.onEmailChange}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Password</FormLabel>
          <FormInput
            placeholder="password"
            secureTextEntry
            value={this.props.password}
            onChangeText={this.onPasswordChange}
          />
        </View>

        {this.renderPasswordRetypeButton()}

        <FormValidationMessage>
          {this.props.error}
        </FormValidationMessage>

        {this.renderButtons()}
      </View>
    );
  }

  // Main render method
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={this.getScreenStyle()}>
          {this.renderContent()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// Styles object
const styles = {
  container: {
    height: "100%", 
    width: "100%", 
  },
  detailWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

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
