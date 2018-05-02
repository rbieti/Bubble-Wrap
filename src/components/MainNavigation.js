import React, { Component } from 'react';
import { StyleSheet, View, Platform, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-elements';
import { TabNavigator, StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import IconBadge from 'react-native-icon-badge';
import SearchScreen from '../screens/SearchScreen';
import AuthScreen from '../screens/AuthScreen';
import SignoutScreen from '../screens/SignoutScreen';
import CreateItemScreen from '../screens/CreateItemScreen';
import BuyItemScreen from '../screens/BuyItemScreen';
import ListOfOffers from '../screens/ListOfOffers';
import SingleOfferViewScreen from '../screens/SingleOfferViewScreen';
import ScaffoldingScreen from '../screens/ScaffoldingScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import EditProfileScreen from '../screens/EditProfileScreen';
import SellerScreen from '../screens/SellerProfileScreen';
import ChatMessengerScreen from '../screens/ChatMessengerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HandShakeScreen from '../screens/HandShakeScreen';
import MakeOfferScreen from '../screens/MakeOfferScreen';
import TransactionScreen from '../screens/TransactionScreen';
import CampusSafetyScreen from '../screens/CampusSafety';
import EditItemScreen from '../screens/EditItemScreen';
import { PRIMARY_COLOR } from '../constants/style';

class MainNavigation extends Component {

  render() {
    // Inner StackNavigator for search results
    const SearchScene = StackNavigator(
      {
        search: { screen: SearchScreen },
        buyItem: { screen: BuyItemScreen },
        shakenbake: { screen: HandShakeScreen },
        loo: { screen: ListOfOffers },
        soview: { screen: SingleOfferViewScreen },
        profile: { screen: ProfileScreen },
        seller: { screen: SellerScreen },
        messenger: { screen: ChatMessengerScreen },
        trans: { screen: TransactionScreen },
        mos: { screen: MakeOfferScreen },

        campusSafety: { screen: CampusSafetyScreen }
      },
      {
        navigationOptions: {
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerBackTitleStyle: { color: '#FFF' },
          headerTitleStyle: { color: '#FFF' },
          headerTintColor: '#FFF'
        }
      }
    );
    const OfferScene = StackNavigator(
      {
        loo: { screen: ListOfOffers },
        soview: { screen: SingleOfferViewScreen },
        profile: { screen: ProfileScreen },
        seller: { screen: SellerScreen },
        buyItem: { screen: BuyItemScreen },
        settings: { screen: SettingsScreen },
        messenger: { screen: ChatMessengerScreen },
        trans: { screen: TransactionScreen },
        mos: { screen: MakeOfferScreen },
        shakenbake: { screen: HandShakeScreen },
        campusSafety: { screen: CampusSafetyScreen }
      },
      {
        navigationOptions: {
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerBackTitleStyle: { color: '#FFF' },
          headerTitleStyle: { color: '#FFF' },
          headerTintColor: '#FFF'
        }
      }
    );
    const ProfileScene = StackNavigator(
      {
        profile: { screen: ProfileScreen },
        seller: { screen: SellerScreen },
        buyItem: { screen: BuyItemScreen },
        editItem: { screen: EditItemScreen },
        settings: { screen: SettingsScreen },
        messenger: { screen: ChatMessengerScreen },
        trans: { screen: TransactionScreen },
        soview: { screen: SingleOfferViewScreen },
        mos: { screen: MakeOfferScreen },
        search: { screen: SearchScreen },
        campusSafety: { screen: CampusSafetyScreen }
      },
      {
        navigationOptions: {
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerBackTitleStyle: { color: '#FFF' },
          headerTitleStyle: { color: '#FFF' },
          headerTintColor: '#FFF'
        }
      }
    );
    const { icon } = styles;
    const HomeScene = TabNavigator(
      {
        Home: {
          screen: SearchScene,
          navigationOptions: {
            tabBarIcon: () => <Icon name="home" style={icon} />
          }
        },
        Messages: {
          screen: ChatMessengerScreen,
          navigationOptions: {
            tabBarIcon: () => <Icon name="message" style={icon} />
          }
        },
        NewItem: {
          screen: CreateItemScreen,
          navigationOptions: {
            tabBarIcon: () => <Icon name="camera" style={icon} />
          }
        },
        Offers: {
          screen: OfferScene,
          navigationOptions: {
            tabBarIcon: () =>
              <IconBadge
                MainElement={<Icon name="price-tag" style={icon} />}
                BadgeElement={<Text style={{ color: '#FFF' }}>{this.props.newOffersCount}</Text>}
                Hidden={this.props.newOffersCount === 0}
              />
          }
        },
        Profile: {
          screen: ProfileScene,
          navigationOptions: {
            tabBarIcon: () => <Icon name="user" style={icon} />
          }
        }
      },
      {
        navigationOptions: {
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerBackTitleStyle: { color: '#FFF' },
          headerTitleStyle: { color: '#FFF' },
          headerTintColor: '#FFF'
        },
        tabBarPosition: 'bottom', // Android
        tabBarOptions: {
          showIcon: true, // Android
          showLabel: false
        }
      }
    );
    const ScaffoldingScene = StackNavigator(
      {
        locator: { screen: ScaffoldingScreen },
        createItem: { screen: CreateItemScreen },
        editItem: { screen: EditItemScreen },
        buyItem: { screen: BuyItemScreen },
        shakenbake: { screen: HandShakeScreen },
        loo: { screen: ListOfOffers },
        soview: { screen: SingleOfferViewScreen },
        profile: { screen: ProfileScreen },
        seller: { screen: SellerScreen },
        settings: { screen: SettingsScreen },
        messenger: { screen: ChatMessengerScreen },
        trans: { screen: TransactionScreen },
        mos: { screen: MakeOfferScreen },
        search: { screen: SearchScreen },
        campusSafety: { screen: CampusSafetyScreen }
      },
      {
        navigationOptions: {
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerBackTitleStyle: { color: '#FFF' },
          headerTitleStyle: { color: '#FFF' },
          headerTintColor: '#FFF'
        }
      }
    );

    // This component dictates the configuration of the drawer
    const customDrawerComponent = (props) => (
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: PRIMARY_COLOR,
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          <Image style={{ width: 150, height: 150 }} source={require('../../assets/logo.png')} />
        </View>

        <View>
          <Text h1 style={{ textAlign: 'center', marginTop: 10 }}>
            MENU
					</Text>
          <Divider style={{ backgroundColor: PRIMARY_COLOR }} />
          <DrawerItems {...props} />
        </View>
      </ScrollView>
    );

    // Main side drawer
    const MainDrawer = DrawerNavigator(
      {
        home: { screen: HomeScene },
        campusSafety: { screen: CampusSafetyScreen },
        signout: { screen: SignoutScreen }
      },
      {
        contentComponent: customDrawerComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
      }
    );

    // Top Level Navigator with slide functionality
    const MainNavigator = TabNavigator(
      {
        // navigate: { screen: ScaffoldingScene },
        auth: { screen: AuthScreen },
        main: { screen: MainDrawer }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        lazy: true, // Each screen will not mount/load until user clicks on them
        animationEnabled: false
      }
    );
    return (
      <MainNavigator onNavigationStateChange={null} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 24 : 0
  },

  icon: {
    color: '#000',
    fontSize: 24
  }
});


const mapStateToProps = (state) => {
  const { newOffersCount } = state.offers;
  return { newOffersCount };
};

export default connect(mapStateToProps)(MainNavigation);
