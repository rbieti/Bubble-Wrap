import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon, Circle } from 'react-native-maps';
import call from 'react-native-phone-call';
export default class CampusSafety extends Component {
	safeSpace = [
		{
			coordinate: {
				latitude: 34.13097,
				longitude: -117.890057
			},
			title: 'Azusa Pacific University Bubble Community ',
			radius: 4000,
			circlecolor: 'rgba(17, 170, 255, 0.1e0)'
		},

		{
			coordinate: {
				latitude: 34.130284,
				longitude: -117.888261
			},
			title: 'East Campus',
			radius: 40,
			circlecolor: 'rgba(0, 0, 0, 0.2)'
		},
		{
			coordinate: {
				latitude: 34.12836,
				longitude: -117.890574
			},
			title: 'Starbucks',
			radius: 20,
			circlecolor: 'rgba(0, 0, 0, 0.2)'
		},
		{
			coordinate: {
				latitude: 34.130507,
				longitude: -117.886821
			},
			title: 'Trinity Lawn',
			radius: 20,
			circlecolor: 'rgba(0, 0, 0, 0.2)'
		},
		{
			coordinate: {
				latitude: 34.13107,
				longitude: -117.887034
			},
			title: 'Campus Safety',
			radius: 20,
			circlecolor: 'rgba(0, 0, 0, 0.2)'
		},
		{
			coordinate: {
				latitude: 34.135262,
				longitude: -117.894785
			},
			title: 'West Campus',
			radius: 80,
			circlecolor: 'rgba(0, 0, 0, 0.2)'
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
		return this.safeSpace.map((space) => <Marker coordinate={space.coordinate} title={space.title} />);
	}

	renderCircles() {
		return this.safeSpace.map((space) => (
			<Circle
				center={space.coordinate}
				radius={space.radius}
				fillColor={space.circlecolor}
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
						call(args).catch(console.error);
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
const args = {
	number: '8088590809', // String value with the number to call
	prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
};
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
