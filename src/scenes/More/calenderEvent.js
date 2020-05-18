import React from 'react';
import { Dimensions, View, Text, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import EventCalendar from '../../components/EventCalender/EventCalender';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
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
    
    showCalendarEventWithId = (eventId) => {
      const eventConfig = {
        eventId,
        allowsEditing: false,
        allowsCalendarPreview: true,
        navigationBarIOS: {
          tintColor: 'orange',
          backgroundColor: 'green',
        },
      };
  
      AddCalendarEvent.presentEventViewingDialog(eventConfig)
        .then(eventInfo => {
          //alert('eventInfo -> ' + JSON.stringify(eventInfo));
        })
        .catch((error) => {
          alert('Error -> ' + error);
        });
    };
  
  

  _eventTapped(event) {
    this.showCalendarEventWithId(event.eventId);
    //alert(JSON.stringify(event.title));
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
