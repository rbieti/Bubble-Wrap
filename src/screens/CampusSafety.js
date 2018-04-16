import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

export default class CampusSafety extends Component {
	safeSpace = [
		{
			lat: 34.1301,
			long: -117.8884,
			title: 'Apu',
			rad: 50
		},
		{
			lat: 34.1304,
			long: -117.8886,
			title: 'Apu two',
			rad: 50
		}
	];
	safeCircle = [
		{
			lat: 34.1301,
			long: -117.8884,
			title: 'Apu',
			rad: 50
		},
		{
			lat: 34.1304,
			long: -117.8886,
			title: 'Apu two',
			rad: 50
		}
	];
	static navigationOptions = ({ navigation }) => ({
		title: 'Campus Safety',
		tabBarLabel: 'Campus Safety',
		headerTitleStyle: {
			textAlign: 'center',
			alignSelf: 'center'
		}
	});

	renderMarkers() {
		return this.safeSpace.map((space) => (
			<MapView.Marker
				coordinate={{
					latitude: space.lat,
					longitude: space.long
				}}
				title={space.title}
			/>
		));
	}

	renderCircles() {
		return this.safeCircle.map((space) => (
			<MapView.Circle
				center={{ latitude: space.lat, longitude: space.lat }}
				radius={space.rad}
				fillColor="rgba(0, 0, 0, 0.2)"
				strokeColor="rgba(0, 0, 0, 0.2)"
			/>
		));
	}

	render() {
		return (
			<View style={styles.root}>
				<View style={styles.contactInformation}>
					<Text style={styles.contactTxt}> Contact Information: </Text>
					<Text style={styles.contactTxt}> </Text>
					<Text style={styles.contactTxt}> Email: campussafety@apu.edu </Text>
					<Text style={styles.contactTxt}> General Phone #: 626-388-5416 </Text>
					<Text style={styles.contactTxt}> Emergency Phone #: 626-388-5416 </Text>
					<Text style={styles.contactTxt}> </Text>
					<Text style={styles.contactTxt}> For critical emergencies, call 911 </Text>
				</View>

				<View style={styles.container}>
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: 34.130075,
							longitude: -117.888359,
							latitudeDelta: 0.0461 * 0.5, // Controls the scale
							longitudeDelta: 0.02105 * 0.5 // Controls the scale
						}}
					>
						{this.renderMarkers()}
						{this.renderCircles()}
					</MapView>
				</View>
				<TouchableOpacity
					style={styles.btnOpacity}
					onPress={() => {
						console.log('Button pressed');
					}}
				>
					<Text style={styles.btnText}>Contact Campus Safety</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = StyleSheet.create({
	root: {
		backgroundColor: 'white',
		flex: 1,
		alignItems: 'center'
	},

	contactInformation: {
		width: window.width,
		backgroundColor: '#3d4756',
		padding: 25,
		paddingLeft: 50
	},
	contactTxt: {
		color: '#fff',
		fontWeight: 'bold'
	},

	map: {
		width: window.width,
		height: window.width
	},

	btnOpacity: {
		backgroundColor: '#2ecc71', // green
		width: 250,
		padding: 15,
		marginTop: 20,
		marginBottom: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10
	},
	btnText: {
		alignItems: 'center',
		justifyContent: 'center',
		color: '#fff',
		fontSize: 20
	}
});
