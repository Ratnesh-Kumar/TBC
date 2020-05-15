import React from 'react';
import { Dimensions, View, Text, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import EventCalendar from '../../components/EvenCalender/EventCalender';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { db } from '../../config/db';
let { width } = Dimensions.get('window');
import moment from 'moment';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsTest:[],
      
    };
  }
    componentDidMount=()=>{
    let that=this;
      const uid = 'CM7BJ7OyWXhGyDwLX1DMqabWfY42';
      db.ref('/appointmentData').child(uid).on('value', function (snapshot) {
        let data = snapshot.val();
        let eventsTest = Object.values(data);
        that.setState({eventsTest});

    });
      
    }
    
  
  

  _eventTapped(event) {
    alert(JSON.stringify(event));
  }

  render() {
    firebase.analytics().setCurrentScreen('More');
    console.log(this.state.eventsTest)
    return (

      <View style={{ flex: 1, marginTop: 20 }}>
        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.state.eventsTest}
          width={width}
          initDate={moment().utcOffset('+05:30').format('YYYY-MM-DD')}
          scrollToFirst
          upperCaseHeader
          uppercase
          scrollToFirst={false}
          
        />
       
      </View>

    );
  }
}