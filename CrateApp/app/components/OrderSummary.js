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

import Hr from 'react-native-hr';
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

var profile_imgs = {
  1 : require('../assets/profile_imgs/1.jpg'),
  2 : require('../assets/profile_imgs/2.jpg'),
  3 : require('../assets/profile_imgs/3.jpg'),
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
    this.state['orderQuant'] = 1;
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

  orderQuantPlus(){
    var result = this.state.orderQuant + 1;
    if(result < 10) {
      this.setState({
        orderQuant: result
      });
    }
  }

  orderQuantMinus(){
  var result = this.state.orderQuant - 1;
    if(result > 0) {
      this.setState({
        orderQuant: result
      });
    }
  }

  render() {
    var id = this.state.farmID;
    function withProductID(e) {
      return e.id == id;
    }
    var farm = farms.find(withProductID);
    return(
      <ScrollView style={styles.container}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}> 
        <Image source={farm_imgs[this.state.farmID]} style={styles.product_image}/>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.order_text_title}>  {farm.name} </Text>
          <Text style={styles.order_text_h2}>Customer Rating: {farm.rating}</Text>
        </View>
      </View>
      <View style={{marginTop:10}}></View>
      <Hr lineColor='#8E8E8E' />
      <View style={{flexDirection:'row'}}>
        <View style={{flex:0.5, flexDirection:'column'}}>
          <Text style={styles.order_text_h1_lo}>Order Information</Text>
          <Text style={styles.order_text_h2}>{this.state.product.name}</Text>
          <Text style={styles.order_text_h2}>{this.state.product.type} {this.state.product.category}</Text>
          <Text style={styles.order_text_h2}>In Season: {this.is_in_season}</Text>
          <Text style={styles.order_text_h2}>Price: {this.state.product.price} </Text>
        </View>
        <View style={{flex:0.5, flexDirection:'column', alignItems:'flex-end', justifyContent:'flex-end', marginRight: 12}}>
          <Image source={catalog_imgs[this.state.product.picture]} style={styles.product_image} />
        </View>
      </View>
      <Hr lineColor='#8E8E8E' />
      <View style={{flex:1, flexDirection:'column'}}>
        <View style={{marginTop: 5, flexDirection:'row', alignSelf:'center', justifyContent:'center'}}>
          <Text style={styles.order_text_h1_lo}>Order Quantity</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column', flex:0.40, alignItems:'flex-end', justifyContent:'flex-end'}}>
            <TouchableHighlight style={styles.button_small}
              underlayColor='#99d9f4'
              onPress={() => this.orderQuantMinus()}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableHighlight>
          </View>
          <View style={{flexDirection:'column', flex:0.2}}>
            <TouchableHighlight style={styles.button_screen}
              underlayColor='#99d9f4'>
              <Text style={styles.buttonText_screen}>{this.state.orderQuant}</Text>
            </TouchableHighlight>
          </View>
          <View style={{flexDirection:'column', flex: 0.4, alignItems:'flex-start', justifyContent:'flex-start'}}>
            <TouchableHighlight style={styles.button_small}
              underlayColor='#99d9f4'
              onPress={() => this.orderQuantPlus()}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems: 'center', alignSelf: 'center'}}>
          <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={() => this.returnToShop()}>
            <Text style={styles.buttonText}>Add to Crate</Text>
          </TouchableHighlight>
        </View>
        <Hr lineColor='#8E8E8E' />
      </View>

      {/*Reviews*/}
      <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Text style={styles.order_text_title}>Reviews</Text>
      </View>
      {/*#1*/}
      <View style={{marginTop: 30, flex:1, flexDirection:'row'}}>
        <View style={{flex:0.25, flexDirection:'column', alignItems:'center'}}>
          <Image source={profile_imgs[1]} style={styles.catalog_photo}/>
        </View>
        <View style={{flex:0.75, flexDirection:'column'}}>
          <View style={{flex:0.4, flexDirection:'row'}}>
            <Text style={styles.order_text_h1_lo}>Douglas Robinson</Text>
          </View>
          <View style={{flex:0.6, flexDirection:'row'}}>
          <Text style={styles.order_text_h2}>They consistently deliver on their promise for high-quality, fresh, sustainable ingredients. I am proud to be their partner in our mission for sustainable food, and I and one of many satisfied customers.</Text>
          </View>
        </View>
      </View>
      {/*#2*/}
      <View style={{marginTop: 30, flex:1, flexDirection:'row'}}>
        <View style={{flex:0.25, flexDirection:'column', alignItems:'center'}}>
          <Image source={profile_imgs[2]} style={styles.catalog_photo}/>
        </View>
        <View style={{flex:0.75, flexDirection:'column'}}>
          <View style={{flex:0.4, flexDirection:'row'}}>
            <Text style={styles.order_text_h1_lo}>Anita Lao</Text>
          </View>
          <View style={{flex:0.6, flexDirection:'row'}}>
          <Text style={styles.order_text_h2}>Great ingredients from people you can count on.  Their dedication to sustainable food is inspiring, and they never forget how their food is going to end up on someone's table.  Truly great partners.</Text>
          </View>
        </View>
      </View>
      {/*#3*/}
      <View style={{marginTop: 30, flex:1, flexDirection:'row'}}>
        <View style={{flex:0.25, flexDirection:'column', alignItems:'center'}}>
          <Image source={profile_imgs[3]} style={styles.catalog_photo}/>
        </View>
        <View style={{flex:0.75, flexDirection:'column'}}>
          <View style={{flex:0.4, flexDirection:'row'}}>
            <Text style={styles.order_text_h1_lo}>Terry Moynihan</Text>
          </View>
          <View style={{flex:0.6, flexDirection:'row'}}>
          <Text style={styles.order_text_h2}>I've been sourcing from them for over 3 years, and they have never flagged in quality.  Plus, they offer some of the best deals in the area.</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop:60}}></View>
      </ScrollView>
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
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 18,
    //flex:1,
    //flexDirection: 'row',
  },
  order_text_h1_lo: {
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
buttonText_screen: {
  fontSize: 18,
  color: '#000000',
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
  alignSelf: 'center',
  justifyContent: 'center'
},
button_small: {
  height: 36,
  width: 36,
  padding: 4,
  marginTop: 10,
  //flex: 1,
  //flexDirection: 'column',
  backgroundColor: '#8F8F8F',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
},
button_screen: {
  height: 36,
  width: 74,
  padding: 4,
  marginTop: 10,
  //flex: 1,
  //flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'center',
  justifyContent: 'center',
}


});

module.exports = OrderSummary;