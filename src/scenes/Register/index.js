import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import styles from './registerStyle';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import {  Switch } from 'native-base';
import registerStyle from './registerStyle';
import firebase from 'react-native-firebase';
// import { ScrollView } from 'react-native-gesture-handler';
var registerConstants = require('./registerConstants');
var Constants = require('../../config/Constants')
var colorConstant = require('../../config/colorConstant')




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
    
  }

  render() {
    firebase.analytics().setCurrentScreen('Register');
    return (
      <ScrollView scrollEnabled={false} overScrollMode={'always'} keyboardShouldPersistTaps={'handled'} style={registerStyle.renderContainer}>
        <Header title={registerConstants.REGISTER_SCREEN} />
        {this.renderRegisterTitle()}
        {this.renderRegistraionForm()}
        {/*this.renderTermsCondition()*/}
        {this.renderSubmitButton()}
      </ScrollView>
    );
  }
  renderRegisterTitle() {
    return (
      <View style={registerStyle.registerTitleView}>
        <Text style={registerStyle.registerTitleText}>{'Create New Account'}</Text>
      </View>
    )
  }
  renderRegistraionForm() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={registerStyle.validFormViewContainer}>
        <ScrollView style={registerStyle.inputWrapper}>
          <View style={registerStyle.validFormSubView}>
          <View style={registerStyle.firstFieldView}>
            <TextInputMaterial
              blurText={this.state.name}
              refsValue={Constants.TEXT_INPUT_NAME}
              ref={Constants.TEXT_INPUT_NAME}
              label={Constants.LABEL_NAME}
              maxLength={100}
              autoCapitalize={'none'}
              onChangeText={name => this.setState({ name })}
              returnKeyType={'next'}
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
                this.refs.loginInputEmail.focus();
              }}
            />
            </View>
            
            <View style={registerStyle.validFormSecondFieldView}>
              <TextInputMaterial
                blurText={this.state.email}
                refsValue={Constants.TEXT_INPUT_EMAIL}
                ref={Constants.TEXT_INPUT_EMAIL}
                label={Constants.LABEL_EMAIL}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={email => this.setState({ email })}
                returnKeyType={'next'}
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
                onSubmitEditing={event => {
                  this.refs.loginInputName.focus();
                }}
              />
            </View>
            <View style={registerStyle.validFormSecondFieldView}>
              <TextInputMaterial
                blurText={this.state.username}
                refsValue={Constants.TEXT_INPUT_USERNAME}
                ref={Constants.TEXT_INPUT_USERNAME}
                label={Constants.LABEL_USERNAME}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={username => this.setState({ username })}
                returnKeyType={'next'}
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
            </View>
            <View style={registerStyle.validFormSecondFieldView}>
              <TextInputMaterial
                secureTextEntry={this.state.showPass}
                blurText={this.state.password}
                refsValue={Constants.TEXT_INPUT_PASSWORD}
                showIcon={false}
                value={this.state.password}
                textInputName={this.state.password}
                ref={Constants.TEXT_INPUT_PASSWORD}
                label={Constants.LABEL_PASSWORD}
                secureTextEntry={true} 
                maxLength={50}
                underlineHeight={2}
                isLoginScreen={false}
                returnKeyType="next"
                onChangeText={password => this.setState({ password })}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor={Constants.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={Constants.UNDERLINE_COLOR_ANDROID}
                errorText={Constants.ERROR_TEXT_INPUT_PASSWORD}
                onSubmitEditing={event => {
                  this.refs.confirmPasswordInput.focus();
                }}

              />
            </View>
            <View style={registerStyle.validFormSecondFieldView}>
              <TextInputMaterial
                secureTextEntry={this.state.showPass}
                blurText={this.state.confirmPass}
                refsValue={Constants.TEXT_INPUT_CONFIRM_PASSWORD}
                showIcon={false}
                secureTextEntry={true} 
                value={this.state.confirmPass}
                textInputName={this.state.confirmPass}
                ref={Constants.TEXT_INPUT_CONFIRM_PASSWORD}
                label={Constants.LABEL_CONFIRM_PASSWORD}
                maxLength={50}
                underlineHeight={2}
                isLoginScreen={false}
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

          <View style={registerStyle.registerSwitchView}>
            <Switch onValueChange={() => this.setState({acceptTermsCondition:!this.state.acceptTermsCondition}) } value={this.state.acceptTermsCondition}>
            </Switch>
            <Text style={registerStyle.registerTermsText} onPress={() => Alert.alert('terms and conditions')}>{Constants.LABEL_TERMS_CONDITION}</Text>
          </View>

        </ScrollView>

      </KeyboardAvoidingView>
    );
  }



  renderSubmitButton() {
    return (
          <View style={registerStyle.registerSumbitButtonView}>
            <TouchableOpacity
              style={this.state.acceptTermsCondition?registerStyle.enableButton:registerStyle.disableButton}
              disabled={!this.state.acceptTermsCondition}
              onPress={() => {Alert.alert('clicked') }}
              activeOpacity={1}>
              {}
              <Text
                style={registerStyle.registerSubmitButtonText}>
                {Constants.REGISTER_BUTTON_TEXT}
              </Text>
            </TouchableOpacity>
           
            <View style={registerStyle.registerBackButonView}>
              <TouchableOpacity  onPress={() => Actions.login()}>
                <Text style={registerStyle.registerBackButonText}>Back</Text>
              </TouchableOpacity>
            </View>

          </View>
      


    );
  }
}
RegisterView.propTypes = {
    source: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
  };