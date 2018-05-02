import React, { Component } from 'react';
import { StyleSheet, View, Platform, AsyncStorage, ScrollView, Text, Image, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { Divider } from 'react-native-elements';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/Entypo';
import store from './src/store';
import SearchScreen from './src/screens/SearchScreen';
import VendorScreen from './src/screens/VendorScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import SignoutScreen from './src/screens/SignoutScreen';
import CreateItemScreen from './src/screens/CreateItemScreen';
import BuyItemScreen from './src/screens/BuyItemScreen';
import ListOfOffers from './src/screens/ListOfOffers';
import SingleOfferViewScreen from './src/screens/SingleOfferViewScreen';
import ScaffoldingScreen from './src/screens/ScaffoldingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import SellerScreen from './src/screens/SellerProfileScreen';
import ChatMessengerScreen from './src/screens/ChatMessengerScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HandShakeScreen from './src/screens/HandShakeScreen';
import MakeOfferScreen from './src/screens/MakeOfferScreen';
import TransactionScreen from './src/screens/TransactionScreen';
import CampusSafetyScreen from './src/screens/CampusSafety';
import { GOOGLE_FIREBASE_CONFIG } from './src/constants/api_keys';
import { PRIMARY_COLOR } from './src/constants/style';
import EditItemScreen from './src/screens/EditItemScreen';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			fontLoaded: false
		};
		console.ignoredYellowBox = [ 'Setting a timer' ];
		console.disableYellowBox = true;
	}

	componentWillMount() {
		firebase.initializeApp(GOOGLE_FIREBASE_CONFIG); // Initialize firebase on app load
	}

	async componentDidMount() {
		await Font.loadAsync({
			Entypo: require('./node_modules/react-native-vector-icons/Fonts/Entypo.ttf'),
			FontAwesome: require('./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
			'Material Icons': require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
			MaterialIcons: require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
			Ionicons: require('./node_modules/react-native-vector-icons/Fonts/Ionicons.ttf')
		});

		this.setState({ fontLoaded: true });
	}

	// Main render method
	render() {
		if (!this.state.fontLoaded) {
			return null;
		}

		const { icon } = styles;

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
						tabBarIcon: () => <Icon name="price-tag" style={icon} />
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
					<Image style={{ width: "100%", height: 150 }} source={require('./assets/logo.png')} />
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
			<Provider store={store}>
				<View style={styles.container}>
					<MainNavigator onNavigationStateChange={null} />
				</View>
			</Provider>
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
