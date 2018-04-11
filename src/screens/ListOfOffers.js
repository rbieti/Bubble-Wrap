import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, AppRegistry, Dimensions, Switch, TextInput, Button} from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/style';
import { Cell, Section, TableView, } from 'react-native-tableview-simple';
import firebase from 'firebase';
import { fetchAllItems } from '../actions/user_items_actions';

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

  render() {
    return (
      <ScrollView contentContainerStyle={styles.verticalScroll}>
        <ScrollView style={styles.horizontalScroll} horizontal={true} pagingEnabled={false}>
          {this.renderItems()}
        </ScrollView>

        <ScrollView style={styles.horizontalScroll} horizontal={true} pagingEnabled={false}>
          {this.renderItems()}
        </ScrollView>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { items, all_items } = state.userItems;
  return { items, all_items };
};

const styles = {
  horizontalScroll: {
    height: 250,
    marginTop: 20,
  },

  card: {
    flex: 1, 
    height: "100%",
    width: 180,
    height: 180,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12, 
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.33,
    shadowRadius: 5,
  },

  cardImg: {
    height: 70,
    width: 70,
    marginBottom: 20,
  },

  cardText: {
    fontSize: 16,
  }
};

export default connect(mapStateToProps, { fetchAllItems })(Untitled);
