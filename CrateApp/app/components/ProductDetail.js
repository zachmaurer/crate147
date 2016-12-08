

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
  BackAndroid,
} from 'react-native';

var orders = require('../assets/orders.json');
var catalog = require('../assets/catalog.json');
var sparklines = require('../assets/sparklines.png');

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


class ProductDetail extends Component {
	constructor(props) {
	      super(props); 
	      this.state = {
    		productID: props.route.productID
  	       };
	    }

  onBackPress(){
    this.props.navigator.pop();
    return true;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

	render() {


		var id = this.state.productID;
		function withProductID(e) {
		 	return e.id == id;
		}
		var product = catalog.find(withProductID);


		return(
			<View style={styles.container}>
			<View style={{alignItems: 'center', flexDirection: 'row'}}>	
			<Image source={catalog_imgs[product.picture]} style={styles.product_image}/>
			<Text style={styles.order_text_h1}> {product.name} </Text>
			</View>
			<Text style={styles.order_text_h2}> {product.price} </Text>
			<Text style={styles.order_text_h2}> {product.type} </Text>
			<Text style={styles.order_text_h2}> Is Available? {product.available ? "Yes" : "No" } </Text>
			<Text style={styles.order_text_h1}> Product Stats </Text>
			<Image source={sparklines} style={styles.sparklines}/>
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
  order_text_h1: {
    paddingTop: 10,
    marginLeft: 10,
    fontSize: 20,
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
  sparklines: {
    height: 200,
    resizeMode: 'stretch',
  }
});


module.exports = ProductDetail;