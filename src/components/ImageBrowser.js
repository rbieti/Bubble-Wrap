import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import { FileSystem } from 'expo';
import ImageTile from './ImageTile';

const { width } = Dimensions.get('window');

export default class ImageBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: {},
      after: null,
      has_next_page: true
    };
  }

  getPhotos = () => {
    const params = { first: 50, mimeTypes: ['image/jpeg'] };
    if (this.state.after) params.after = this.state.after;
    if (!this.state.has_next_page) return;
    CameraRoll
      .getPhotos(params)
      .then(this.processPhotos);
  }

  getItemLayout = (data, index) => {
    const length = width / 4;
    return { length, offset: length * index, index };
  }

  selectImage = (index) => {
    let newSelected = { ...this.state.selected };
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true;
    }
    if (Object.keys(newSelected).length > this.props.max) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected });
  }

  processPhotos = (r) => {
    if (this.state.after === r.page_info.end_cursor) return;
    const uris = r.edges.map(i => i.node).map(i => i.image).map(i => i.uri);
    this.setState({
      photos: [...this.state.photos, ...uris],
      after: r.page_info.end_cursor,
      has_next_page: r.page_info.has_next_page
    });
  }

  prepareCallback() {
    const { selected, photos } = this.state;
    const selectedPhotos = photos.filter((item, index) => {
      return (selected[index]);
    });
    const files = selectedPhotos
      .map(i => FileSystem.getInfoAsync(i, { md5: true }));
    const callbackResult = Promise
      .all(files)
      .then(imageData => {
        return imageData.map((data, i) => {
          return { file: selectedPhotos[i], ...data };
        });
      });
    this.props.callback(callbackResult);
  }

  renderHeader = () => {
    const selectedCount = Object.keys(this.state.selected).length;
    let headerText = `${selectedCount} Selected`;
    if (selectedCount === this.props.max) headerText = `${headerText} (Max)`;
    return (
      <View style={styles.header}>
        <Button
          title="Exit"
          onPress={() => this.props.callback(Promise.resolve([]))}
        />
        <Text>{headerText}</Text>
        <Button
          title="Choose"
          onPress={() => this.prepareCallback()}
        />
      </View>
    );
  }
  renderImageTile = ({ item, index }) => {
    // const selected = this.state.selected[index] ? true : false;
    const selected = !!this.state.selected[index];
    return (
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    );
  }
  renderImages() {
    return (
      <FlatList
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index}
        onEndReached={() => { this.getPhotos(); }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20
  },
});
