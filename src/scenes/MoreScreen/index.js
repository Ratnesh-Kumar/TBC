import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';

export default class MoreScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title={'More Screen'} />
        <View style={styles.viewContainer}>
          <Text style={styles.welcome} onPress={() => Actions.black()}>
            More Screen
      </Text>
        </View>
        {/* <Text style={styles.welcome} onPress={() => Actions.modal()}>
        Open Modal
      </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
});

