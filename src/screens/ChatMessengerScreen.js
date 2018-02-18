import React, { Component } from 'react';
import { PRIMARY_COLOR } from '../constants/style';
import {
  ActivityIndicator,
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class App extends Component <{}> {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        // message 0
        {
          _id: 0,
          text: 'Anyone there?',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Receiver',
            // avatar: '../../assets/logo.png', // Not working currently
          },
        },
        // message one
        {
          _id: 1,
          text: 'Hello, Kyle!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Sender',
            // avatar: './assets/icon.png', // Not working currently
          },
        },
        // message 2
        {
          _id: 2,
          text: 'Hi! Nice to meet you.',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Receiver',
            // avatar: '../../assets/logo.png', // Not working currently
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}