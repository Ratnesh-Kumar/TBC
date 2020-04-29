import {Dimensions} from 'react-native';

//API keys that are not able to keep on the .evn files for security reasons
//Environment definition  options sqm or sqs or prod
//*****************************************************************//

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const FETCHING_TODOS = 'FETCHING_TODOS';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const UNDERLINE_COLOR_ANDROID='transparent';


export default {
  API_URL: 'https://jsonplaceholder.typicode.com',
  PRIMARY_BG_COLOR: '#262673',
  PRIMARY_TEXT_COLOR: '#e6e6ff',
  SECONDARY_BG_COLOR: '#F5FCFF',
  BAR_STYLE: 'light-content',
  DEFAULT_CITY_IMG:
    'https://images.pexels.com/photos/59519/pexels-photo-59519.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
  DEFAULT_HOTEL_IMG:
    'https://images.pexels.com/photos/234315/pexels-photo-234315.jpeg?h=350&auto=compress&cs=tinysrgb',
  PROFILE_AVATAR:
    'https://i.pinimg.com/originals/d4/82/57/d48257401dd85728f031ead0a7f0e758.jpg',
  MAPS_KEY: '',
  SPLASH_SCREEN_LOGO: require('../public/images/og_logo.webp'),
  EYE_ICON: require('../public/images/eye_icon.webp'),

  LABEL_USERNAME:'UserName',
  TEXT_INPUT_USERNAME:'loginInputName',
  ERROR_TEXT_INPUT_USERNAME:'Please enter your username',
  LABEL_PASSWORD:'Password',
  TEXT_INPUT_PASSWORD:'passwordInput',
  ERROR_TEXT_INPUT_PASSWORD:'Please enter password',
  LOGIN_BUTTON_TEXT:'Login',
  REGISTER_BUTTON_TEXT:'Register',
  LABEL_NAME:'Name',
  TEXT_INPUT_NAME:'loginInputName',
  ERROR_TEXT_INPUT_NAME:'please enter name',
  LABEL_EMAIL:'Email',
  TEXT_INPUT_EMAIL:'loginInputEmail',
  ERROR_TEXT_INPUT_EMAIL:'Please enter your email',
  TEXT_INPUT_CONFIRM_PASSWORD:'passwordInput',
  ERROR_TEXT_INPUT_CONFIRM_PASSWORD:'Please enter confirm password',
  LABEL_CONFIRM_PASSWORD:'Confirm Password',
  LABEL_TERMS_CONDITION:'accept Terms and Conditions',
};
