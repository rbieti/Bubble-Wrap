import { connect } from 'react-redux';
import React, { Component } from 'react';
import { PRIMARY_COLOR } from '../constants/style';
import firebase from 'firebase';
import { Icon, FormLabel, FormInput, Button, List, ListItem} from 'react-native-elements';
import { ActivityIndicator, AppRegistry, Dimensions, Image, ScrollView, StyleSheet, Switch, Text, TextInput, View, TouchableOpacity, FlatList} from 'react-native';
import { Cell, Section, TableView} from 'react-native-tableview-simple';

export const fetchAllItems = () => {
  firebase.database().ref('/items') // NOT SCALABLE //
    .on('value', snapshot => {
      const items = [];
      snapshot.forEach(item => {
        const { /* user, */ images } = item.val();
        const imageArray = Object.values(images).sort((a, b) => (a.index > b.index ? 1 : -1)); // sort by index
        items.push({ ...item.val(), images: imageArray, key: item.key });
        console.log(item.val());  // debug
      });
    });
};

export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search',
    tabBarLabel: 'Search',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  state = { item: '', location: '' };

  render() {
    return (
      <View style={styles.root}>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Item Search</FormLabel>
          <FormInput
            itemholder="What are you looking for?"
            value={this.state.item}
            onChangeText={item => this.setState({ item })}
          />
        </View>

        <Button
          title="Search"
          icon={{ name: 'search' }}
          backgroundColor={PRIMARY_COLOR}
          onPress={() => { } }
        />

        <View style={styles.bottom}>
          <TableView>
            <Section header="" footer="">
              <Cell
                onPress={() => console.log('Heyho!')}
                contentContainerStyle={{ alignItems: 'center', height: 60 }}
                cellContentView={
                  <Text style={{ flex: 1, fontSize: 16 }}>
                    Item Listing with Image
                  </Text>
                }
                image={
                  <Image
                    style={{ borderRadius: 5 }}
                    source={require("../../assets/logo.png")}
                  />
                }
              />

              <Cell
                onPress={() => console.log('Heyho!')}
                contentContainerStyle={{ alignItems: 'center', height: 60 }}
                cellContentView={
                  <Text style={{ flex: 1, fontSize: 16 }}>
                    Item Listing with Image
                  </Text>
                }
                image={
                  <Image
                    style={{ borderRadius: 5 }}
                    source={require("../../assets/logo.png")}
                  />
                }
              />
            </Section>
          </TableView>
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
  }
});
