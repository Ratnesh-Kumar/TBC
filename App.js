/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import splashscreen from './src/scenes/Splash';

import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
} from 'react-native-google-analytics-bridge';
import LoginScreen from './src/scenes/Login';
import Realm from 'realm';
import HomeScreen from './src/scenes/Home';
import MyProfileScreen from './src/scenes/MyProfile';
import MoreScreen from './src/scenes/More';
import FBaseWrite from './src/scenes/FirebaseRW/FBaseWrite';
import FBaseReadItems from './src/scenes/FirebaseRW/FBaseReadItems';
import TabIcon from './src/components/TabIcon';

import {
  StyleSheet
} from 'react-native'
console.disableYellowBox = true;
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
    height:60
  },

  tabBarStyle: {
    backgroundColor: '#fff',
    height:60,
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
    height:60
  },
});

let realm;
let tracker = new GoogleAnalyticsTracker('G-LC2MDJK4YT');

// const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    realm = new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user_details',
          properties: {
            user_name: 'string',
            user_password: 'string',
          },
        },
      ],
    });
    // YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    // YellowBox.ignoreWarnings(['Setting a timer']);
    // YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps has been renamed']);

  }
  componentDidMount() {
    tracker.trackScreenView('Home Screen');
    GoogleAnalyticsSettings.setDispatchInterval(30);
  }

  render() {
    return (
      // <Provider /*store={store}*/>
      <Router hideNavBar={true}>
        <Scene key="root" hideNavBar>
          <Scene
            key="splash"
            component={splashscreen}
            initial={true}
            title="splash"
            duration={0}
          />
          <Scene
            key="login"
            type={ActionConst.RESET}
            component={LoginScreen}
            title="login"
            duration={0}
          />
          {this.renderTabbar()}
        </Scene>
      </Router>
      // </Provider>
    );
  }

  renderTabbar() {
    return (
      <Scene
        key="tabbar"
        tabs={true}
        tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarStyle}  hideNavBar={true} showLabel={false}>
        {/* Tab and it's scenes */}
        <Scene key="home" title="Home" icon={TabIcon} resource={require('./src/public/images/icon-home.png')} hideNavBar>
          <Scene key="home" component={HomeScreen} title="home" />
        </Scene>

        {/* Tab and it's scenes */}
        <Scene key="myProfile" title="My Profile" icon={TabIcon} resource={require('./src/public/images/icon_profile.png')} hideNavBar>
          <Scene key="myProfile" component={MyProfileScreen} title="Blue" hideNavBar />
          <Scene key="fbai" component={FBaseWrite} title="FB Add Item" />
          <Scene key="fbri" component={FBaseReadItems} title="FB Read" />
        </Scene>

        {/* Tab and it's scenes */}
        <Scene key="more" title="More" icon={TabIcon}  resource={require('./src/public/images/tabbar_more.png')}  hideNavBar>
          <Scene key="more" component={MoreScreen} title="More" />
        </Scene>
      </Scene>
    )
  }

  renderLaunchScreen() {
    return (
      <Scene key="splashRoot">
        <Scene
          key="splashScreen"
          component={splashscreen}
          title="Splash"
          initial
          hideNavBar
        />
      </Scene>
    );
  }
}
