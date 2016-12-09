

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
  ScrollView,
} from 'react-native';

import Hr from 'react-native-hr';

var orders = require('../assets/orders.json');
var catalog = require('../assets/catalog.json');
var sparklines = require('../assets/analytics.png');

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
  			<View style={{marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>	
    			<Image source={catalog_imgs[product.picture]} style={styles.product_image}/>
    			<Text style={styles.order_text_h1}> {product.name} </Text>
  			</View>
        <Hr lineColor='#CECECE' />
        <View>
          <Text style={styles.order_text_title}> Product Info </Text>
          <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: 20, flex: 0.35, flexDirection:'column'}}>
          			<Text style={styles.order_text_h2}> Unit Price: </Text>
          			<Text style={styles.order_text_h2}> Quality: </Text>
          			<Text style={styles.order_text_h2}> Is Available: </Text>
              </View>
              <View style={{flex: 0.65, flexDirection:'column'}}>
                <Text style={styles.order_text_h2}> {product.price} </Text>
                <Text style={styles.order_text_h2}> {product.type} </Text>
                <Text style={styles.order_text_h2}> {product.available ? "Yes" : "No" } </Text>
              </View>
          </View>
    			<Text style={styles.order_text_title}> Product Stats </Text>
          <Text style={styles.order_text_h3}> Data for period Nov. 29 - Dec. 30 </Text>
    			
        </View>
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
    paddingTop:70,
  },
   product_image: {
  width: 100,
  height: 100,
  borderRadius: 20,
  resizeMode: 'cover',
  paddingLeft: 10,
  marginLeft: 5,
  marginTop: 5,

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
  order_text_h3: {
    paddingLeft: 25,
    paddingRight: 10,
    fontSize: 12,
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
    height:200,
    width: 400,
    alignItems: 'center',
    resizeMode: 'stretch',
  }
});


module.exports = ProductDetail;