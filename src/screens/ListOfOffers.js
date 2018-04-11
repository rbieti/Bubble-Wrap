import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, AppRegistry, Dimensions, Switch, TextInput, Button} from "react-native";
import { Cell, Section, TableView, } from 'react-native-tableview-simple';
import Carousel from 'react-native-snap-carousel';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/style';
import { fetchAllItems } from '../actions/user_items_actions';
import { loadItem } from '../actions/buy_items_actions';
import { fetchOffers } from '../actions/user_items_actions';

class ListOfOffers extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Offers',
    tabBarLabel: 'Offers',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    },
  });

  componentDidMount() {
    // this.props.fetchAllItems();
    this.props.fetchOffers(this.props.all_items);
  }

  _renderItem({ item, index }) {
    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => { this.props.loadItem(item); this.props.navigation.navigate('soview'); }}
        key={index}
      >
        <Image style={styles.cardImg} source={{ uri: item.images[0].url }} />
        <View style={styles.textBackground}>
          <Text style={styles.cardText}>{`${item.name} \n $${item.price}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.verticalScroll}>
        <Text style={styles.carouselTitle}>Items you are selling</Text>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.all_items}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={375}
          itemWidth={cardWidth}
          layout={'default'} 
          activeSlideAlignment={'center'}
          containerCustomStyle={styles.horizontalCarousel}
          enableSnap={false}
        />

        <Text style={styles.carouselTitle}>Offers you have made</Text>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.all_items}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={375}
          itemWidth={cardWidth}
          layout={'default'} 
          activeSlideAlignment={'center'}
          containerCustomStyle={styles.horizontalCarousel}
        />
      </ScrollView>
    );
  }
}

const cardWidth = 250;
const cardHeight = cardWidth;

const styles = {
  horizontalCarousel: {
    marginTop: 40,
  },

  card: {
    flex: 1, 
    width: cardWidth,
    height: cardHeight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12, 
    borderRadius: 15,
    backgroundColor: "#fff",
    overflow: 'hidden',
  },

  cardImg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  textBackground: {
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00000050",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  }
};

const mapStateToProps = (state) => {
  const { all_items } = state.userItems;
  const { item } = state.buyItems;
  return { item, all_items };
};

export default connect(mapStateToProps, { fetchAllItems, fetchOffers, loadItem })(ListOfOffers);
