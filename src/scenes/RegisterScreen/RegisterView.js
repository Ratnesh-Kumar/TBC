import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import Constants from '../../config/Constants';
import styles from './RegisterStyle';
import { Actions } from 'react-native-router-flux';
import Realm from 'realm';
import { Fab, Switch } from 'native-base';
import Underline from '../../components/textInputMaterial/MaterialTextInput/Underline';

var contants = require('../../config/Constants')
var colorConstant = require('../../config/colorConstant')
let realm;

const MARGIN = 40;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPass: '',
      showPass: false,
      showConfirmPass: false,
      acceptTermsCondition:false,

    };
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colorConstant.WHITE_COLOR, }}>
        {this.renderRegisterTitle()}
        {this.renderRegistraionForm()}
        {/*this.renderTermsCondition()*/}
        {this.renderSubmitButton()}
      </View>

    );
  }
  renderRegisterTitle() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 32, color: colorConstant.TBC_COLOR }}>{'Create New Account'}</Text>
      </View>
    )
  }
  renderRegistraionForm() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1, alignItems: 'center', }}>
        <View style={styles.inputWrapper}>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <TextInputMaterial
              blurText={this.state.name}
              refsValue={Constants.TEXT_INPUT_NAME}
              ref={Constants.TEXT_INPUT_NAME}
              label={Constants.LABEL_NAME}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={name => this.setState({ name })}
              returnKeyType={'done'}
              autoCorrect={false}
              isLoginScreen={false}
              style={styles.input}
              placeholderTextColor={Constants.PLACEHOLDER_TEXT_COLOR}
              underlineColorAndroid={Constants.UNDERLINE_COLOR_ANDROID}
              value={this.state.name}
              textInputName={this.state.name}
              errorText={Constants.ERROR_TEXT_INPUT_NAME}
              underlineHeight={2}
              keyboardType="email-address"
              onSubmitEditing={event => {
                this.refs.passwordInput.focus();
              }}
            />
            <View style={{ marginTop: 15 }}>
              <TextInputMaterial
                blurText={this.state.email}
                refsValue={Constants.TEXT_INPUT_EMAIL}
                ref={Constants.TEXT_INPUT_EMAIL}
                label={Constants.LABEL_EMAIL}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={email => this.setState({ email })}
                returnKeyType={'done'}
                autoCorrect={false}
                isLoginScreen={false}
                style={styles.input}
                placeholderTextColor={Constants.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={Constants.UNDERLINE_COLOR_ANDROID}
                value={this.state.email}
                textInputName={this.state.email}
                errorText={Constants.ERROR_TEXT_INPUT_EMAIL}
                underlineHeight={2}
                keyboardType="email-address"

              />
            </View>
            <View style={{ marginTop: 15 }}>
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

              />
            </View>
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

              />
            </View>
            <View style={{ marginTop: 15 }}>
              <TextInputMaterial
                secureTextEntry={this.state.showPass}
                blurText={this.state.confirmPass}
                refsValue={Constants.TEXT_INPUT_CONFIRM_PASSWORD}
                showIcon={false}
                value={this.state.confirmPass}
                textInputName={this.state.confirmPass}
                ref={Constants.TEXT_INPUT_CONFIRM_PASSWORD}
                label={Constants.LABEL_CONFIRM_PASSWORD}
                maxLength={50}
                underlineHeight={2}
                isLoginScreen={false}
                returnKeyType="next"
                onChangeText={confirmPass => this.setState({ confirmPass })}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor={Constants.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={Constants.UNDERLINE_COLOR_ANDROID}
                errorText={Constants.ERROR_TEXT_INPUT_CONFIRM_PASSWORD}

              />
            </View>
            {/* <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.btnEye}
                            onPress={this.showPass}>
                            <Image source={Constants.EYE_ICON} style={styles.iconEye} />
                        </TouchableOpacity>  */}
          </View>

          <View style={{ paddingTop: 25, flexDirection: 'row', alignItems: 'center' }}>
            <Switch onValueChange={() => this.setState({acceptTermsCondition:!this.state.acceptTermsCondition}) } value={this.state.acceptTermsCondition}>
            </Switch>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={() => Alert.alert('terms and conditions')}>{Constants.LABEL_TERMS_CONDITION}</Text>
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
          flex: 1 / 2,
          alignItems: 'center',
          justifyContent: 'flex-start',


        }}>
        <Animated.View style={{ width: changeWidth }}>
          <View style={{ paddingLeft: 20, paddingRight: 20, }}>
            <TouchableOpacity
              style={styles.button}
              disabled={!this.state.acceptTermsCondition}
              onPress={() => {Alert.alert('clicked') }}
              activeOpacity={1}>
              {}
              <Text
                style={{ color: colorConstant.WHITE_COLOR, fontSize: 20, fontWeight: 'bold' }}>
                {Constants.REGISTER_BUTTON_TEXT}
              </Text>

            </TouchableOpacity>
            <Animated.View
              style={[styles.circle, { transform: [{ scale: changeScale }] }]}
            />
            <View style={{ paddingTop: 10, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <TouchableOpacity  onPress={() => Actions.login()}>
                <Text>Back</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Animated.View>

      </KeyboardAvoidingView>


    );

  }


}