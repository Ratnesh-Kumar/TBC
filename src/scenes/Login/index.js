/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-loginStyle */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Animated,
  ActivityIndicator,
  StyleSheet,
  Easing,
  Alert,
} from 'react-native';
import TextInputMaterial from '../../components/textInputMaterial';
import PropTypes from 'prop-types';
import Constants from '../../config/Constants';
import { ScrollView } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux';
import { getFBRealtimeDBFeatureFlags } from '../../config/firebasequery'
// import Realm from 'realm';
import { TBC_COLOR } from '../../config/colorConstant';
import TouchID from 'react-native-touch-id';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import loginStyle from './LoginStyle';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import analytics from '@react-native-firebase/analytics';
var commonConstants = require('../../config/Constants');
var colorConstant = require('../../config/colorConstant')
let realm;
const siteKey = '6Le2394UAAAAAHlpjMsukQVuXNAMFLClkynBAQTh';
const baseUrl = 'https://lami.net.in';
const MARGIN = 40;
const DEVICE_WIDTH = Dimensions.get('window').width;
var isCaptchaDisplay = false;
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      isLoading: false,
      username: '',
      password: '',
      user_name: '',
      token: '',
      userInfo: null,
      doContinueWithGoogle: false,
      gettingLoginStatus: true,
      profile_pic: '',
      isTouchIdSupported: false,
      isFaceIdSupported: false,
    };
    this.showPass = this.showPass.bind(this);
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this.onMessage = this.onMessage.bind(this);
    // realm = new Realm({ path: 'UserDatabase.realm' });
    //creating temporary user logins
    // realm.write(() => {
    //   realm.create('user_details', {
    //     user_name: 'admin1',
    //     user_password: 'admin1',
    //   });
    // });
    this.isTouchIdSupported()
    this.getFireBaseValue();
  }

  componentDidMount() {
    //initial configuration
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: '1002284040958-85g2t4o1f5qqve7449c798767sbcb4il.apps.googleusercontent.com',
    });
    //Check if user is already signed in
    this._isSignedIn();
    
  }

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      //alert('User is already signed in');
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      //alert("Please Login");
      console.log('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({
        userInfo: userInfo,
        doContinueWithGoogle: true
      });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
      Actions.login()
    } catch (error) {
      console.error(error);
    }
  };

  async getFireBaseValue() {
    let featureFlags = await getFBRealtimeDBFeatureFlags();
    isCaptchaDisplay = featureFlags.isCaptchaDisplay
  }
  isTouchIdSupported() {
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    }

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          this.setState({ isFaceIdSupported: true, isTouchIdSupported: true })
          console.log('FaceID is supported.');
        } else {
          this.setState({ isFaceIdSupported: false, isTouchIdSupported: true })
          console.log('TouchID is supported.');
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  }

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  onMessage = event => {
    console.log('########## onMeassage: ' + event);
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        console.log('error', event.nativeEvent.data);
        this.captchaForm.hide();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        setTimeout(() => {
          this.captchaForm.hide();
          // do what ever you want here
        }, 1500);
      }
    }
  };
  renderRegisterLink() {
    return (
      <View>
        <TouchableOpacity onPress={() => Actions.register()}>
          <Text style={loginStyle.loginRegisterButonText}>
            Quiero registrar me
</Text>
        </TouchableOpacity>
      </View>
    )
  }
  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      console.log('result of fb' + JSON.stringify(result))
      // alert(JSON.stringify(result));
      this.setState({ user_name: 'Welcome' + ' ' + result.name });
      this.setState({ token: 'User Token: ' + ' ' + result.id });
      this.setState({ profile_pic: result.picture.data.url });
      Actions.tabbar({ userName: this.state.user_name })
    }
  };

  onLogout = () => {
    //Clear the state after logout
    console.log('logout of')
    this.setState({ user_name: null, token: null, profile_pic: null });
  };
  checkFBLogin() {
    return (
      <View >
        <LoginButton
          style={loginStyle.fbButton}
          readPermissions={['public_profile']}
          onLoginFinished={(error, result) => {
            console.log('fb button pressed')
            if (error) {
              console.log(error)
              alert(error);
              alert('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log(result.isCancelled)
              alert('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString())
                // alert(data.accessToken.toString());
                const processRequest = new GraphRequest(
                  '/me?fields=name,picture.type(large)',
                  null,
                  this.get_Response_Info
                );
                // Start the graph request.
                new GraphRequestManager().addRequest(processRequest).start();
              });
              
            }
          }}
          onLogoutFinished={this.onLogout}
        />
      </View>

    )
  }
  checkGoogleSign() {
    if (this.state.gettingLoginStatus) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (this.state.userInfo != null && (this.state.doContinueWithGoogle === true)) {
      //Showing the User detail
      Actions.tabbar({ userName: this.state.userInfo.user.username })
      return (
        <View>
          <TouchableOpacity style={loginStyle.logoutButton} onPress={this._signOut}>
            <Text style={loginStyle.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      //For login showing the Signin button
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 312, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this._signIn}
          />


        </View>
      );
    }
  }


  render() {
    analytics().setCurrentScreen('HOME');
    return (
      <ScrollView style={loginStyle.renderContainer} showsVerticalScrollIndicator={false}>
        {this.renderLoginTitle()}
        {this.renderValidationForm()}
        {this.renderSubmitButton()}
        {this.renderRegisterLink()}
        {/* {this.renderTouchIdAndFaceId()} */}
        {this.checkGoogleSign()}
        {this.checkFBLogin()}
        <ConfirmGoogleCaptcha
          ref={_ref => this.captchaForm = _ref}
          siteKey={siteKey}
          baseUrl={baseUrl}
          languageCode='en'
          onMessage={() => this.onMessage()}
        />
      </ScrollView>
    );
  }

  // renderTouchIdAndFaceId() {
  //   return (
  //     <View style={loginStyle.touchIdContainer}>
  //       {(this.state.isTouchIdSupported) ? <TouchableOpacity onPress={() => { this.handleBioAuthentication() }}>
  //         <Text style={loginStyle.touchIdLinkView}>{'Login with Touch ID / Face ID'}</Text>
  //       </TouchableOpacity> : null}
  //       <TouchableOpacity onPress={() => { (isCaptchaDisplay) ? this.captchaForm.show() : alert("Login Success") }} style={loginStyle.reCaptchaView}>
  //         <Text style={loginStyle.touchIdLinkView}>{'reCaptcha'}</Text>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }



  handleBioAuthentication() {
    let typeBioMatrix = "Touch ID";
    if (this.state.isFaceIdSupported) {
      typeBioMatrix = "Face ID";
    }
    const optionalConfigObject = {
      title: typeBioMatrix + " Authentication", // use unified error messages (default false)
      imageColor: colorConstant.TBC_COLOR, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
      imageErrorColor: colorConstant.BROWSE_RED,
      cancelText: 'Close'
    }
    TouchID.authenticate('Biomatrix Login', optionalConfigObject)
      .then(success => {
        // Success code
        Actions.tabbar()
        // alert('Authentication Successful')
      })
      .catch(error => {
        // Failure code
        alert('Authentication Failed!')
      });
  }

  renderLoginTitle() {
    return (
      <View style={loginStyle.loginTitleView}>
        <View style={{ alignItems: 'space-around', flexDirection: 'row' }}>
          {/* <Image source={logo} style={{height:60,width:80}}/> */}
          <Text style={loginStyle.loginTitleText}>{'A L B Y A'}</Text>
        </View>
        <Text style={loginStyle.subHeading}>The New Aesthetic</Text>
      </View>
    )
  }

  renderValidationForm() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={loginStyle.validFormViewContainer}>
        <View style={loginStyle.inputWrapper}>
          <Text style={loginStyle.headingText}>{"Ingressa correo electronico y contrasena: "}</Text>
          <View style={loginStyle.validFormSubView}>
            <View style={loginStyle.firstFieldView}>
              <TextInputMaterial
                blurText={this.state.username}
                refsValue={commonConstants.TEXT_INPUT_USERNAME}
                ref={commonConstants.TEXT_INPUT_USERNAME}
                label={commonConstants.LABEL_USERNAME}
                maxLength={100}
                autoCapitalize={'none'}
                onChangeText={username => this.setState({ username })}
                returnKeyType={'done'}
                autoCorrect={false}
                isLoginScreen={false}
                style={loginStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={commonConstants.UNDERLINE_COLOR_ANDROID}
                value={this.state.username}
                textInputName={this.state.username}
                errorText={commonConstants.ERROR_TEXT_INPUT_USERNAME}
                underlineHeight={2}
                keyboardType="email-address"
                onSubmitEditing={event => {
                  this.refs.passwordInput.focus();
                }}
              />
            </View>

            <View style={loginStyle.validFormSecondFieldView}>
              <TextInputMaterial
                secureTextEntry={this.state.showPass}
                blurText={this.state.password}
                refsValue={commonConstants.TEXT_INPUT_PASSWORD}
                showIcon={false}
                value={this.state.password}
                textInputName={this.state.password}
                ref={commonConstants.TEXT_INPUT_PASSWORD}
                label={commonConstants.LABEL_PASSWORD}
                maxLength={50}
                underlineHeight={2}
                isLoginScreen={false}
                returnKeyType="next"
                onChangeText={password => this.setState({ password })}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                style={loginStyle.input}
                placeholderTextColor={colorConstant.PLACEHOLDER_TEXT_COLOR}
                underlineColorAndroid={colorConstant.UNDERLINE_COLOR_ANDROID}
                errorText={commonConstants.ERROR_TEXT_INPUT_PASSWORD}
                onFocus={() => this.inputFocused.bind(this)}
              />
            </View>
            {/* <TouchableOpacity
                        activeOpacity={0.7}
                        style={loginStyle.btnEye}
                        onPress={this.showPass}>
                        <Image source={commonConstants.EYE_ICON} style={loginStyle.iconEye} />
                    </TouchableOpacity>  */}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  renderSubmitButton() {
    return (
      <View style={loginStyle.loginSumbitButtonView}>
        <TouchableOpacity
          style={loginStyle.button}
          onPress={() => {Actions.tabbar(),analytics().logEvent('LoginFrom',{id:3,name:'SubmiButton'})}}
          activeOpacity={1}>
          {}
          <Text
            style={loginStyle.loginSubmitButtonText}>
            {commonConstants.LOGIN_BUTTON_TEXT}
          </Text>

        </TouchableOpacity>

      </View>
    );
  }
  onPress() {
    const { username } = this.state;
    const { password } = this.state;

    // var user_details = realm
    //   .objects('user_details')
    //   .filtered('user_name =$0 && user_password=$1', username, password);

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
});


