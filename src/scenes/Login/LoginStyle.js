import { StyleSheet, Dimensions } from 'react-native';
var colorConstant = require('../../config/colorConstant')
var constants = require('../../config/Constants')
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 195,
    height: 90,
  },
  subHeading: {
    fontSize:20,
    alignSelf:'flex-end',
    fontStyle:'normal',
    marginRight:50},
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#000000',
    marginTop: 15,
  },
  inputWrapper: {
    width: DEVICE_WIDTH - 20,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  btnEye: {
    flex: 1,
    flexDirection: 'row-reverse',
    position: 'relative',
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
    marginTop: -25
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstant.TBC_COLOR,
    height: MARGIN,
    borderRadius: 0,
    paddingTop: 3, paddingBottom: 5,
  },
  logoutButton: {
    alignSelf: 'center',
    borderRadius: 5,
    paddingTop: 3, paddingBottom: 5,
    backgroundColor: colorConstant.TBC_COLOR,
    height: MARGIN,
    width: DEVICE_WIDTH - 90

  },
  logoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  fbButton: {
    alignSelf: 'center',
    height: MARGIN,
    marginTop: 8,
    width: DEVICE_WIDTH - 100,
    marginBottom: 50,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  renderContainer: {
    flex: 1, backgroundColor: colorConstant.WHITE_COLOR
  },
  touchIdContainer: {
    marginTop: 20, alignItems: 'center'
  },
  touchIdLinkView: {
    fontWeight: 'bold', fontSize: 18, textDecorationLine: 'underline', color: colorConstant.TBC_COLOR
  },
  loginTitleView: {
    height: constants.SCREEN_HEIGHT / 3, justifyContent: 'center', alignItems: 'center',
  },
  loginTitleText: {
    fontSize: 50, color: colorConstant.TBC_COLOR, paddingLeft: 5, height: 50
  },
  loginSumbitButtonView: {
    paddingLeft: 30, paddingRight: 30, marginTop: 30
  },
  text: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  loginSubmitButtonText: {
    color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold'
  },
  validFormViewContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  headingText:
  {
    fontSize: 16,
    fontWeight: '200',
    marginBottom: 30,
    alignSelf: 'center'
  },
  firstFieldView: {
    height: 58,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    //backgroundColor: 'yellow'
  },
  validFormSubView: {
    paddingLeft: 15, paddingRight: 15
  },
  validFormSecondFieldView: {
    marginTop: 20,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  reCaptchaView: {
    marginTop: 10
  }
}));
