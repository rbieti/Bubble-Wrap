import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TextInput } from "react-native";
import { ImagePicker } from 'expo';
import firebase from 'firebase';
import { itemUpdate, itemCreate } from '../actions/user_items_actions';
import { GOOGLE_FIREBASE_CONFIG } from "../constants/api_keys";

class CreateItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create Item',
    tabBarLabel: 'Create',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });
  
  // images are represented as URI's for now
  state = { images: ['', '', '', ''] };

  onButtonPress() {
    const { name, description, price } = this.props;
    this.props.itemCreate({ name, description, price });
  }

  pickImage = async (i) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [1, 1],
    });

    console.log(result.uri);

    if (!result.cancelled) {
      // this.setState({ images: result.uri });
      const images = this.state.images.slice();
      images[i] = result.uri;
      this.setState({ images });
      // this.uploadImageToFirebase(result);
    }
  };

  // TR: temporary function test
  uploadImageToFirebase = async (result) => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child("images/test0001.jpg");
    imageRef.putString(result.uri).then(() => console.log("Image uploaded")).catch((err) => console.log(err));
  };

  renderImgThumbnails() {
    const images = this.state.images.slice(1); // removes first element of array

    return images.map((image, i) => (
      <TouchableOpacity 
        onPress={() => this.pickImage(i + 1)} // for indecies 1, 2, 3
        style={styles.thumbnailView}
        key={i}
      >
        {!!image && 
        <Image
          style={styles.thumbnailImage}
          source={{ uri: image }}
        />}
      </TouchableOpacity>
    ));
  }

  render() {
    const { images } = this.state;

    return (
      <View style={styles.root}>
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={() => this.pickImage(0)}
        >
          {!!images[0] &&
          <Image
            style={styles.mainImg}
            // source={require("../../assets/478x478-reeses.jpg")}
            source={{ uri: images[0] }}
            resizeMode="cover"
          />}

          <View style={styles.thumbnailContainer}>
            {this.renderImgThumbnails()}
          </View>
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Icon style={styles.iconImg} name="ios-camera-outline" size={40} />
          </TouchableOpacity>
          {/* <Icon style={styles.iconImg} name="ios-add" size={40} /> */}
        </View>

        <View style={styles.textContainer}>
          <View style={styles.textCell}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="The name of your product"
              value={this.props.name}
              onChangeText={value => this.props.itemUpdate({ prop: 'name', value })}
              // onChangeText={(text) => this.setState({ text })}
            />
          </View>

          <View style={styles.textCell}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder="A short description"
              value={this.props.description}
              onChangeText={value => this.props.itemUpdate({ prop: 'description', value })}
              // onChangeText={(text) => this.setState({ text })}
            />
          </View>

          <View style={styles.textCell}>
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Set your price"
              value={this.props.price}
              onChangeText={value => this.props.itemUpdate({ prop: 'price', value })}
              // onChangeText={(text) => this.setState({ text })}
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity 
            style={styles.btnOpacity}
            onPress={this.onButtonPress.bind(this)}
          >
            <Text style={styles.btnText}>
              Post Item
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },

  imageContainer: {
    flex: 1,
    width: window.width,
    height: window.width,
    // height: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mainImg: {
    marginTop: 0,
    width: "100%",
    height: "100%",
  },

  thumbnailContainer: {
    maxHeight: 80,
    width: window.width,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 20,
  },
  thumbnailView: {
    width: 80,
    height: 80,
    //padding: 20,
    backgroundColor: "#FFFFFF30", // 30% oppacity
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  thumbnailImage: {
    width: 76,
    height: 76,
    borderRadius: 5
  },

  iconContainer: {
    flex: 1,
    maxHeight: 70,
    // flexDirection: "row",
    // paddingRight: "25%",
    // paddingLeft: "25%",
    backgroundColor: "#f6f6f6",
    borderColor: "#ddd",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    alignItems: 'center',
    // justifyContent: "space-between",
  },
  iconImg: {
    height: 50,
    width: 50,
    marginTop: 15,
  },

  textContainer: {
    padding: 15,
    backgroundColor: "#fff",
    height: 150,
  },
  textCell: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 5,
  },
  textInput: {
    height: 40,
    position: "absolute",
    left: 100,
    width: '70%'
  },

  btnContainer: {
    width: window.width,
    height: 70,
  },
  btnOpacity: {
    backgroundColor: "#33a3f3",
    width: "100%",
    height: "100%",
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  }
});

const mapStateToProps = (state) => {
  const { name, description, price } = state.userItems;
  return { name, description, price };
};

export default connect(mapStateToProps, { 
  itemUpdate, itemCreate 
})(CreateItemScreen);
