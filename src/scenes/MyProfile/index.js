import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import myProfileStyle from './myProfileStyle';
import firebase from 'react-native-firebase';
var myProfileConstants = require('./myProfileConstants');

export default class MyProfile extends Component {
  render() {
    firebase.analytics().setCurrentScreen('My Profile');
    return (
      <View style={myProfileStyle.container}>
        <Header title={myProfileConstants.MY_PROFILE} />
        <View style={myProfileStyle.viewContainer}>
          <Text style={myProfileStyle.welcome}>{myProfileConstants.MY_PROFILE}</Text>
        </View>
      </View>
    );
  }
}

