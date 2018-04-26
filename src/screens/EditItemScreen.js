import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAvoidingView, Alert, View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { ImagePicker } from 'expo';
import { itemUpdate, editItem } from '../actions/user_items_actions';

class EditItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Item',
    tabBarLabel: 'Edit',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  state = {
    images: [],
    original: {
      name: '',
      description: '',
      price: ''
    }
  };

  componentWillMount() {
    // this probably could be done better
    const { name, description, price, images } = this.props.item;
    this.props.itemUpdate({ prop: 'name', value: name });
    this.props.itemUpdate({ prop: 'description', value: description });
    this.props.itemUpdate({ prop: 'price', value: price });
    const paddedImages = images.slice();
    for (let i = images.length; i < 4; i++) {
      paddedImages.push({ index: i });
    }
    this.setState({ images: paddedImages, original: { name, description, price } });
  }

  onButtonPress() {
    const { name, description, price } = this.props;
    if (!name) {
      Alert.alert('Item name is required');
    } else if (!description) {
      Alert.alert('Item description is required');
    } else if (!price) {
      Alert.alert('Item price is required');
    } else if (
      this.state.original.name === name &&
      this.state.original.description === description &&
      this.state.original.price === price &&
      !this.state.images.some(({ uri }) => uri)
    ) {
      Alert.alert('No edit made');
    } else {
      const { images } = this.state;
      this.props.editItem({ name, description, price, imageURIs: images, key: this.props.item.key });
      Alert.alert('Your item has been edited', '', [{ text: 'OK', onPress: () => this.props.navigation.navigate('profile') }]);
    }
  }

  async pickImage(index) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });
    if (!result.cancelled) {
      const images = this.state.images.slice();
      images[index] = { url: result.uri, uri: result.uri, index };
      this.setState({ images });
    }
  }

  renderImgThumbnails() {
    const images = this.state.images.slice(1);
    return images.map(({ url, index }) => (
      <TouchableOpacity
        onPress={() => this.pickImage(index)}
        style={styles.thumbnailView}
        key={index}
      >
        {!!url &&
          <Image
            style={styles.thumbnailImage}
            source={{ uri: url }}
          />}
      </TouchableOpacity>
    ));
  }

  render() {
    const { url } = this.state.images[0];

    return (
      <View style={styles.root}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => this.pickImage(0)}
        >
          {!!url &&
            <Image
              style={styles.mainImg}
              source={{ uri: url }}
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
        </View>

        <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
        >
          <View style={styles.textContainer}>
            <View style={styles.textCell}>
              <Text style={styles.text}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={this.props.name}
                onChangeText={value => this.props.itemUpdate({ prop: 'name', value })}
              />
            </View>

            <View style={styles.textCell}>
              <Text style={styles.text}>Description</Text>
              <TextInput
                style={styles.textInput}
                value={this.props.description}
                onChangeText={value => this.props.itemUpdate({ prop: 'description', value })}
              />
            </View>

            <View style={styles.textCell}>
              <Text style={styles.text}>Price</Text>
              <TextInput
                style={styles.textInput}
                keyboardType='numeric'
                value={this.props.price}
                onChangeText={value => this.props.itemUpdate({ prop: 'price', value })}
              />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnOpacity}
              onPress={this.onButtonPress.bind(this)}
            >
              <Text style={styles.btnText}>
                Edit Item
            </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    height: 3,
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
  const { name, description, price, item } = state.userItems;
  return { name, description, price, item };
};

export default connect(mapStateToProps, {
  itemUpdate, editItem
})(EditItemScreen);
