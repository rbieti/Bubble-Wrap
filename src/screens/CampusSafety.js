import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon, Circle } from 'react-native-maps';

export default class CampusSafety extends Component {
	safeSpace = [
		{
			coordinate: {
				latitude: 34.130438,
				longitude: -117.887539
			},
			title: 'East Campus',
			radius: 160
		},
		{
			coordinate: {
				latitude: 34.12836,
				longitude: -117.890574
			},
			title: 'Starbucks',
			radius: 20
		},
		{
			coordinate: {
				latitude: 34.13107,
				longitude: -117.887034
			},
			title: 'Campus Safety',
			radius: 20
		},
		{
			coordinate: {
				latitude: 34.135262,
				longitude: -117.894785
			},
			title: 'West Campus',
			radius: 80
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
