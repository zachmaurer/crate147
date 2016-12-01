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
  TouchableHighlight,
  TextInput,
} from 'react-native';



class CrateApp extends Component {
  render() {
    return (
      <ReactNative.NavigatorIOS
        style={{flex:1}}
        initialRoute={{
          title: 'Crate',
          component: Login,    
        }}/>
    );
  }
}



AppRegistry.registerComponent('CrateApp', () => CrateApp);
