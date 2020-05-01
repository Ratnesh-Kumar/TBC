import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import Header from '../../components/Header';
import homeStyle from './homeStyle';
import { SCREEN_WIDTH } from '../../config/Constants';
import { BLACK_COLOR } from '../../config/colorConstant';
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
            <View style={{ padding: 15, backgroundColor: colorConstants.GRAY_MEDIUM_COLOR }}>
                <View>
                    <Text style={{ fontSize: 18, color: colorConstants.GREY_DARK_COLOR_A, fontWeight: 'bold' }}>{"Eventos"}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    {this.renderEventosItem(this.props.eventArray[0])}
                    <View style={{ width: 15 }}></View>
                    {this.renderEventosItem(this.props.eventArray[1])}
                </View>
            </View>
        );
    }

    renderEventosItem(eventItem) {
        let fixWidth = constants.SCREEN_WIDTH / 2 - 22;
        return (
            <View>
                <View style={{ width: fixWidth }}>
                    <View style={{
                        width: fixWidth, height: fixWidth * 1.3, backgroundColor: colorConstants.WHITE_COLOR, borderRadius: 5,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Image source={require('../../public/images/thumbnail_placeholder.png')}
                            style={{ height: 40, width: 50, resizeMode: 'contain' }} />
                        <View style={{ position: 'absolute', top: 10, right: 10, }}>
                            <Image source={require('../../public/images/heart_favourite.png')}
                                style={{ height: 40, width: 40, resizeMode: 'contain', tintColor: colorConstants.GREY_DARK_COLOR }} />
                        </View>
                    </View>
                    <View style={{marginTop:10, marginLeft: 10, marginRight: 10}}>
                        <Text style={{fontSize:16, fontWeight:'bold', color: BLACK_COLOR}}>{eventItem.eventTitle}</Text>
                        <Text style={{fontSize: 12, }}>{eventItem.eventDescription}</Text>
                    </View>
                </View>
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

