import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
// import Text from '../../components/AppText';
import { fetchJsonGET, fetchJsonPOST } from '../../services/FetchData'
import BaseComponent from '../../BaseComponent';
import SearchBar from '../../components/homeSearchBar';
import SquareBox from './homeTopSquareBox'
import CarouselView from '../../components/CarouselView';
import Carousel from 'react-native-snap-carousel';
import HomeEventos from './homeEventos'
import {strings} from '../../i18next/i18n';
var constants = require('../../config/Constants')
var colorConstants = require('../../config/colorConstant')
var homeConstants = require('./homeConstants');
import homeStyle from './homeStyle';

export default class HomeScreen extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            employeeList: [],
            showFlatList: false,
            loadingString: 'Fetching...',
            activeIndex: 0
        }
    }

    componentDidMount() {
        // this.fetchData()
    }

    async fetchData() {
        let responseData = await fetchJsonGET(constants.API_URL);
        console.log("fetchdata :" + JSON.stringify(responseData));
        if (this.isValidString(responseData)) {
            if (responseData.status === "success") {
                if (this.isValidArray(responseData.data)) {
                    this.setState({
                        employeeList: responseData.data
                    })
                }
            }
        }
        return responseData;
    }

    render() {
        return (
            <View style={homeStyle.container}>
                <SearchBar />
                <View style={homeStyle.viewContainer}>
                    <ScrollView style={{ flex: 1 }}>
                        {this.renderSquareBox()}
                        {this.renderCarouselView()}
                        {this.renderEventosView()}
                    </ScrollView>
                </View>
            </View>
        );
    }

    renderEventosView() {
        return (
            <View style={{ marginTop: 40, marginBottom: 40 }}>
                <HomeEventos eventArray={strings('homeEventos.eventArray')} />
            </View>
        )
    }

    renderCarouselView() {
        return (
            <View>
                <CarouselView entriesData={strings('homeTopCarousel.topArray')} title={strings('homeTopCarousel.topArrayTitle')} darkTheme={false} />
                <View style={{ marginTop: 10 }}>
                    <CarouselView entriesData={strings('homeTopCarousel.bottomArray')} title={strings('homeTopCarousel.bottomArrayTitle')} darkTheme={true} />
                </View>
            </View>
        );
    }

    

    renderSquareBox() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <SquareBox title={strings('homeSquareBox.squareBoxOneTitle')}
                    squareBoxClicked={() => {
                        alert('Square Box One');
                    }} />
                <SquareBox title={strings('homeSquareBox.squareBoxTwoTitle')}
                    squareBoxClicked={() => {
                        alert('Square Box Two');
                    }} />
                <SquareBox title={strings('homeSquareBox.squareBoxThreeTitle')}
                    squareBoxClicked={() => {
                        alert('Square Box Three');
                    }} />
            </View>
        )
    }

    renderFlatList() {
        return (
            <View>
                <FlatList
                    extraData={this.state}
                    ref={ref => (this.listView = ref)}
                    renderItem={data => this.renderItem(data.item)}
                    data={this.state.employeeList}
                    ListHeaderComponent={() => this.renderHeaderView()}
                    ItemSeparatorComponent={(sectionId, rowId) => (
                        <View key={rowId} style={homeStyle.seperateLine} />
                    )}
                />
            </View>
        )
    }

    renderHeaderView() {
        return (
            <View style={homeStyle.homeListHeaderView}>
                <Text style={homeStyle.homeListHeaderText}>{homeConstants.LIST_HEADER}</Text>
            </View>
        )
    }

    renderItem(employeeItem) {
        return (
            <View style={homeStyle.renderItemContainer}>
                <View style={homeStyle.seperateLine} />
                <View style={homeStyle.renderItemMainView}>
                    <View style={homeStyle.renderItemSubView}>
                        <Text style={homeStyle.renderItemText}>{homeConstants.LIST_ROW_NAME}</Text>
                        <Text style={{}}>{employeeItem.employee_name}</Text>
                    </View>
                    <View style={homeStyle.renderItemSubViewOne}>
                        <Text style={homeStyle.renderItemText}>{homeConstants.LIST_ROW_AGE}</Text>
                        <Text style={{}}>{employeeItem.employee_age}</Text>
                    </View>
                </View>
            </View>
        );
    }
}


