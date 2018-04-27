import { connect } from 'react-redux';
import React, { Component } from 'react';
import { PRIMARY_COLOR } from '../constants/style';
import firebase from 'firebase';
import { Icon, FormLabel, FormInput, Button, List, ListItem} from 'react-native-elements';
import { ActivityIndicator, AppRegistry, Dimensions, Image, ScrollView, StyleSheet, Switch, Text, TextInput, View, TouchableOpacity, FlatList} from 'react-native';
import { fetchAllItems } from '../actions/user_items_actions';
import { loadItem } from '../actions/buy_items_actions';
import { fetchUsers } from '../actions/user_profile_actions';

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
  }

  renderItems() {
    const { all_items } = this.props;
    return all_items.map((item) => (
      <TouchableOpacity key={item.key} onPress={() => { this.props.loadItem(item); this.props.navigation.navigate('buyItem'); }}>
        <View style={styles.itemCell}>
          <Image
            source={{ uri: item.images[0].url }}
            style={styles.itemImg}
            resizeMode="cover"
          />
          <Text style={styles.itemLbl}>{`${item.name} | $${item.price}`}</Text>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.root}>
        <FormLabel>Item Search</FormLabel>
        <FormInput itemholder="What are you looking for?"/>

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

const styles = StyleSheet.create({
  root: { 
    backgroundColor: "#EFEFF4", 
    flex: 1
  },

  bottom: {
    width: "100%",
    height: "100%",
    marginTop: 20,
  },

  items: {
    height: "100%",
    width: "100%",
    backgroundColor: '#fff',
  },

  itemCell: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: "#fafafa",
    width: 300,
    height: 250,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemImg: {
    width: "80%",
    height: "80%",
  },
  itemLbl: {
    marginTop: 12,
    fontSize: 20
  }
});

const mapStateToProps = (state) => {
  const { all_items } = state.userItems;
  return { all_items };
};

export default connect(mapStateToProps, { fetchAllItems, loadItem, fetchUsers })(SearchScreen);
