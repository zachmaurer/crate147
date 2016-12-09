

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

var orders = require('../assets/restorders.json');
var catalog = require('../assets/catalog.json');

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


var client_maps = {
  3 : require('../assets/map1.png'),
  1 : require('../assets/map2.png'),
  2 : require('../assets/map3.png'),
};


var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })


class RestOrderDetail extends Component {
	constructor(props) {
	      super(props);

	var id = props.route.orderID;
	  function findOrder(e) {
	 	return e.id == id;	
	 }

	 function findProduct(id) {
	 	return  function(e) {
	 		return e.id === id;
	 	}
	 }
	 var order = orders.find(findOrder);
	 var products = [];
	 for (var i=0; i< order.order.length; i++) {
	 	var pid = order.order[i].id;
	 	var qty = order.order[i].qty;
	 	var obj = catalog.find(findProduct(pid)); 	
	 	obj.qty= qty;
            obj.farm = order.order[i].farm;
	 	products.push(obj) 
	 }


	      this.state = {
    		orderID: props.route.orderID,
    		dataSource: ds.cloneWithRows(products)
  	       };  
	    }


  onBackPress(){
    this.props.navigator.pop();
    return true;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

	       renderCatalogLi(data) {
    	return (

    		<View>
		<View style={{flex:1, alignItems: 'center', flexDirection: 'row'}}>	
    		<Image source={catalog_imgs[data.picture]} style={styles.catalog_photo}/>
    		<View style={{flex: 1, flexDirection: 'column'}}>
    		<Text style={styles.order_text_h1}>{data.name} ({data.type})</Text>
            <Text style={styles.order_text_h1}>{data.farm}</Text> 	
    		</View>
            <Text style={{color:'red'}}>Pending</Text>
    		<Text style={styles.order_text_h2}>QTY: {data.qty}</Text>
    		<Text style={styles.order_text_h2}>{data.price}</Text>
    		<Text style={styles.order_text_h2}></Text>
    		</View>
    		</View>

   	);
    }



	render() {
		var id = this.state.orderID;
		  function findOrder(e) {
		 	return e.id == id;	
		 }
		var order = orders.find(findOrder);
		return(
			<View style={styles.container}>
			<View style={{alignItems: 'center', flexDirection: 'row',}}>				
			{/*<Text style={styles.header}> {order.name} </Text>*/}
      <Text style={styles.order_text_title}> {order.name} </Text>
                  
			</View>	
			<View style={{alignItems: 'flex-start', flexDirection: 'column'}}>	
        <Text style={styles.h3}> Order #: {order.id} </Text>
			  <Text style={styles.h3}> Due: {order.date} </Text>
			  <Text style={styles.h3}> Delivery Time: 8:30am </Text>
			</View>	
			
			<Text style={styles.h1}> Order Details </Text>
			<ListView
        			dataSource={this.state.dataSource}
        			renderRow={(rowData) => this.renderCatalogLi(rowData)}
        			renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        			  
 			automaticallyAdjustContentInsets={false}


        			  /> 
                <View style={{justifyContent: 'flex-end',  alignItems: 'flex-end', paddingRight: 30, paddingBottom:40}}>
                <Text style={styles.header}> Total Cost: {order.cost}</Text>
                </View>
             <View style={{flex:1,alignItems: 'center', flexDirection: 'row', justifyContent: 'center',marginBottom:30}}> 

                <TouchableHighlight style={styles.button2}
                  underlayColor='#99d9f4'>
                <Text style={styles.buttonText} onPress={() => this.onBackPress()}>Cancel Order</Text>
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
   product_image: {
  width: 100,
  height: 100,
  borderRadius: 20,
  resizeMode: 'contain',
  paddingLeft: 10,

}, 
li_container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  h1: {
    paddingTop: 20,
    marginLeft: 10,
    fontSize: 22,
    alignSelf: 'center',
    //flex:1,
    //flexDirection: 'row',
  },
   h2: {
    paddingLeft: 25,
    paddingRight: 10,
    fontSize: 16,
    //flex:2,
    flexDirection: 'row',
  },
  h3: {
    paddingLeft: 25,
    paddingRight: 10,
    fontSize: 16,
    //flex:2,
    flexDirection: 'row',
    color: 'red'
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
    fontSize: 24,
    marginLeft: 12,
    flex:1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
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
   map: {
    height: 200,
    flex: 1,
    	resizeMode: 'cover',
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
   header: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 35,
  },
 buttonText: {
  fontSize: 24,
  color: 'white',
  alignSelf: 'center'
},
button1: {
  height: 50,
  width: 200,
  padding: 4,
  margin: 5,
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
},
button2: {
  height: 50,
  width: 200,
  padding: 4,
  margin: 5,
  backgroundColor: '#E03142',
  borderColor: '#E03142',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
},
});

module.exports = RestOrderDetail;
