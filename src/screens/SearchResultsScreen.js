import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import * as actions from '../actions';
import * as urlBuilder from '../utility/url_builder';
import { PRIMARY_COLOR } from '../constants/style';

class SearchResultsScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = {
    title: 'Search Results',
    tabBarLabel: 'Places'
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Default the map to Los Angeles if not initialized otherwise
  componentWillMount() {
    if (this.props.searchRegion === null) {
      const laRegion = {
        longitude: 34.0201597, // Map Center
        latitude: -118.6926116, // Map Center
        longitudeDelta: 0.04, // Zoom level
        latitudeDelta: 0.09 // Zoom level
      };

      this.props.searchRegion = laRegion;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Handler for the button press on each list item
  onButtonPress = place => {
    this.props.loadPlaceDetails(place, () => {
      this.props.navigation.navigate('vendor', { headerTitle: place.name });
    });
  };

  //////////////////////////////////////////////////////////////////////////////////
  // Whenever user drags the map view, update the search region
  onRegionChangeComplete = region => {
    this.props.searchRegion = region;
  };

  renderContent() {
    if (this.props.places === null) {
      return <Text>Please perform a search.</Text>;
    }

    return (
      <View>
        <MapView
          height={200}
          region={this.props.searchRegion}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {this.props.places.map(place => (
            <MapView.Marker
              key={place.place_id}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng
              }}
              title={place.name}
              description={place.vicinity}
              onCalloutPress={() => this.onButtonPress(place)}
              pinColor={PRIMARY_COLOR}
            />
          ))}
        </MapView>
        <List>{this.renderPlaces()}</List>
      </View>
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  // Defines how to render each place (card) in the list of places
  renderPlaces() {
    return this.props.places.map(place => {
      // Some more properties that might be useful from place
      /* place_id, geometry.location.lat, geometry.location.lng, photos.photo_reference*/
      // Pull off top-level keys from JSON object
      const { place_id, name, photos, vicinity } = place;

      const photoUrl = urlBuilder.buildPlacesPhotoUrl(
        photos[0].photo_reference,
        100
      );

      return (
        <ListItem
          key={place_id}
          title={name}
          subtitle={vicinity}
          subtitleNumberOfLines={2}
          avatar={{ uri: photoUrl }}
          onPress={() => this.onButtonPress(place)}
          //rightTitle='MyTitle'
          rightTitleNumberOfLines={1}
        />
      );
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  // Main render method - renders a map with all of the places markers and a list of all
  // the places
  render() {
    return <ScrollView>{this.renderContent()}</ScrollView>;
  }
}

////////////////////////////////////////////////////////////////////////////////////////
// Maps the state piece from the places reducer to a local property.
// places inside the component will be equal to the results w/i Google
// places JSON response
function mapStateToProps({ places }) {
  if (places.placesResponse === null) {
    return {
      places: null,
      searchRegion: null
    };
  }

  return {
    places: places.placesResponse.results,
    searchRegion: places.placesResponse.searchRegion
  };
}

export default connect(mapStateToProps, actions)(SearchResultsScreen);
