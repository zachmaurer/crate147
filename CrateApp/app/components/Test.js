import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';

class Test extends Component {
    render() {
        return (
            <View style={styles.container}>
             <Image source={require('../.././app/assets/logo.png')} style={styles.image}/>
            <Text>
            Success!
            </Text>
            </View>

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


module.exports = Test;