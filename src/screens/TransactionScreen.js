import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Button,TouchableOpacity, Image, ScrollView} from "react-native";
import { PRIMARY_COLOR } from '../constants/style';

class TransactionScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    //tabBarVisible: false,
    title: 'Transaction',
    tabBarLabel: 'Transaction',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  onButtonPress() {
    this.props.navigation.navigate('shakenbake');
  }
    
  render() {
    const { navigate } = this.props.navigation;
    const { name, images } = this.props.item;
    const { name: sellerName, amount } = this.props.offer;
    return (
      <View style={styles.root}>
        <ScrollView style={styles.mainView}> 
          <View style={styles.headerView}>
            <View style={styles.horizontalText}>
              <Text style={styles.headerTxt}>Confirm payment to </Text>
              <Text style={styles.sellerNameTxt}>{sellerName}</Text> 
            </View>
            <Text style={styles.priceTxt}>${amount}</Text>
            <Text style={styles.itemTxt}>{name}</Text> 
          </View>

          <Image style={styles.itemImg} source={{ uri: images[0].url }} />

          <View style={styles.buttonsView}>
            <TouchableOpacity style={styles.btnOpacity} onPress={this.onButtonPress.bind(this)}>
              <Text style={styles.btnText}>Confirm Transaction</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  mainView: {
    position: 'relative',
    width: "100%",
    height: "100%",
  },

  /* Header Area */
  headerView: {
    width: window.width,
    height: 135,
  },
  horizontalText: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  headerTxt: {
    fontSize: 20,
  },
  sellerNameTxt: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  priceTxt: {
    width: "100%",
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemTxt: {
    width: "100%",
    textAlign: 'center',
    marginBottom: 20,
  },
  /* End: Header Area */

  itemImg: {
    width: window.width,
    height: window.width,
    marginBottom: 20,
  },

  buttonsView: {
    flex: 1,
    alignItems: 'center',
  },

  btnOpacity: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 70,
    width: "80%",
    backgroundColor: "#33a3f3",
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },

  orTxt: {
    marginTop: 10,
    marginBottom: 10,
  }
});

const mapStateToProps = (state) => {
  const { item } = state.buyItems;
  const { offer } = state.offers;
  return { item, offer };
};

export default connect(mapStateToProps)(TransactionScreen);
