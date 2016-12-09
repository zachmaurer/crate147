import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TextInput,
  ListView,
  ScrollView,
  BackAndroid,
} from 'react-native';



var restorders = require('../assets/restorders.json');
var orders = require('../assets/orders.json');
var catalog = require('../assets/catalog.json');
var crate = require('../assets/crate.json');

var catalog_imgs = {
	"gouda.jpg" : require('../assets/catalog_imgs/gouda.jpg'),
	"tomato.jpg" : require('../assets/catalog_imgs/tomato.jpg'),
	"milk.jpg" : require('../assets/catalog_imgs/milk.jpg'),
	"strawberry.jpg" : require('../assets/catalog_imgs/strawberry.jpg'),
};

var company_imgs = {
	1 : require('../assets/company_imgs/1.jpg'),
	3 : require('../assets/company_imgs/2.jpg'),
	2 : require('../assets/company_imgs/3.jpg'),
};



class Payment extends Component {

  constructor(props) {
      super(props);
      this.state = props.route.appState;
      
    }


  onBackPress(){
    return true;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Payment page.</Text>
      </View>   
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 0,
    //flexDirection: 'row',
  },
   order_image: {
  width: 200,
  height: 200,
  resizeMode: 'contain',

}, 
li_container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  order_text_title: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 26,
    //flex:1,
    //flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  order_text_h1: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 16,
    //flex:1,
    //flexDirection: 'row',
  },
  order_text_h1_bold: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    //flex:1,
    //flexDirection: 'row',
  },
  order_text_h1_plus_bold: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 20,
    fontWeight: 'bold',
    //flex:1,
    //flexDirection: 'row',
  },
  order_text_h1_plus_plus_bold: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 24,
    fontWeight: 'bold',
    //flex:1,
    //flexDirection: 'row',
  },
   order_text_h2: {
    paddingLeft: 25,
    paddingRight: 10,
    fontSize: 14,
    //flex:2,
    flexDirection: 'row',
  },
  order_text_h2_1: {
    paddingLeft: 25,
    paddingRight: 10,
    fontSize: 16,
    //flex:2,
    flexDirection: 'row',
  },
  catalog_photo: {
    marginLeft: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    resizeMode: 'cover',
       flexDirection: 'row',
  },
   company_photo: {
    marginLeft: 10,
    height: 40,
    width: 80,
    borderRadius: 20,
    resizeMode: 'stretch',
       flexDirection: 'row',
  },
   separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  separator_2: {
    height: 1,
    backgroundColor: '#8E8E8E',
  },
  important_text :{
    color: '#D52941'
  },
   search_container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  search_input: {
    height: 42,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  header: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 24,
  },
  buttonText: {
  fontSize: 22,
  color: 'white',
  alignSelf: 'center'
  },
  button: {
    height: 56,
    width: 250,
    padding: 4,
    margin: 5,
    marginTop: 40,
    //flex: 1,
    //flexDirection: 'column',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },

});

module.exports = Payment;