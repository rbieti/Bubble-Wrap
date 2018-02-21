import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  AsyncStorage,
  ScrollView,
  Text,
  Image
} from 'react-native';
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
  DrawerItems
} from 'react-navigation';
import { Divider } from 'react-native-elements';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { Font } from 'expo';
import store from './src/store';
import SearchScreen from './src/screens/SearchScreen';
import VendorScreen from './src/screens/VendorScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import SignoutScreen from './src/screens/SignoutScreen';
import CreateItemScreen from './src/screens/CreateItemScreen';
import EditItemScreen from './src/screens/EditItemScreen';
import BuyItemScreen from './src/screens/BuyItemScreen';
import ListOfOffers from './src/screens/ListOfOffers';
import SingleOfferViewScreen from './src/screens/SingleOfferViewScreen';
import ScaffoldingScreen from './src/screens/ScaffoldingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SellerScreen from './src/screens/SellerProfileScreen';
import ChatMessengerScreen from './src/screens/ChatMessengerScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HandShakeScreen from './src/screens/HandShakeScreen';
import MakeOfferScreen from './src/screens/MakeOfferScreen';
import TransactionScreen from './src/screens/TransactionScreen';
import CampusSafetyScreen from './src/screens/CampusSafety';
import { GOOGLE_FIREBASE_CONFIG } from './src/constants/api_keys';
import { PRIMARY_COLOR } from './src/constants/style';

export default class App extends React.Component {
  //////////////////////////////////////////////////////////////////////////////
  // Setup some warnings to ignore
  // https://github.com/firebase/firebase-js-sdk/issues/97
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
    console.ignoredYellowBox = ['Setting a timer'];
  }
  //////////////////////////////////////////////////////////////////////////////
  // Upon loading app, initialize firebase
  componentWillMount() {
    // DTG - Debugging

    firebase.initializeApp(GOOGLE_FIREBASE_CONFIG);

    //console.log('App.js: Signing Out');
    //AsyncStorage.removeItem('fb_token'); // Just used for testing to clear item
    //SecureStore.deleteItemAsync('fb_token'); // Just used for testing to clear item
    //firebase.auth().signOut();
  }

  // TR: Make fonts work in Expo: https://github.com/oblador/react-native-vector-icons/issues/523
  async componentDidMount() {
    await Font.loadAsync({
      Entypo: require('./node_modules/react-native-vector-icons/Fonts/Entypo.ttf'),
      FontAwesome: require('./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
      'Material Icons': require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
      MaterialIcons: require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
      Ionicons: require('./node_modules/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Main render method
  render() {
    // TR: Make sure fonts load
    if (!this.state.fontLoaded) {
      return null;
    }

    //////////////////////////////////////////////////////////////////////////////
    // Inner StackNavigator for search results
    const HomeScene = StackNavigator(
      {
        search: { screen: SearchScreen },
        vendor: { screen: VendorScreen }
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
        trans: { screen:TransactionScreen },
        mos: { screen:MakeOfferScreen },
        search: { screen:SearchScreen },
        campusSafety: {screen: CampusSafetyScreen }
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

    //////////////////////////////////////////////////////////////////////////////
    // This component dictates the configuration of the drawer
    const customDrawerComponent = props => (
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: PRIMARY_COLOR,
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require('./assets/logo.png')}
          />
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

    //////////////////////////////////////////////////////////////////////////////
    // Main side drawer
    const MainDrawer = DrawerNavigator(
      {
        home: { screen: HomeScene },
        signout: { screen: SignoutScreen }
      },
      {
        contentComponent: customDrawerComponent,
        // contentOptions: {
        //   activeTintColor: { color: '#F00' }
        // }
        // TR: https://github.com/react-navigation/react-navigation/issues/3148
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
      }
    );

    //////////////////////////////////////////////////////////////////////////////
    // Top Level Navigator
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        navigate: { screen: ScaffoldingScene },
        
        auth: { screen: AuthScreen },
        main: { screen: MainDrawer }
      },
      {
        navigationOptions: {
          tabBarVisible: true
        },
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        lazy: true, // Each screen will not mount/load until user clicks on them
        animationEnabled: false
      }
    );

    // NOTE: onNavigationStateChange={null} disables Navigator debug logging
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator onNavigationStateChange={null} />
        </View>
      </Provider>
    );
  }
}

//////////////////////////////////////////////////////////////////////////////
// Style object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 25
    marginTop: Platform.OS === 'android' ? 24 : 0
  }
});
