import { StyleSheet, Dimensions } from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  enableButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstant.TBC_COLOR,
    height: MARGIN,
    borderRadius: 0,
    paddingTop: 3, paddingBottom: 5,
  },

  renderContainer: {
    flex: 1, backgroundColor: colorConstant.WHITE_COLOR
  },
  registerTitleView: {
    height: constants.SCREEN_HEIGHT / 8, justifyContent: 'center', alignItems: 'center'
  },
  registerTitleText: {
    fontSize: 16,
    fontWeight: '200',
    marginBottom: 30,
    alignSelf: 'center',
    color: colorConstant.TBC_COLOR
  },
  validFormViewContainer: {
    alignItems: 'center'
  },
  validFormSecondFieldView: {
    height: 58,
    marginTop: 20,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  inputWrapper: {
    width: DEVICE_WIDTH - 20,
  },
  validFormSubView: {
    paddingLeft: 15, paddingRight: 15
  },
  registerSumbitButtonView: {
    paddingLeft: 30, paddingRight: 30, marginTop: 20
  },
  registerSubmitButtonText: {
    color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold'
  },
  registerBackButonView: {
    paddingTop: 10, alignItems: 'flex-end', justifyContent: 'flex-start'
  },
  registerBackButonText: {
    color: colorConstant.BLUE_COLOR, fontSize: 15, textDecorationLine: 'underline'
  },
  registerSwitchView: {
    paddingLeft: 15, paddingTop: 25, flexDirection: 'row', alignItems: 'center'
  },
  registerTermsText: {
    paddingLeft: 10, color: colorConstant.BLUE_COLOR, fontSize: 15, textDecorationLine: 'underline'

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
  disableButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    height: MARGIN,
    borderRadius: 0,
    paddingTop: 3, paddingBottom: 5,
  },
}))
