import {StyleSheet, Dimensions} from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default (styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorConstant.TBC_COLOR,
        height: MARGIN,
        borderRadius: 0,
        paddingTop:3, paddingBottom:5,
      },

      renderContainer: {
        flex: 1, backgroundColor: colorConstant.WHITE_COLOR
      },
      registerTitleView:{
        height: constants.SCREEN_HEIGHT / 3, justifyContent: 'center', alignItems: 'center'
      },
      registerTitleText:{
        fontSize: 32, color: colorConstant.TBC_COLOR 
      },
      validFormViewContainer:{
        alignItems: 'center'
      },
      inputWrapper: {
        width: DEVICE_WIDTH - 20,
      },
      validFormSubView:{
        paddingLeft: 15, paddingRight: 15
      },
      recoverSumbitButtonView:{
        paddingLeft: 30, paddingRight: 30, marginTop: 60 
      },
      recoverSubmitButtonText:{
        color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold'
      },
      recoverBackButonView:{
        paddingTop: 10, alignItems: 'flex-end', justifyContent: 'flex-start'
      },
      recoverBackButonText:{
        color:colorConstant.BLUE_COLOR, fontSize:15, textDecorationLine: 'underline'   
      },
}));
