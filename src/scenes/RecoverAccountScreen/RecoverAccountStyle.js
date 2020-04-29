import {StyleSheet, Dimensions} from 'react-native';
import Constants from '../../config/Constants';
var colorConstant = require('../../config/colorConstant')

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
    flex: 1,
    width: DEVICE_WIDTH - 40,
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
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstant.TBC_COLOR,
    height: MARGIN,
    borderRadius: 0,
    paddingTop:3, paddingBottom:5,
    zIndex: 100,
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
}));
