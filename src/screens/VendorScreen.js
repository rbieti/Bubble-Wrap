import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  Image,
  View,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { Icon, List, ListItem, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as urlBuilder from '../utility/url_builder';
import { PRIMARY_COLOR } from '../constants/style';

const SCREEN_WIDTH = Dimensions.get('window').width;

class VendorScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.headerTitle,
    tabBarLabel: 'Store'
  });

  ////////////////////////////////////////////////////////////////////////////////////////
  // Called when the link is pressed
  onButtonGoHome = () => {
    this.props.navigation.navigate('search');
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  // Renders the main content list of items at this place
  renderList() {
    const placeDetails = this.props.placeDetails;

    if (!placeDetails) {
      return (
        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: 'center', width: SCREEN_WIDTH }}>
            No items added to this place yet.
          </Text>
        </View>
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  // Main render method
  render() {
    // Pull off top-level keys from JSON object
    const { id, name, photos, vicinity } = this.props.place;

    const photoUrl = urlBuilder.buildPlacesPhotoUrl(photos[0].photo_reference);

    return (
      <ScrollView>
        <Image style={{ flex: 1, minHeight: 200 }} source={{ uri: photoUrl }} />
        <Text style={{ fontSize: 18 }}>{name}</Text>
        <Text style={{ fontSize: 12 }}>{vicinity}</Text>

        {this.renderList()}

        <View style={styles.detailWrapperStyle}>
          <Text style={{ textAlign: 'center', width: SCREEN_WIDTH }}>
            Some content here...
          </Text>
          <TouchableWithoutFeedback onPress={this.onButtonGoHome}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'blue',
                  textDecorationLine: 'underline'
                }}
              >
                Let's just go home!
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////
// Styles object
const styles = {
  detailWrapperStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    width: SCREEN_WIDTH
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  }
};

////////////////////////////////////////////////////////////////////////////////////////
// Maps the state piece from the places reducer to a local property.
// place inside the component will be equal to a specific place object from the results
// w/i Google places JSON response
function mapStateToProps({ places }) {
  return {
    place: places.selectedPlace,
    placeDetails: places.selectedPlaceDetails
  };
}

export default connect(mapStateToProps, actions)(VendorScreen);
