import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { Actions } from 'react-native-router-flux';
import recoverStyle from './recoverAccountStyle';
import analytics from '@react-native-firebase/analytics';
var commonConstants = require('../../config/Constants');


export default class RecoverAccountView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:''
        };

    }
    render() {
        analytics().setCurrentScreen('Recover Account');
        return (
            <View style={recoverStyle.renderContainer}>
                {this.renderHeaderView()}
                {this.renderRecoverAccountTitle()}
                {this.renderRecoverForm()}
                {this.renderSubmitButton()}

            </View>
        );
    }
    renderHeaderView() {
        let title = "Recover account";
        
        return (
          <Header isleftArrowDisplay={false} title={title}  />
        );
      }

    renderRecoverAccountTitle() {
        return (
            //Enter your email and receive instructions to regain your access.
            <View style={recoverStyle.registerTitleView}>
                <Text style={recoverStyle.registerTitleText}>{'Ingrese su correo electrónico y reciba instrucciones para recuperar su acceso.'}</Text>
            </View>
        )
    }
    renderRecoverForm() {
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={recoverStyle.validFormViewContainer}>
                <View style={recoverStyle.inputWrapper}>
                    <View style={recoverStyle.validFormSubView}>
                    <View style={recoverStyle.firstFieldView}>
                        <TextInputMaterial
                            blurText={this.state.email}
                            refsValue={commonConstants.TEXT_INPUT_EMAIL}
                            ref={commonConstants.TEXT_INPUT_EMAIL}
                            label={commonConstants.LABEL_EMAIL}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={email => this.setState({ email })}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={styles.input}
                            placeholderTextColor={commonConstants.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.email}
                            textInputName={this.state.email}
                            errorText={commonConstants.ERROR_TEXT_INPUT_USERNAME}
                            underlineHeight={2}
                            keyboardType="email-address"
                        />
                    </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }

    renderSubmitButton() {
        return (

            <View style={recoverStyle.recoverSumbitButtonView}>
                <TouchableOpacity
                    style={recoverStyle.button}
                    onPress={() => { }}
                    activeOpacity={1}>
                    {}
                    <Text
                        style={recoverStyle.recoverSubmitButtonText}>
                        {commonConstants.SUBMIT_BUTTON_TEXT}
                    </Text>
                </TouchableOpacity>

                <View style={recoverStyle.recoverBackButonView}>
                    <TouchableOpacity onPress={() => { Actions.register() }}>
                        <Text style={recoverStyle.recoverBackButonText}>*Back</Text>
                    </TouchableOpacity>
                </View>

            </View>



        );

    }
}
RecoverAccountView.propTypes = {
    source: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
  };