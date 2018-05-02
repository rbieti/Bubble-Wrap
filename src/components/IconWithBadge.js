import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { loadItem } from '../actions/user_items_actions';

class IconWithBadge extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.newOffersCount < this.props.newOffersCount) { // if +1 new offers
      Alert.alert(
        'New offer posted!',
        '',
        [
          { text: 'Cancel', onPress: () => console.log('hi') },
          { text: 'Okay', onPress: this.onOkayPress.bind(this) }
        ],
        { cancelable: false }
      );
    }
  }

  onOkayPress() {
    const { itemId } = this.props;
    firebase.database().ref(`items/${itemId}`)
      .once('value', snapshot => {
        const { images } = snapshot.val();
        const imageArray = Object.values(images);
        const item = { ...snapshot.val(), images: imageArray, key: snapshot.key };
        this.props.loadItem(item);
        // this.props.navigation.navigate('soview');
      });
  }

  render() {
    const { name, style, newOffersCount } = this.props;
    if (name === 'price-tag') {
      return (
        <IconBadge
          MainElement={<Icon name={name} style={style} />}
          BadgeElement={<Text style={{ color: '#FFF' }}>{newOffersCount}</Text>}
          IconBadgeStyle={{ bottom: 30, left: 20 }}
          Hidden={newOffersCount === undefined || newOffersCount === 0}
        />
      );
    } else {
      return (<Icon name={name} style={style} />);
    }
  }
}

const mapStateToProps = (state) => {
  const { newOffersCount } = state.offers;
  const { itemId } = state.userItems;
  return { newOffersCount, itemId };
};

export default connect(mapStateToProps, { loadItem })(IconWithBadge);
