import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, AppRegistry, Dimensions, Switch, TextInput, Button} from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/style';
import { Cell, Section, TableView, } from 'react-native-tableview-simple';

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

export default class Untitled extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Offers',
    tabBarLabel: 'Offers',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    },
  });

  render() {
    return (
      <View style={styles.root}>
        <ScrollView>
          <TableView>
            <Section>
              <CellVariant title="Element 1" />
              <CellVariant title="Element 2" />
              <CellVariant title="Element 3" />
              <CellVariant title="Element 4" />
            </Section>
          </TableView>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  root: {

  },

  customCell: {
     alignItems: 'center', 
     justifyContent: 'center', 
     flexDirection: 'column', 
     flex: 1, 
     paddingVertical: 5, 
     margin: 0, 
     height: 200 
  }

  cellText: {
    justifyContent: "center",
    alignItems: "center",
  }
};