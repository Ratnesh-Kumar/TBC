/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import Constants from '../../config/Constants';

import styles from './LoginStyle';
import { Actions } from 'react-native-router-flux';
import Realm from 'realm';
import { TBC_COLOR } from '../../config/colorConstant';
var contants = require('../../config/Constants')
var colorConstant = require('../../config/colorConstant')
let realm;

const MARGIN = 40;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      isLoading: false,
      username: '',
      password: '',
    };
    this.showPass = this.showPass.bind(this);
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress.bind(this);

    realm = new Realm({ path: 'UserDatabase.realm' });
    //creating temporary user logins
    realm.write(() => {
      realm.create('user_details', {
        user_name: 'admin1',
        user_password: 'admin1',
      });
    });
  }

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colorConstant.WHITE_COLOR }}>
        {/* {this.renderLogo()} */}
        {this.renderLoginTitle()}
        {this.renderValidationForm()}
        {this.renderSubmitButton()}
        
      </View>
    );
  }



  renderLoginTitle() {
    return (
      <View style={{ height: contants.SCREEN_HEIGHT / 3, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 32, color: colorConstant.TBC_COLOR }}>{'Login Screen'}</Text>
      </View>
    )
  }

  renderLogo() {
    return (
      <View style={styles.container}>
        <Image source={Constants.SPLASH_SCREEN_LOGO} style={styles.image} />
      </View>
    );
  }

  renderValidationForm() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.inputWrapper}>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <TextInputMaterial
              blurText={this.state.username}
              refsValue={Constants.TEXT_INPUT_USERNAME}
              ref={Constants.TEXT_INPUT_USERNAME}
              label={Constants.LABEL_USERNAME}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={username => this.setState({ username })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={styles.input}
              placeholderTextColor={Constants.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={Constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.username}
              textInputName={this.state.username}
              errorText={Constants.ERROR_TEXT_INPUT_USERNAME}
              underlineHeight={2}
              keyboardType="email-address"
              onSubmitEditing={event => {
                this.refs.passwordInput.focus();
              }}
            />
            <View style={{ marginTop: 15 }}>
              <TextInputMaterial
                secureTextEntry={this.state.showPass}
                blurText={this.state.password}
                refsValue={Constants.TEXT_INPUT_PASSWORD}
                showIcon={false}
                value={this.state.password}
                textInputName={this.state.password}
                ref={Constants.TEXT_INPUT_PASSWORD}
                label={Constants.LABEL_PASSWORD}
                maxLength={50}
                underlineHeight={2}
                isLoginScreen={false}
                returnKeyType="next"
                onChangeText={password => this.setState({ password })}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor={Constants.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={Constants.UNDERLINE_COLOR_ANDROID}
                errorText={Constants.ERROR_TEXT_INPUT_PASSWORD}
                onFocus={() => this.inputFocused.bind(this)}
              />
            </View>
            {/* <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnEye}
                        onPress={this.showPass}>
                        <Image source={Constants.EYE_ICON} style={styles.iconEye} />
                    </TouchableOpacity>  */}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  renderSubmitButton() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <KeyboardAvoidingView
        behavior="height"
        style={{
          flex: 1,
          top: -55,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Animated.View style={{ width: changeWidth }}>
          <View style={{ paddingLeft: 20, paddingRight: 20,  }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onPress()}
              activeOpacity={1}>
              {}
              <Text
                style={{ color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold' }}>
                {Constants.LOGIN_BUTTON_TEXT}
              </Text>
            </TouchableOpacity>
            <Animated.View
              style={[styles.circle, { transform: [{ scale: changeScale }] }]}
            />
            <View style={{ paddingTop: 10, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <TouchableOpacity onPress={() => Actions.register()}>
                <Text>I want to register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
  onPress() {
    const { username } = this.state;
    const { password } = this.state;

    var user_details = realm
      .objects('user_details')
      .filtered('user_name =$0 && user_password=$1', username, password);

    if (this.state.username === '' || this.state.password === '') {
      Alert.alert('Alert', 'Either Username or Password Field is empty');
      return;
    } else if (user_details.length > 0) {
      Actions.tabbar();
    } else {
      Alert.alert('Alert', 'Either Username or Password is wrong');
    }
  }

  inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        // eslint-disable-next-line no-undef
        ReactNative.findNodeHandle(this.refs[refName]),
        140, //additionalOffset
        true,
      );
    }, 50);
  }
}
LoginView.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};
