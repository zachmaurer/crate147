
import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';

import Test from './Test.js';
import Catalog from './Catalog.js';
import Shop from './Shop.js';


class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: null,
      };
    }

    usernameInput(event) {
      this.setState({ username: event.nativeEvent.text });
    }

    onLogin(event) {
      if(this.state.username.toLowerCase() === "farm") {
        this.props.navigator.replace({
          title: 'Crate',
          component: Catalog,
          appState: this.state
        });
      } else if(this.state.username.toLowerCase() === "rest") {
        this.props.navigator.replace({
          title: 'Crate',
          component: Shop,
          appState: this.state
        });
      } else {
        Alert.alert("Oops! Login Error.","Invalid username/password.")
      }
    }


  render() {
        return (
          <View style={styles.container}>
            <Image source={require('../.././app/assets/logo.png')} style={styles.image}/>
            <View style={{flex:1}}>
                <Text> Log In </Text>
                <TextInput
                style={styles.userInput}
                placeholder='Username'
                value={this.state.username}
                onChange={this.usernameInput.bind(this)}/>
                <TextInput  secureTextEntry={true}
                style={styles.userInput}
                placeholder='Password'/>

              <TouchableHighlight style={styles.button}
                  underlayColor='#99d9f4'>
                <Text style={styles.buttonText} onPress={this.onLogin.bind(this)}>Log In</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button}
    underlayColor='#99d9f4'>
  <Text style={styles.buttonText}>Sign Up</Text>
</TouchableHighlight>
            </View>
          </ View>
         
    );
  }  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 70,
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
  width: 200,
  height: 200,
  resizeMode: 'contain',
},
flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  width: 250,
  padding: 4,
  margin: 5,
  //flex: 1,
  //flexDirection: 'column',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
userInput: {
  height: 40,
  width: 250,
  padding: 4,
  margin: 5,
  //flex: 1,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 5,
  //color: '#48BBEC'
},

});

module.exports = Login;