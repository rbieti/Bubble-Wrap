import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  AsyncStorage,
  ScrollView,
  Text,
  Image
} from "react-native";
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
  DrawerItems
} from "react-navigation";
import { Divider } from "react-native-elements";
import { Provider } from "react-redux";
import firebase from "firebase";

import store from "./src/store";
import SearchScreen from "./src/screens/SearchScreen";
import SearchResultsScreen from "./src/screens/SearchResultsScreen";
import VendorScreen from "./src/screens/VendorScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AuthScreen from "./src/screens/AuthScreen";
import SignoutScreen from "./src/screens/SignoutScreen";

import { GOOGLE_FIREBASE_CONFIG } from "./src/constants/api_keys";
import { PRIMARY_COLOR } from "./src/constants/style";

export default class App extends React.Component {
  //////////////////////////////////////////////////////////////////////////////
  // Setup some warnings to ignore
  // https://github.com/firebase/firebase-js-sdk/issues/97
  constructor() {
    super();
    console.ignoredYellowBox = ["Setting a timer"];
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

  //////////////////////////////////////////////////////////////////////////////
  // Main render method
  render() {
    //////////////////////////////////////////////////////////////////////////////
    // Inner StackNavigator for search results
    const HomeScene = StackNavigator(
      {
        search: { screen: SearchScreen },
        searchResults: { screen: SearchResultsScreen },
        vendor: { screen: VendorScreen }
      },
      {
        navigationOptions: {
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerBackTitleStyle: { color: "#FFF" },
          headerTitleStyle: { color: "#FFF" },
          headerTintColor: "#FFF"
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
            alignItems: "center",
            alignContent: "center"
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require("./assets/logo.png")}
          />
        </View>

        <View>
          <Text h1 style={{ textAlign: "center", marginTop: 10 }}>
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
        contentComponent: customDrawerComponent
        // contentOptions: {
        //   activeTintColor: { color: '#F00' }
        // }
      }
    );

    //////////////////////////////////////////////////////////////////////////////
    // Top Level Navigator
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: { screen: MainDrawer }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        tabBarPosition: "bottom",
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
    backgroundColor: "#fff",
    //alignItems: 'center',
    justifyContent: "center",
    //marginTop: 25
    marginTop: Platform.OS === "android" ? 24 : 0
  }
});
