import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import recoverStyle from './recoverAccountStyle';
import firebase from 'react-native-firebase';
var commonConstants = require('../../config/Constants');


export default class RecoverAccountView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:''
        };

    }
    render() {
        firebase.analytics().setCurrentScreen('Recover Account');
        return (
            <View style={recoverStyle.renderContainer}>
                {this.renderRecoverAccountTitle()}
                {this.renderRecoverForm()}
                {this.renderSubmitButton()}

            </View>
        );
    }
    renderRecoverAccountTitle() {
        return (
            <View style={recoverStyle.registerTitleView}>
                <Text style={recoverStyle.registerTitleText}>{'Recover Account'}</Text>
            </View>
        )
    }
    renderRecoverForm() {
        return (
            <KeyboardAvoidingView
                behavior="height"
                style={recoverStyle.validFormViewContainer}>
                <View style={recoverStyle.inputWrapper}>
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
                        <Text style={recoverStyle.recoverBackButonText}>Back</Text>
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