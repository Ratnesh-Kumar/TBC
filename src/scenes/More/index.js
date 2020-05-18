import React from 'react';
import { Dimensions, View, Text, Alert, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import Header from '../../components/Header';
import moreStyle from './moreStyle';
var moreConstants = require('./moreConstants');
var colorConstants = require('../../config/colorConstant');
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';
import { db } from '../../config/db';
let { width } = Dimensions.get('window');
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsTest: [],

        };
    }
    componentDidMount = () => {
    }




    _eventTapped(event) {
        alert(JSON.stringify(event));
    }

    render() {
        firebase.analytics().setCurrentScreen('More');
        console.log(this.state.eventsTest)
        return (

            <View style={moreStyle.renderContainer}>
                <Header title={moreConstants.MORE_SCREEN} />
                <View style={{marginTop: 20}}>
                    <TouchableOpacity style={{}} onPress={()=>{
                        this.logoutFromApp()
                    }}>
                        <View style={{height: 1, backgroundColor: colorConstants.GRAY_MEDIUM_COLOR}}/>
                        <Text style={{ fontSize: 18, paddingLeft: 15, paddingTop: 10, paddingBottom: 10,  backgroundColor: colorConstants.WHITE_COLOR }}>Logout</Text>
                        <View style={{height: 1, backgroundColor: colorConstants.GRAY_MEDIUM_COLOR}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 15}} onPress={()=>{Actions.calenderEvent()}}>
                        <View style={{height: 1, backgroundColor: colorConstants.GRAY_MEDIUM_COLOR}}/>
                        <Text style={{ fontSize: 18, paddingLeft: 15, paddingTop: 10, paddingBottom: 10,  backgroundColor: colorConstants.WHITE_COLOR }}>Calender Event</Text>
                        <View style={{height: 1, backgroundColor: colorConstants.GRAY_MEDIUM_COLOR}}/>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    async logoutFromApp(){
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ userInfo: null }); // Remove the user from your app's state as well
            Actions.login()
          } catch (error) {
            Actions.login()
            console.error(error);
          }
    }
}