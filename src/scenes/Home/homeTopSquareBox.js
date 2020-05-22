import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import Header from '../../components/Header';
import homeStyle from './homeStyle';
import { SCREEN_WIDTH } from '../../config/Constants';
var colorConstants = require('../../config/colorConstant')
var constants = require('../../config/Constants')
var homeConstant = require('./homeConstants')

export default class HomeSearchBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                this.props.squareBoxClicked();
            }}
            style={{ height: SCREEN_WIDTH / 3 - 30, width: SCREEN_WIDTH / 3 - 20, backgroundColor: colorConstants.GRAY_LIGHT_COLOR, margin: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Image source={{uri:"https://images.pexels.com/photos/2954199/pexels-photo-2954199.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}}
                        style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                </View>
                    <CardView
                        cardElevation={2}
                        cardMaxElevation={2}
                        style={{position:'absolute', bottom:0, left: 0,righ:0, width: SCREEN_WIDTH / 3 - 20, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize: 10, margin: 5}}>{this.props.title}</Text>
                    </CardView>
            </TouchableOpacity>
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

