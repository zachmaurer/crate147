'use strict';

import React, { Component } from 'react';
var styles = require('./app/styles/styles');
var Login = require('./app/components/Login');

import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  TouchableHighlight,
  TextInput,
} from 'react-native';

class CrateApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{component: Login, name: 'Crate'}}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} route={route} />
        }} />
    );
  }
}

AppRegistry.registerComponent('CrateApp', () => CrateApp);
