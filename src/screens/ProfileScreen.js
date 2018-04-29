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
import firebase from 'firebase';
import { fetchItems } from '../actions/user_items_actions';
import { fetchUser, fetchUserReviews, findUserName, loadSeller, fetchUsers } from '../actions/user_profile_actions';

class ProfileScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'My Profile',
    tabBarLabel: 'Profile',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  async componentDidMount() {
    this.props.fetchItems();
    this.props.fetchUser();
    this.props.fetchUserReviews();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reviewsFetched !== this.props.reviewsFetched) {
      const userReviewerKeys = this.props.reviews.map(({ reviewerId }) => reviewerId);
      this.props.fetchUsers({ userKeys: userReviewerKeys, reducerPlacement: 'reviews' });
    }
  }

  loadUsername() {
    const { name } = this.props;
    return (
      <Text style={styles.userNameLbl}>{`${name}`}</Text>
    )
  }

  loadReviews() {
    const { reviews } = this.props;
    
    return reviews.map(({ key, comment, rating, userId, reviewerId, name, profileURL }) => (
      <TouchableOpacity
        onPress={() => {
          this.props.loadSeller(reviewerId);
          this.props.navigation.navigate('seller'); 
        }}
        key={key}
      >
        <View style={styles.reviewCell} >
          <Image
            source={{ uri: profileURL }}
            style={styles.reviewerImg}
            resizeMode="cover"
          />
          <Text style={styles.h1Lbl}>{name}</Text>
          <Text style={styles.h1Lbl}>{rating}/5</Text>
          <Text style={styles.h1Lbl}>{comment}</Text>
        </View>
      </TouchableOpacity>
    ));
  }



  renderItems() {
    const { items } = this.props;
    return items.map(({ key, name, price, images }) => (
      <TouchableOpacity
        key={key}
        onPress={() => { this.props.navigation.navigate('editItem'); }}
        key={key}
      >
        <View style={styles.reviewCell}>
          <Image
            source={{ uri: images[0].url }}
            style={styles.reviewerImg}
            resizeMode="cover"
          />
          <Text style={styles.h1Lbl}>{`${name} | $${price}`}</Text>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    const { navigate } = this.props.navigation;
    const { name, overallRating, profileURL, bubbleCommunity, numTransactions, email } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              try {
                firebase.auth().signOut();
              } catch(e) {
                alert("Error signing out");
              }
            }}
            style = {styles.signOutBtn}
          >
            <Text style={{color: "black", fontWeight: "bold"}}>Sign out</Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log(this.props.profileURL)}}
          >
            <Image
              source={{ uri: profileURL }}
              style={styles.profileImg}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {this.loadUsername()}
          <Text style={styles.userUniversityLbl}>Your bubble: {bubbleCommunity}</Text>
          <Text style={styles.userUniversityLbl}>{email}</Text>
        </View>
        
        <ScrollView contentContainerStyle={styles.tableViewScroll}>
          <View style={styles.reviewsView}>
            <Text style={styles.h1Lbl}>Your trustworthiness rating: {overallRating}/5</Text>
            <ScrollView
              style={styles.reviewsScroll}
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

          <View style={styles.reviewsView}>
            <Text style={styles.h1Lbl}>Items you are selling</Text>
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

const profileImgWidth = 100;
const reviewerImgWidth = 60;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#EFEFF4",
    flex: 1
  },

  h1Lbl: {
    fontWeight: 'bold',
    color: '#000',
  },

  /* Header Section */
  headerView: {
    backgroundColor: '#37474F',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signOutBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    height: 40,
    padding: 8,
    backgroundColor: "#fefefe",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImg: {
    width: profileImgWidth,
    height: profileImgWidth,
    borderRadius: profileImgWidth / 2,
  },

  editProfile: {
    position: 'absolute',
    top:12,
    right:12,
    height:25,
    width: 25,
    zIndex: 2
  },

  icon:{
    height: '100%',
    width: '100%'
  },

  userNameLbl: {
    color: '#fff',
    marginTop: 12,
    fontWeight: 'bold',
  },

  userUniversityLbl: {
    color: '#fff',
    marginTop: 0,
    fontStyle: 'italic',
  },
  /* End Header Section */

  tableViewScroll: {
    backgroundColor: '#EFEFF4',
    paddingBottom: 20,
  },

  reviewsView: {
    height: 220,
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
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
    padding: 20,
  },

  reviewerImg: {
    width: reviewerImgWidth,
    height: reviewerImgWidth,
    borderRadius: reviewerImgWidth / 2,
    marginBottom: 5,
  },

  reviewerTxt: {
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  }

});

const mapStateToProps = (state) => {
  const { items } = state.userItems;
  const { name, overallRating, 
    bubbleCommunity, numTransactions, 
    profileURL, email, reviewsFetched, 
    reviews, username } = state.user;
  return { 
    items, 
    name,
    overallRating,
    bubbleCommunity,
    numTransactions,
    profileURL,
    reviews,
    username,
    email,
    reviewsFetched
   };
};

export default connect(mapStateToProps, { fetchItems, fetchUser, fetchUserReviews, findUserName, fetchUsers, loadSeller })(ProfileScreen);
