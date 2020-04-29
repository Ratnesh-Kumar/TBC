import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
    Animated,
  } from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import Constants from '../../config/Constants';

import styles from './RecoverAccountStyle';
import { Actions } from 'react-native-router-flux';
import Realm from 'realm';

var contants = require('../../config/Constants')
var colorConstant = require('../../config/colorConstant')
let realm;

const MARGIN = 40;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class RecoverAccountView extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    }
    render() {
        return (
          <View style={{ flex: 1, backgroundColor: colorConstant.WHITE_COLOR }}>
            {this.renderRecoverAccountTitle()}
            {this.renderRecoverForm()}
            {this.renderSubmitButton()}
            
          </View>
        );
      }
      renderRecoverAccountTitle() {
        return (
          <View style={{ height: contants.SCREEN_HEIGHT / 3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, color: colorConstant.TBC_COLOR }}>{'Recover Account'}</Text>
          </View>
        )
      }
      renderRecoverForm(){
          return(
            <KeyboardAvoidingView
            behavior="height"
            style={{ flex: 1, alignItems: 'center' }}>
            <View style={styles.inputWrapper}>
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
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
                errorText={Constants.ERROR_TEXT_INPUT_USERNAME}
                underlineHeight={2}
                keyboardType="email-address"
              />
                </View>
                </View>
                </KeyboardAvoidingView>
          );
      }

      renderSubmitButton(){
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
                    onPress={() => { }}
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
                  <View style={{ paddingTop: 10, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => {Actions.register()}}>
                      <Text>Back</Text>
                    </TouchableOpacity>
                  </View>
      
                </View>
              </Animated.View>
      
            </KeyboardAvoidingView>
        );

    }

    
}