////////////////////////////////////////////////////////////////
// Import libraries to help create a component
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

////////////////////////////////////////////////////////////////
// Make component: ActivityIndicator has a builtin property
// called "size"; if pass in a size property use it, otherwise,
// use 'large'
const Spinner = ({ size, message = 'Loading...' }) => (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
      <Text>{message}</Text>
    </View>
  );

////////////////////////////////////////////////////////////////
// Styling
const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

////////////////////////////////////////////////////////////////
// Make the component available to other parts of the app
export { Spinner };
