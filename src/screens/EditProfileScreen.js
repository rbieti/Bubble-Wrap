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
  import { fetchItems } from '../actions/user_items_actions';
  import { fetchUser, loadUID, fetchUserReviews, findUserName } from '../actions/user_profile_actions';
  
  class ProfileScreen extends Component {
  
    static navigationOptions = ({ navigation }) => ({
      title: 'Edit My Profile',
      //tabBarIcon: { focused: 'user', tintColor: 'black' },
      tabBarLabel: 'Profile',
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center'
      }
    });
  
    async componentDidMount() {
      this.props.fetchUser();
      this.props.loadUID();
      //this.props.findUserName(); //This needs to be updated
    }
  
    loadUsername() {
      const { name } = this.props;
      return (
        <Text style={styles.userNameLbl}>{`${name}`}</Text>
      )
      
    }
  
    render() {
      const { navigate } = this.props.navigation;
      const { overallRating, profileURL, bubbleCommunity, numTransactions, email } = this.props;
      return (
        <View style={styles.root}>
          <View style={styles.headerView}>
            <Image
              source={{ uri: profileURL }}
              style={styles.profileImg}
              resizeMode="cover"
            />
  
            {this.loadUsername()}
            <Text style={styles.userUniversityLbl}>Your bubble: {bubbleCommunity}</Text>
            <Text style={styles.userUniversityLbl}>{email}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnOpacity}
            onPress={() => {console.log("Save User Profile")}}
            >
            <Text style={styles.btnText}>
              Save Profile
            </Text>
          </TouchableOpacity>
          
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
  
    /* Universal Styles */
    h1Lbl: {
      fontWeight: 'bold',
      color: '#000',
    },
    /* End Universal Styles */
  
    /* Header Section */
    headerView: {
      backgroundColor: '#37474F',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    profileImg: {
      width: profileImgWidth,
      height: profileImgWidth,
      borderRadius: profileImgWidth / 2,
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

    btnOpacity: {
      backgroundColor: "#3bf", // random color each time
      height: 60,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0

    },
  
    btnText: {
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 20,
    }
    
  });
  
  const mapStateToProps = (state) => {
    const { items } = state.userItems;
    const { name, overallRating, 
      bubbleCommunity, numTransactions, profileURL, email } = state.user;
    const { userID } = state.load_uid;
    const { reviews } = state.fetch_user_reviews;
    const { username } = state.find_user_name;
    return { 
      items, 
      name,
      overallRating,
      bubbleCommunity,
      numTransactions,
      profileURL,
      userID,
      reviews,
      username,
      email
     };
  };
  
  export default connect(mapStateToProps, { fetchItems, fetchUser, loadUID, fetchUserReviews, findUserName })(ProfileScreen);
  