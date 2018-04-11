import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, AppRegistry, Dimensions, Switch, TextInput, Button} from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/style';
import { Cell, Section, TableView, } from 'react-native-tableview-simple';
import firebase from 'firebase';
import { fetchAllItems } from '../actions/user_items_actions';
import Carousel from 'react-native-snap-carousel';

const CellVariant = (props) => (
  <Cell
    {...props}
    cellContentView = {
      <View style={styles.customCell} >
        <Text
          allowFontScaling
          numberOfLines={1}
          style={styles.cellText}
        >
          {props.title}
        </Text>
      </View>
    }
  />
);

class Untitled extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Offers',
    tabBarLabel: 'Offers',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    },
  });

  componentDidMount() {
    this.props.fetchAllItems();
  }

  renderItems() {
    const { all_items } = this.props;
    return all_items.map((item) => (
      <TouchableOpacity style={styles.card} onPress={() => { try {this.props.loadItem(item); navigate('seller')} catch(e){alert(e)} }}>
        <Image style={styles.cardImg} source={{ uri: item.images[0].url }}/>
        <Text style={styles.cardText}>{`${item.name} | $${item.price}`}</Text>
      </TouchableOpacity>
    ));
  }

  _renderItem ({item}) {
    return (
      <TouchableOpacity style={styles.card} onPress={() => { try {alert(item.name)} catch(e){alert(e)} }}>
        <Image style={styles.cardImg} source={{ uri: item.images[0].url }}/>
        <View style={styles.textBackground}>
          <Text style={styles.cardText}>{`${item.name} \n $${item.price}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.verticalScroll}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.all_items}
          renderItem={this._renderItem}
          sliderWidth={375}
          itemWidth={cardWidth}
          layout={'default'} 
          activeSlideAlignment={'center'}
          containerCustomStyle={styles.horizontalCarousel}
          enableSnap={'false'}
        />

        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.all_items}
          renderItem={this._renderItem}
          sliderWidth={375}
          itemWidth={cardWidth}
          layout={'stack'} 
          activeSlideAlignment={'center'}
          containerCustomStyle={styles.horizontalCarousel}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { items, all_items } = state.userItems;
  return { items, all_items };
};

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

export default connect(mapStateToProps, { fetchAllItems })(Untitled);
