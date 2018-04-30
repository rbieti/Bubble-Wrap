import React, {
  Component
} from 'react';
import { PRIMARY_COLOR } from '../constants/style';
import {
  ActivityIndicator,
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import {
  Cell,
  Section,
  TableView,
  ListView
} from 'react-native-tableview-simple';
import { connect } from 'react-redux';
import { Rating } from 'react-native-elements';
import firebase from 'firebase';

class RateTransactionScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'My Profile',
    tabBarLabel: 'Profile',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

 ratingCompleted(rating){
   console.log("Rating is:" + rating);
 }
 

  render() {
    const { navigate } = this.props.navigation;
    const { name, overallRating, profileURL, bubbleCommunity, numTransactions, email } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.rating}>
          <Rating
            showRating
            type="star"
            startingValue={0}
            imageSize={40}
            ratingColor='#3498db'
            ratingBackgroundColor='#c8c7c8'
            onFinishRating={this.ratingCompleted}
            style={{ paddingVertical: 10 }}
          />
        </View>
          <TextInput
                style={styles.textInput}
                multiline = {true}
                placeholder="Enter your review here"
                onChangeText={(text) => this.setState({text})}
              />
        <View style={styles.review}>

        </View>
          <TouchableOpacity
            style={styles.submitRevBtn}
            onPress={() => {console.log("Button Pressed")}}
            >
            <Text style={styles.btnText}>Submit Review</Text>
          </TouchableOpacity>

          
      </View>
    );
  }
}

const profileImgWidth = 100;
const reviewerImgWidth = 60;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    flex: 1
  },

  rating: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  review: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    width: "80%",
    height: 200,
    textAlign: "left",
  },


  submitRevBtn: {
    backgroundColor: "#33a3f3",
    width: "80%",
    height: 100,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    bottom: 60,
  },

  btnText: {
    alignItems: 'center',
		justifyContent: 'center',
		color: '#fff',
		fontSize: 20
  }

  

  
});

// const mapStateToProps = (state) => {
//  return ;
// };

export default RateTransactionScreen;
