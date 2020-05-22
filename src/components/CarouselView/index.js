import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import Carousel from 'react-native-snap-carousel';
import carouselStyle from './carouselStyle';
var colorConstants = require('../../config/colorConstant')
var carouselConstant = require('./carouselConstants')
var constants = require('../../config/Constants')
var homeConstants = require('../../scenes/Home/homeConstants');
import { db } from '../../config/db';
const uid = 'CM7BJ7OyWXhGyDwLX1DMqabWfY42';
const reference = db.ref('/likesData').child(uid);
export default class CarouselView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: props.entriesData,
            likes: [...homeConstants.CAROUSEL_HOME_TOP_ARRAY, ...homeConstants.CAROUSEL_HOME_BOTTOM_ARRAY].reduce((acc, image) => {
                acc[image.id] = false;
                return acc;
            }, {}),
        }
    }
    componentDidMount = async () => {
        let that = this;

       await reference.child("likes").once('value', function (querySnapShot) {
            if (querySnapShot.exists()) {
                let likes = querySnapShot.val() ? querySnapShot.val() : {};
                //let arr = this.state.likes;
                //console.log('inside didMount#####' + JSON.stringify(arr));
                that.setState({ likes: likes });
            }
        });
    }
    

    render() {
        // console.log("############ render : " + JSON.stringify(this.props.entriesData))
        return (
            <View style={{ backgroundColor: (this.props.darkTheme) ? colorConstants.GREY_DARK_COLOR : colorConstants.WHITE_COLOR, marginTop: 10, paddingBottom: 25 }}>
                <View style={{ paddingLeft: 10, paddingTop: 10, paddingBottom: 15 }}>
                    <Text style={{ fontSize: 18 }}>{this.props.title}</Text>
                </View>
                <Carousel
                    layout={'default'}
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.entriesData}
                    renderItem={(item) => this.renderItem(item.item)}
                    sliderWidth={constants.SCREEN_WIDTH}
                    itemWidth={constants.SCREEN_WIDTH - 150}
                    activeSlideAlignment='center'
                />
            </View>
        );
    }
    saveToFirebase = () => {
        const { likes } = this.state;
        //console.log('inside function ##########' + JSON.stringify(likes));
        reference.set({ likes })
            .then(() => console.log('Data set.'))
            .catch((error) => {
                console.log('error ', error)
            });
    }


    renderItem(item) {
        const { likes } = this.state;
        const selectSource = likes[item.id] ? require('../../public/images/heart_black_shape.png') : require('../../public/images/heart_favourite.png');
        // console.log("############ renderItem 1: " + JSON.stringify(item))
        // console.log("############ renderItem 2: " + item.description)
        return (

            <View style={{ width: 250 }}>
                <View style={{ backgroundColor: colorConstants.GRAY_LIGHT_COLOR, borderRadius: 20 }}>
                    <View style={{ height: 280, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: item.imageURL }}
                            style={{ height: 280, width: 250, resizeMode: 'contain' }}
                        />
                        <View style={{ position: 'absolute', top: 10, right: 10 }}>
                            <TouchableOpacity onPress={ async() => {
                               await this.setState({ likes: { ...likes, [item.id]: !this.state.likes[item.id] } },()=>
                                console.log(JSON.stringify(this.state.likes)));
                                this.saveToFirebase();


                            }}>
                                

                                <Image source={selectSource}
                                    style={{ height: 40, width: 40, resizeMode: 'contain', tintColor: colorConstants.GREY_DARK_COLOR }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: (this.props.darkTheme) ? colorConstants.GREY_DARK_COLOR_A : colorConstants.GRAY_MEDIUM_COLOR, padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <Text style={{ fontSize: 11, textAlign: "center", color: (this.props.darkTheme) ? colorConstants.WHITE_COLOR : colorConstants.BLACK_COLOR }}>
                            {item.description}
                        </Text>
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

