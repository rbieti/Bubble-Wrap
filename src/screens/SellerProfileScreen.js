import React, { Component } from 'react';
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
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { connect } from 'react-redux';
import { loadItem, fetchItems } from '../actions/buy_items_actions';
import { loadSeller } from '../actions/user_profile_actions';

class SellerProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Seller Profile',
    tabBarLabel: 'Seller Profile',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  async componentDidMount() {
    // TR: hard coded user id of the current seller
    const uid = { uid: '9noTvky17kfVx2KRXIUIOjhDkW82' };
    this.props.fetchItems(uid);
  }

  loadReviews() {
    const { seller } = this.props;
    const { reviews } = seller;
    let sellerName = '';
    return Object.values(reviews).map(({ key, comment, rating, userId }) => (
      <TouchableOpacity
        onPress={() => {
          console.log(userId);
          this.props.loadSeller(userId);
          this.props.navigation.navigate('seller'); 
        }}
        key={key}
      >
        <View style={styles.reviewCell} >
          <Image
            source={{url: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/12669716_1237006402982393_3217046914981297038_n.jpg?_nc_cat=0&oh=b05a93c391dc723f390016b5eef6122b&oe=5B65D228'}}
            style={styles.reviewerImg}
            resizeMode="cover"
          />
          <Text style={styles.h1Lbl}>{`${sellerName}`}</Text>
          <Text style={styles.h1Lbl}>{`${rating}/5`}</Text>
          <Text style={styles.h1Lbl}>{`${comment}`}</Text>
        </View>
      </TouchableOpacity>
    ));
  }

  renderItems() {
    return this.props.items.map((item) => (
      <TouchableOpacity
        key={item.key}
        onPress={() => {
          this.props.loadItem(item);
          this.props.navigation.navigate('buyItem');
        }}
      >
        <View style={styles.reviewCell}>
        {!!item.images[0] &&
          <Image
            source={{ uri: item.images[0].url }}
            style={styles.reviewerImg}
            resizeMode="cover"
          />}
          <Text style={styles.h1Lbl}>{`${item.name} | $${item.price}`}</Text>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    const { navigate } = this.props.navigation; // THIS IS NECESSARY FOR NAVIGATION
    const { seller } = this.props;
    const { name, bubbleCommunity, overallRating, profileURL, reviews, email, numTransactions, strikeCount } = seller;
    return (
      <View style={styles.root}>
        <View style={styles.headerView}>
          <Image 
          source={{ uri: profileURL }} 
          style={styles.profileImg} 
          resizeMode="cover" 
          />

          <Text style={styles.userNameLbl}>{`${name}`}</Text>
          <Text style={styles.userUniversityLbl}>{`Bubble Community: ${bubbleCommunity}`}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.tableViewScroll}>
          <View style={styles.scrollSection}>
            <Text style={styles.scrollSectionLbl}>{`${name}'s trustworthiness rating: ${overallRating}/5`}</Text>
            <ScrollView
              style={styles.horizontalScrollView}
              automaticallyAdjustInsets={true}
              horizontal={true}
              pagingEnabled={true}
              scrollEnabled={true}
              decelerationRate={0.5}
              scrollEventThrottle={16}
            >
            
             {this.loadReviews()}
            </ScrollView>
          </View>

          <View style={styles.scrollSection}>
            <Text style={styles.scrollSectionLbl}>{`${name}'s Items for Sale`}</Text>
            <ScrollView
              style={styles.horizontalScrollView}
              automaticallyAdjustInsets={true}
              horizontal={true}
              pagingEnabled={true}
              scrollEnabled={true}
              decelerationRate={0.5}
              scrollEventThrottle={16}
            >
              {this.renderItems()}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

let profileImgWidth = 100;
let reviewerImgWidth = 60;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#EFEFF4',
    flex: 1
  },

  /* Universal Styles */
  h1Lbl: {
    fontWeight: 'bold',
    color: '#000'
  },
  /* End Universal Styles */

  /* Header Section */
  headerView: {
    backgroundColor: '#37474F',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },

  profileImg: {
    width: profileImgWidth,
    height: profileImgWidth,
    borderRadius: profileImgWidth / 2
  },

  userNameLbl: {
    color: '#fff',
    marginTop: 12,
    fontWeight: 'bold'
  },

  userUniversityLbl: {
    color: '#fff',
    marginTop: 0,
    fontStyle: 'italic'
  },
  /* End Header Section */

  /* Main Content */
  tableViewScroll: {
    backgroundColor: '#EFEFF4',
    paddingBottom: 20
  },

  scrollSection: {
    height: 220,
    marginTop: 20,
    paddingTop: 15,
    backgroundColor: '#fff'
  },

  scrollSectionLbl: {
    fontWeight: 'bold',
    paddingLeft: 15
  },

  reviewCell: {
    height: 150,
    width: 180,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    margin: 15,
    padding: 20
  },

  reviewerImg: {
    width: reviewerImgWidth,
    height: reviewerImgWidth,
    borderRadius: reviewerImgWidth / 2,
    marginBottom: 5
  },

  reviewerTxt: {
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic'
  }
  /* End Main Content*/
});

const mapStateToProps = (state) => {
  const { items } = state.buyItems;
  const { seller } = state.user;
  return { items, seller };
};

export default connect(mapStateToProps, {
  loadItem,
  fetchItems,
  loadSeller,
})(SellerProfileScreen);
