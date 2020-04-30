import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import { fetchJsonGET, fetchJsonPOST } from '../../services/FetchData'
import BaseComponent from '../../BaseComponent';
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
            loadingString: 'Fetching...'
        }
    }

    componentDidMount() {
        this.fetchData()
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
                <Header isleftArrowDisplay={false} title={homeConstants.HOME_SCREEN} />
                <View style={homeStyle.viewContainer}>
                    {this.renderFlatList()}
                </View>
            </View>
        );
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


