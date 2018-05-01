import { connect } from 'react-redux';
import React, { Component } from 'react';
import { PRIMARY_COLOR } from '../constants/style';
import firebase from 'firebase';
import { Icon, FormLabel, FormInput, Button, List, ListItem} from 'react-native-elements';
import { ActivityIndicator, AppRegistry, Dimensions, Image, ScrollView, StyleSheet, Switch, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, FlatList, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { fetchAllItems } from '../actions/user_items_actions';
import { loadItem } from '../actions/buy_items_actions';
import { fetchUsers } from '../actions/users_actions';

class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search',
    tabBarLabel: 'Search',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  componentDidMount() {
    this.props.fetchAllItems();
    this.props.fetchUsers();
  }

  renderItems() {
    const { all_items } = this.props;
    return all_items.map((item) => (
      <TouchableOpacity 
        style={styles.card}
        key={item.key} 
        onPress={() => { this.props.loadItem(item); this.props.navigation.navigate('buyItem'); }}
      >
        <Image source={{ uri: item.images[0].url }} style={styles.cardImg} />
        <View style={styles.textBackground}>
          <Text style={styles.cardText}>{`${item.name} | $${item.price}`}</Text>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.root}>
        <FormLabel>Item Search</FormLabel>
        <FormInput itemHolder="What are you looking for?"/>
        <Button
          title="Search"
          icon={{ name: 'search' }}
          backgroundColor={PRIMARY_COLOR}
          onPress={() => { }}
        />

      <View style={styles.bottom}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
          style={styles.items}
          pagingEnabled={false}
        >
          {this.renderItems()}
          <View style={{ height: 130 }} />
        </ScrollView>
      </View> 
    </View> 
    );
  }
}

const cardWidth = 250;
const cardHeight = cardWidth;

const styles = StyleSheet.create({
  root: { 
    backgroundColor: "#EFEFF4", 
    flex: 1
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height: null,
    width: null,
  },

  bottom: {
    width: "100%",
    height: "100%",
    marginTop: 20,
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
    marginBottom: 40,
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  }
});

const mapStateToProps = (state) => {
  const { all_items } = state.userItems;
  return { all_items };
};

export default connect(mapStateToProps, { fetchAllItems, loadItem, fetchUsers })(SearchScreen);
