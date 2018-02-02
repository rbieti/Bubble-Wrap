import React, { 
  Component 
} from 'react';
import { 
  PRIMARY_COLOR 
} from '../constants/style';
import {
  ActivityIndicator,
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import {
  Cell,
  Section,
  TableView,
} from 'react-native-tableview-simple';

export default class App extends Component<{}> {

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    tabBarLabel: 'Settings',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  render() {
    return (
      <View style={styles.root}>
        <View>
          <TableView>
            <Section header="PREFERENCES" footer="">
              <Cell
                cellStyle="Basic"
                title="Notifications"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Friends"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Blocked Users"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Privacy"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Add Payment Methods"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Connect to Social Media"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Share My Location"
                cellAccessoryView={<Switch />}
                contentContainerStyle={{ paddingVertical: 4 }}
              />
            </Section>
          </TableView>

          <TableView>
            <Section footer="All rights reserved.">
              <Cell
                title="Help / FAQ"
                titleTextColor="#007AFF"
                onPress={() => console.log('open Help/FAQ')}
              />
              <Cell
                title="Contact Us"
                titleTextColor="#007AFF"
                onPress={() => console.log('open Contact Us')}
              />
              <Cell
                title="Delete My Account"
                titleTextColor="#007AFF"
                onPress={() => console.log('open Delete My Account')}
              />
            </Section>
          </TableView>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  root: { 
    backgroundColor: "#EFEFF4", 
    flex: 1 
  },

  /* Universal Styles */
    h1Lbl: {
      fontWeight: 'bold',
      color: '#000',
    },
  /* End Universal Styles */
});
