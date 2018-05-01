import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, AppRegistry, Dimensions, Switch, TextInput, Button} from "react-native";
import { Cell, Section, TableView, } from 'react-native-tableview-simple';
import Carousel from 'react-native-snap-carousel';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/style';
import { fetchAllItems, fetchOffersOLD, getUserItems, getOfferItems } from '../actions/user_items_actions';
import { loadItem } from '../actions/buy_items_actions';

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
    this.props.getUserItems();
    this.props.getOfferItems();
  }

  _renderUserItem({ item, index }) {
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

  _renderSellerItem({ item, index }) {
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => { this.props.loadItem(item); this.props.navigation.navigate('buyItem'); }}
        key={index}
      >
      {!!item.images[0].url &&
        <Image style={styles.cardImg} source={{ uri: item.images[0].url }} />
      }
        <View style={styles.textBackground}>
          <Text style={styles.cardText}>{`${item.name} \n You Offered: $${item.userOffer}`}</Text>
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
          data={this.props.userItems}
          renderItem={this._renderUserItem.bind(this)}
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
          data={this.props.offerItems}
          renderItem={this._renderSellerItem.bind(this)}
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
    marginTop: 12,
  },

  carouselTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    marginTop: 20,
    marginLeft: 20,
  },

  card: {
    flex: 1, 
    width: cardWidth,
    height: cardHeight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
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
  const { items, all_items, userItems, offerItems } = state.userItems;
  const { item } = state.buyItems;
  return { items, item, all_items, userItems, offerItems };
};

export default connect(mapStateToProps, { loadItem, getUserItems, getOfferItems })(ListOfOffers);
