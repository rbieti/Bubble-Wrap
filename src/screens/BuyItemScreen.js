import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  Image,
  View,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { Icon, List, ListItem, Rating, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as urlBuilder from '../utility/url_builder';
import { PRIMARY_COLOR } from '../constants/style';

const SCREEN_WIDTH = Dimensions.get('window').width;

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// TR: WHO KNOWS WHAT I'M EVEN DOING
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
class BuyItemScreen extends Component {
  //////////////////////////////////////////////////////////////////////////////////
  // Properties automatically referred to by react-navigation navigators
  static navigationOptions = ({ navigation }) => ({
    title: 'Buy Item',
    tabBarLabel: 'Buy Item',
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

  ////////////////////////////////////////////////////////////////////////////////////////
  // Called when the link is pressed
  onButtonGoHome = () => {
    this.props.navigation.navigate('search');
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  // Main render method
  render() {
    // Pull off top-level keys from JSON object
    const { id, name, photos, vicinity } = this.props.place;

    const photoUrl = urlBuilder.buildPlacesPhotoUrl(photos[0].photo_reference);

    return (
      <ScrollView>
        <Card title='CouchDB'>
          <View>
            <Text>I will walk 500 miles and I'll walk 500 more.</Text>
          </View>
        </Card>
        <Image style={{ flex: 1, minHeight: 200 }} source={{ uri: photoUrl }} />
        <Text style={{ fontSize: 18 }}>{name}</Text>
        <Text style={{ fontSize: 12 }}>{vicinity}</Text>

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

export default (BuyItemScreen);
