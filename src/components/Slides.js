import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/style';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  ////////////////////////////////////////////////////////////////////////
  // Renders the last slide, which has an additional button
  renderLastSlideContent(index) {
    if (index === this.props.data.length - 1) {
      return (
        <View style={{ marginTop: 15 }}>
          <Button
            buttonStyle={styles.buttonStyle}
            title="Drink Soda!"
            raised
            onPress={this.props.onComplete}
          />
        </View>
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////
  // Renders the initial slides (no button)
  renderSlides() {
    return this.props.data.map((slide, index) => (
        <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
          <Text style={styles.textStyle}>{slide.text}</Text>
          {this.renderLastSlideContent(index)}
        </View>
      ));
  }

  ////////////////////////////////////////////////////////////////////////
  // Main render method
  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

////////////////////////////////////////////////////////////////////////
// Styles object
const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FFF'
  },
  buttonStyle: {
    backgroundColor: PRIMARY_COLOR
    //marginTop: 15
  }
};

export default Slides;
