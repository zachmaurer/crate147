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



class ProductOffers extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      productID: props.route.productID,
      priceData: this.ds.cloneWithRows(prices),
    };
  }

  onBackPress(){
    this.props.navigator.pop();
    return true;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  renderPricesLi(data) {
      return (
        <TouchableHighlight onPress={() => this.viewProductDetail(data.id)}>
        <View>
          <View style={{flex:1, alignItems: 'center', flexDirection: 'row'}}> 
            <Text>{JSON.stringify(data)}</Text>
          </View>
        </View>
        </TouchableHighlight>

    );
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
      <ListView
        dataSource={this.state.priceData}
        renderRow={(rowData) => this.renderPricesLi(rowData)}
      />
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
  order_text_h1: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 16,
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


});

module.exports = ProductOffers;