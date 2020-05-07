import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { db } from '../../config/db'
import { Actions } from 'react-native-router-flux';
// const jsonData = { "slots" : {
//     "slot1": "9:00am to 9:30am",
//     "slot2": "9:30am to 10:00am",
//     "slot3": "10:00am to 10:30am",
//     "slot4": "10:30am to 11:00am",
//     "slot5": "11:00am to 11:30am",
//     "slot6": "11:30am to 12:00pm"
//  }
// }
const jsonData = {
  "slots": [
    { "slot1": "9:00am to 9:30am", isAvailable: 'false' },
    { "slot2": "9:30am to 10:00am", isAvailable: 'true' },
    { "slot3": "10:00am to 10:30am", isAvailable: 'false' },
    { "slot4": "10:30am to 11:00am", isAvailable: 'true' },
    { "slot5": "11:00am to 11:30am", isAvailable: 'false' },
    { "slot6": "11:30am to 12:00pm", isAvailable: 'true' }
  ]
}

export default class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingDate: this.props.bookingDate,
    }

  }
  _onPressBack() {
    Actions.plusTab()
  }
  _bookSlot(key, availableSlot) {
    // console.log('status' + status.toString())
    // console.log('key' +key) is the slot value
    const month = this.state.bookingDate.month
    const date = this.state.bookingDate.day
    //const user = Firebase.auth().currentUser
    //console.log(user)
    //const uid = user.uid
    const uid = 'CM7BJ7OyWXhGyDwLX1DMqabWfY42'
    let userDataJson = {}
    if (availableSlot) {
      userDataJson[key] = uid
    }
    else {
      userDataJson[key] = null
    }
    // addItem(userDataJson)
    // addItem(month)
    // addItem(date)
    if (availableSlot === 'false') {
      alert("This slot is not available")
    }
    else {
      db.ref('users').child(uid).child("appointments").child(month).child(date).update(userDataJson)
      db.ref('users').once('value', (data) => {
        console.log(data.toJSON())
        let slotVal = JSON.stringify(userDataJson)
        alert("You have booked the appointment for date:" + this.state.bookingDate.dateString + "and for slot " + slotVal)
      })
    }


  }
  render() {
    let _this = this
    const slots = jsonData.slots

    return (
      <View style={styles.container}>
        <Text style={styles.textSlot}>{"Please select the suitable slot for appointment"}</Text>
        <View style={{ margin: 15 }}>

          <TouchableOpacity style={[styles.slotButton, { backgroundColor: ((slots[0].isAvailable === 'true') ? 'green' : 'gray') }]} onPress={() => { _this._bookSlot(slots[0].slot1, slots[0].isAvailable) }} >
            <Text style={styles.buttonText}>{slots[0].slot1}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.slotButton, { backgroundColor: ((slots[1].isAvailable === 'true') ? 'green' : 'gray') }]} onPress={() => { _this._bookSlot(slots[1].slot2, slots[1].isAvailable) }} >
            <Text style={styles.buttonText}>{slots[1].slot2}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.slotButton, { backgroundColor: ((slots[2].isAvailable === 'true') ? 'green' : 'gray') }]} onPress={() => { _this._bookSlot(slots[2].slot3, slots[2].isAvailable) }} >
            <Text style={styles.buttonText}>{slots[2].slot3}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.slotButton, { backgroundColor: ((slots[3].isAvailable === 'true') ? 'green' : 'gray') }]} onPress={() => { _this._bookSlot(slots[3].slot4, slots[3].isAvailable) }} >
            <Text style={styles.buttonText}>{slots[3].slot4}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.slotButton, { backgroundColor: ((slots[4].isAvailable === 'true') ? 'green' : 'gray') }]} onPress={() => { _this._bookSlot(slots[4].slot5, slots[4].isAvailable) }} >
            <Text style={styles.buttonText}>{slots[4].slot5}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.slotButton, { backgroundColor: ((slots[5].isAvailable === 'true') ? 'green' : 'gray') }]} onPress={() => { _this._bookSlot(slots[4].slot5, slots[5].isAvailable) }} >
            <Text style={styles.buttonText}>{slots[5].slot6}</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => this._onPressBack()}>
            <Text style={styles.changeDate}>Change Date</Text>
          </TouchableOpacity>

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80
  },
  textSlot: {
    paddingLeft: 5,
    fontSize: 18,
    margin: 5,
    fontWeight: '300'
  },
  slotButton: {
    // backgroundColor:'gray',
    margin: 10,
    height: 40,
    padding: 8
  },
  backButton: {
    height: 40,
    alignSelf: 'center',
    padding: 10,

  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  changeDate: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  }
});