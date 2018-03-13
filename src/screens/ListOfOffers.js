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
          <View style={styles.cardView}>
            <Image 
              source={require("../../assets/logo.png")}
              style={styles.profileImg}
              resizeMode="cover"
            />
            <View style={styles.titleArea}>
              <Text style={styles.cardTitle}> iPhone 6 </Text>
              <Text style={styles.cardSubtitle}> asking price: $245 </Text>
            </View>

            <View style={styles.sections}>
              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> See more... </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardView}>
            <Image 
              source={require("../../assets/logo.png")}
              style={styles.profileImg}
              resizeMode="cover"
            />
            <View style={styles.titleArea}>
              <Text style={styles.cardTitle}> Honda Accord 2014 50k miles </Text>
              <Text style={styles.cardSubtitle}> asking price: $92,000 </Text>
            </View>

            <View style={styles.sections}>
              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> See more... </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardView}>
            <Image 
              source={require("../../assets/logo.png")}
              style={styles.profileImg}
              resizeMode="cover"
            />
            <View style={styles.titleArea}>
              <Text style={styles.cardTitle}> iPhone 6 </Text>
              <Text style={styles.cardSubtitle}> asking price: $245 </Text>
            </View>

            <View style={styles.sections}>
              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> See more... </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardView}>
            <Image 
              source={require("../../assets/logo.png")}
              style={styles.profileImg}
              resizeMode="cover"
            />
            <View style={styles.titleArea}>
              <Text style={styles.cardTitle}> iPhone 6 </Text>
              <Text style={styles.cardSubtitle}> asking price: $245 </Text>
            </View>

            <View style={styles.sections}>
              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> See more... </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardView}>
            <Image 
              source={require("../../assets/logo.png")}
              style={styles.profileImg}
              resizeMode="cover"
            />
            <View style={styles.titleArea}>
              <Text style={styles.cardTitle}> iPhone 6 </Text>
              <Text style={styles.cardSubtitle}> asking price: $245 </Text>
            </View>

            <View style={styles.sections}>
              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> See more... </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardView}>
            <Image 
              source={require("../../assets/logo.png")}
              style={styles.profileImg}
              resizeMode="cover"
            />
            <View style={styles.titleArea}>
              <Text style={styles.cardTitle}> iPhone 6 </Text>
              <Text style={styles.cardSubtitle}> asking price: $245 </Text>
            </View>

            <View style={styles.sections}>
              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> Carl offered: $100,000,000 </Text>
              </View>

              <View style={styles.cardSection}>
                <Text style={styles.cardText}> See more... </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  root: {

  },

  cardView: {
    flexDirection: 'column', 
    flex: 1, 
    paddingVertical: 20, 
    margin: 20,
    marginBottom: 30,
    height: 300,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.33,
    shadowRadius: 5,
    elevation: 0,
  },

  profileImg: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 0,
    left: 0,
  },

  titleArea: {
    width: "50%"
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    position: "relative",
    left: 160,
    textAlign: 'left',
  },

  cardSubtitle: {
    fontSize: 16,
    position: "relative",
    left: 160,
  },

  sections: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  cardSection: {
    justifyContent: 'center',
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderColor: '#d6d7da',
  },

  cardText: {
    fontSize: 16,
    marginLeft: 15
  }
};