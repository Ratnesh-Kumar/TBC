import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    StatusBar
  } from 'react-native';
  import Firebase from 'firebase'
  import { db } from '../../config/db'
import { Actions } from 'react-native-router-flux';
  const jsonData = { "slots" : {
      "slot1": "9:00am to 9:30am",
      "slot2": "9:30am to 10:00am",
      "slot3": "10:00am to 10:30am",
      "slot4": "10:30am to 11:00am",
      "slot5": "11:00am to 11:30am",
      "slot6": "11:30am to 12:00pm"
   }
  }
  export default class Slot extends Component {
    constructor(props) {
       super(props);
       this.state ={
         bookingDate: this.props.bookingDate
       }
   
     }
    _onPressBack(){
     Actions.plusTab()
    }
    _bookSlot(status,key,value){
        // console.log('status' + status.toString())
        // console.log('key' +key) is the slot value
      const month = this.state.bookingDate.month
      const date = this.state.bookingDate.day
      //const user = Firebase.auth().currentUser
      //console.log(user)
      const uid = 'CM7BJ7OyWXhGyDwLX1DMqabWfY42'
      let userDataJson = {}
      if(status){
        userDataJson[key] = uid
      }
      else{
      userDataJson[key] = null
      }
      // addItem(userDataJson)
      // addItem(month)
      // addItem(date)
      console.log('userdata' + ' ' +userDataJson)
      db.ref('users').child(uid).child("appointments").child(month).child(date).update(userDataJson)
      db.ref('users').once('value', (data) => {
      console.log(data.toJSON())
      let slotVal = JSON.stringify(userDataJson)
      alert("You have booked the appointment for date:" + this.state.bookingDate.dateString + "and for slot " + slotVal)
    })

    }
    render() {
       // console.log(this.state.bookingDate.dateString)
      let _this = this
      const slots = jsonData.slots
      const slotsarr = Object.keys(slots).map( function(k) {
        return (  <View  key={k} style={{margin:15}}>
          <TouchableOpacity style={styles.slotButton} onPress={(status) => {_this._bookSlot(status,k,slots[k])}} >
        <Text style={styles.buttonText}>{slots[k]}</Text>

          </TouchableOpacity>
                    {/* <Button color={"green"}  onPress={(status) => _this._bookSlot(status,k,slots[k]) } title={slots[k]} /> */}
                  
                  </View>)
      });
      return (
        <View style={styles.container}>
          <Text style={styles.textSlot}>{"Please select the suitable slot for appointment"}</Text>
        { slotsarr }
        <TouchableOpacity style={styles.backButton} onPress={()=>this._onPressBack()}>
<Text style={styles.changeDate}>Change Date</Text>
        </TouchableOpacity>
        </View>
      );
    }
  }
   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:30
    },
    textSlot: {
      paddingLeft:5,
      fontSize: 18,
      margin:5,
     fontWeight: '300'
    },
    slotButton: {
      backgroundColor:'green',
      height:40,
      padding:8
    },
    backButton:{
    height:40,
    alignSelf:'center',
    padding:10,
    
    },
    buttonText: {
      color:'white',
     textAlign:'center'
    },
    changeDate: {
      color: 'red',
      fontSize:16,
      fontWeight:'bold'
    }
  });