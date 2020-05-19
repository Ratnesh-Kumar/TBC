import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
var singleInstance = null;
var userData = false;
var loginType = ""


export class GlobalData extends Component {
    constructor() {
        super();
        if (!singleInstance) {
            singleInstance = this;
        }
        return singleInstance;
    }

    //this enable the test dialog in Home page
    setUserData(text){
        userData = text;
    }

    getUserData(){
        return userData;
    }

    setLoginType(text){
        loginType = text;
    }

    getLoginType(){
        return loginType;
    }
}

export default GlobalData;
