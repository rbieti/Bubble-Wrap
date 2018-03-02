import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { itemUpdate, itemCreate } from '../actions/user_items_actions';
import ImageBrowser from '../components/ImageBrowser';

const window = Dimensions.get('window');

class CreateItemScreen extends Component {
  static navigationOptions = () => ({
    title: 'Create Item',
    tabBarLabel: 'Create',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: []
    };
  }

  onButtonPress() {
    const { name, description, price } = this.props;
    this.props.itemCreate({ name, description, price });
  }

  // onCameraButtonPress() {
  //   console.log('what\'s good fam?');
  // }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos);
      this.setState({
        imageBrowserOpen: false,
        photos
      });
    }).catch((error) => console.log(error));
  }
  
  renderImage(item, i) {
    return (
      <View style={styles.thumbnailView}>
        <Image
          style={{ height: 100, width: 100 }}
          source={{ uri: item.file }}
          key={i}
        />
      </View>
    );
  }

  render() {
    if (this.state.imageBrowserOpen) {
      return (<ImageBrowser max={3} callback={this.imageBrowserCallback} />);
    }
    return (
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          {/* <ScrollView>
            {this.state.photos.map((item, i) => this.renderImage(item, i))}
          </ScrollView> */}
          <Image
            style={styles.mainImg}
            source={require("../../assets/478x478-reeses.jpg")}
            resizeMode="cover"
          />

          <View style={styles.thumbnailContainer}>
            {this.state.photos.map((item, i) => this.renderImage(item, i))}
          </View>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity 
            //style={styles.btnOpacity}
            //onPress={this.onCameraButtonPress.bind(this)} // TR: possible function
            onPress={() => this.setState({ imageBrowserOpen: true })}
          >
            <Icon style={styles.iconImg} name="ios-camera-outline" size={40} />
            {/* <Icon style={styles.iconImg} name="ios-add" size={40} /> */}
          </TouchableOpacity>
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
    //height: 3,
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
    padding: 20,
    backgroundColor: "#FFFFFF30", // 30% oppacity
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  thumbnailImg: {

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
