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
  Alert,
} from 'react-native';

import Shop from './Shop.js'

var orders = require('../assets/orders.json');
var catalog = require('../assets/catalog.json');
var farms = require('../assets/farms.json');
var prices = require('../assets/prices.json');

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

var farm_imgs = {
  1 : require('../assets/farm_imgs/rochester.jpg'),
  2 : require('../assets/farm_imgs/delorro.jpg'),
  /*9 : require('../assets/farm_imgs/4-stars.jpg'),*/
};



class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = props.route.appState;
    this.state['farmID'] = props.route.farmID;
    this.state['product'] = props.route.product;
    var _this = this;
    this.is_in_season = (function(){
      return _this.state.product.season ? "Yes" : "No";
    })();
  }

  onBackPress(){
    this.props.navigator.pop();
    return true;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  returnToShop(){
    Alert.alert("Item Added!", "Added item to Crate");
    this.props.navigator.replace({
      title: "Crate",
      component: Shop,
      appState: this.state,
    });
  }


  render() {
    var id = this.state.farmID;
    function withProductID(e) {
      return e.id == id;
    }
    var farm = farms.find(withProductID);
    return(
      <View style={styles.container}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}> 
        <Image source={farm_imgs[this.state.farmID]} style={styles.product_image}/>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.order_text_title}>  {farm.name} </Text>
          <Text style={styles.order_text_h2}>Customer Rating: {farm.rating}</Text>
        </View>
      </View>
      <Text style={styles.order_text_h1}>Order Information</Text>
      <Text style={styles.order_text_h2}>{this.state.product.name}</Text>
      <Text style={styles.order_text_h2}>{this.state.product.type} {this.state.product.category}</Text>
      <Text style={styles.order_text_h2}>In Season: {this.is_in_season}</Text>
      <Text style={styles.order_text_h2}>Price: {this.state.product.price} </Text>
      <View style={{alignItems: 'center'}}>
        <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'
          onPress={() => this.returnToShop()}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableHighlight>
      </View>
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
 product_image: {
  width: 100,
  height: 100,
  borderRadius: 20,
  resizeMode: 'cover',
  paddingLeft: 10,
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
    justifyContent: 'center',
  },
  order_text_h1: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 18,
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

module.exports = OrderSummary;