import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import styles from './registerStyle';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import {  Switch } from 'native-base';
import registerStyle from './registerStyle';
import { ScrollView } from 'react-native-gesture-handler';

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
    return (
      <ScrollView scrollEnabled={false} overScrollMode={'always'} keyboardShouldPersistTaps={'handled'} style={registerStyle.renderContainer}>
        {this.renderHeaderView()}
        {this.renderRegisterTitle()}
        {this.renderRegistraionForm()}
        {/*this.renderTermsCondition()*/}
        {this.renderSubmitButton()}
      </ScrollView>

    );
  }
  renderHeaderView() {
    let title = "Create new account";
    
    return (
      <Header isleftArrowDisplay={false} title={title}  />
    );
  }
  renderRegisterTitle() {
    return (
      <View style={registerStyle.registerTitleView}>
        <Text style={registerStyle.registerTitleText}>{'Create New Account Text'}</Text>
      </View>
    )
  }
  renderRegistraionForm() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={registerStyle.validFormViewContainer}>
        <View style={registerStyle.inputWrapper}>
          <View style={registerStyle.validFormSubView}>
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
            <View style={registerStyle.validFormSecondFieldView}>
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
            <View style={registerStyle.validFormSecondFieldView}>
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
            <View style={registerStyle.validFormSecondFieldView}>
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

          <View style={registerStyle.registerSwitchView}>
            <Switch onValueChange={() => this.setState({acceptTermsCondition:!this.state.acceptTermsCondition}) } value={this.state.acceptTermsCondition}>
            </Switch>
            <Text style={registerStyle.registerTermsText} onPress={() => Alert.alert('terms and conditions')}>{Constants.LABEL_TERMS_CONDITION}</Text>
          </View>

        </View>

      </KeyboardAvoidingView>
    );
  }



  renderSubmitButton() {
    return (
          <View style={registerStyle.registerSumbitButtonView}>
            <TouchableOpacity
              style={registerStyle.button}
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