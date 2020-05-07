import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import moreStyle from './moreStyle';
import analytics from '@react-native-firebase/analytics';
var moreConstant = require('./moreConstants')
import {Calendar} from 'react-native-calendars';
 class MoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:'false'
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  
  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
    console.log(day)
    Actions.booking( { bookingDate : day })
  }
  _onPressBack(){
    alert("back press")
  }
  render() {
    analytics().setCurrentScreen('More');
    return (
      <View style={moreStyle.container}>
        <Header title={moreConstant.MORE_SCREEN} />
        <View style={moreStyle.viewContainer}>
          <Text style={moreStyle.welcome}>{moreConstant.CALENDAR}</Text>
          <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true}}}
          theme={{
            selectedDayBackgroundColor: 'green',
            todayTextColor: 'green',
            arrowColor: 'green',
          }}
        />
        </View>
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
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  }
});

export default MoreScreen;