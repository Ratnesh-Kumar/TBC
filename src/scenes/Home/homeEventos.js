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

export default class HomeEventos extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <View style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10, backgroundColor: colorConstants.GRAY_MEDIUM_COLOR }}>
                <View>
                    <Text style={{fontSize: 18, color: colorConstants.GREY_DARK_COLOR_A, fontWeight: 'bold' }}>{"Eventos"}</Text>
                </View>
            </View>
        );
    }

    renderEventosItem(){
        return(
            <View>

            </View>
        )
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

