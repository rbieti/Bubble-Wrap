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
import { fetchUser } from '../actions/user_profile_actions';

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
  }

  loadUsername() {
    const { name } = this.props;
    return (
      <Text style={styles.userNameLbl}>{`${name}`}</Text>
    )
  }

  renderItems() {
    const { items } = this.props;
    return items.map(({ key, name, price, images }) => (
      <TouchableOpacity
        key={key}
        onPress={() => { this.props.navigation.navigate('editItem'); }}
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
    const { overallRating, profileURL, bubbleCommunity, numTransactions } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {firebase.auth().signOut();}}
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
              <TouchableOpacity
                onPress={() => { navigate('seller'); }}
              >
                <View style={styles.reviewCell}>
                  <Image
                    source={require("../../assets/icon-profile.png")}
                    style={styles.reviewerImg}
                    resizeMode="cover"
                  />
                  <Text style={styles.h1Lbl}>Robert</Text>
                  <Text style={styles.h1Lbl}>4/5</Text>
                  <Text style={styles.reviewerTxt}>"Item was exactly as described!"</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { navigate('seller'); }}
              >
                <View style={styles.reviewCell}>
                  <Image
                    source={require("../../assets/icon-profile.png")}
                    style={styles.reviewerImg}
                    resizeMode="cover"
                  />
                  <Text style={styles.h1Lbl}>Trevor</Text>
                  <Text style={styles.h1Lbl}>5/5</Text>
                  <Text style={styles.reviewerTxt}>"Thanks for selling me your car!"</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { navigate('seller'); }}
              >
                <View style={styles.reviewCell}>
                  <Image
                    source={require("../../assets/icon-profile.png")}
                    style={styles.reviewerImg}
                    resizeMode="cover"
                  />
                  <Text style={styles.h1Lbl}>Andrew</Text>
                  <Text style={styles.h1Lbl}>3/5</Text>
                  <Text style={styles.reviewerTxt}>"Kyle was very nice and reasonable."</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { navigate('seller'); }}
              >
                <View style={styles.reviewCell}>
                  <Image
                    source={require("../../assets/icon-profile.png")}
                    style={styles.reviewerImg}
                    resizeMode="cover"
                  />
                  <Text style={styles.h1Lbl}>Joshua</Text>
                  <Text style={styles.h1Lbl}>5/5</Text>
                  <Text style={styles.reviewerTxt}>"Went out of his way to be helpful."</Text>
                </View>
              </TouchableOpacity>
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

          <TableView>
            <Section header="CONTACT INFORMATION" footer="">
              <Cell
                cellStyle="Basic"
                title="Update your profile picture"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Add a phone number"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Add an email address"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Add a payment method"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Connect your Facebook account"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
            </Section>
          </TableView>
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
    bubbleCommunity, numTransactions, profileURL } = state.user;
  return { 
    items, 
    name,
    overallRating,
    bubbleCommunity,
    numTransactions,
    profileURL
   };
};

export default connect(mapStateToProps, { fetchItems, fetchUser })(ProfileScreen);
