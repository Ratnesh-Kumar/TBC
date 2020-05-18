import { StyleSheet, Dimensions } from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;
// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  validFormViewContainer: {
    alignItems: 'center'
  },
  inputWrapper: {
    paddingTop: 20,
    width: DEVICE_WIDTH - 20,
  },
  validFormSubView: {
    paddingLeft: 15, paddingRight: 15
  },
  firstFieldView: {

    height: 58,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    //backgroundColor: 'yellow'
  },
  validFormSecondFieldView: {
    height: 58,
    marginTop: 20,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  renderContainer: {
    flex: 1, backgroundColor: colorConstant.GRAY_LIGHT_COLOR
  },
  registerSumbitButtonView: {
    paddingLeft: 30, paddingRight: 30, marginTop: 20
  },
  registerSubmitButtonText: {
    color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold'
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstant.TBC_COLOR,
    height: MARGIN,
    borderRadius: 0,
    paddingTop: 3, paddingBottom: 5,
  },
  registerBackButonView: {
    paddingTop: 10, alignItems: 'flex-end', justifyContent: 'flex-start'
  },
  registerBackButonText: {
    color: colorConstant.BLUE_COLOR, fontSize: 15, textDecorationLine: 'underline'
  },
  datePicker: {
    width: 150,
    height: 50,
    backgroundColor: 'white',
    //borderRadius: 30,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 15,
    borderWidth:1
  },
  datePickerText:{
    color: colorConstant.BLACK_COLOR, fontSize: 20, fontWeight: 'bold'
  }
}));