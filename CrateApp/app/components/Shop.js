
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


// react-native-tabs is not a default node package
// if package missing, 'npm install react-native-tabs'
import Tabs from 'react-native-tabs';
import Hr from 'react-native-hr';
import ProductOffers from './ProductOffers.js';
import RestOrderDetail from './RestOrderDetail.js';
import Payment from './Payment.js';


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



export default class Shop extends Component {

  constructor(props) {
      super(props);
      this.state = props.route.appState;
      this.state["page"] = "search";
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state['orderData'] = ds.cloneWithRows(orders);
      this.state['catalogData'] = ds.cloneWithRows(catalog);
      this.state['crateData'] = ds.cloneWithRows(crate);
      //this.setState({page: "orders"});
      //console.warn(JSON.stringify(props.appState));

      this.state['restorderData'] = ds.cloneWithRows(restorders);
       
    }


    viewOrderDetail(id) {
        this.props.navigator.push({
          title: "Order Detail",
          component: RestOrderDetail,
          orderID: id
        });
    }


  onBackPress(){
    return true;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

    viewProductOffers(id) {
        this.props.navigator.push({
          title: "Farms Offering Product",
          component: ProductOffers,
          productID: id,
          appState: this.state,
        });
    }

    enterPayment() {
        this.props.navigator.push({
          title: "Payment",
          component: Payment,
          totalAmt: "170.40",
          //appState: this.state,
        });
    }

  searchData (searchText, view) { 
	
     	 let text = searchText.toLowerCase();
     	 let items = null;
	if (view.toString() == 'orders') {
		items = orders;
	} 

    if (view.toString() == 'catalog') {
		items = catalog;
	} else {
            items = restorders;
      }

	  let results =  items.filter((n) => {
		
		let note = n.client ? n.client.toLowerCase() : 'XYZJASDFOJASDFKJ';
		let note2 = n.name ? n.name.toLowerCase() : 'XYZJASDFOJASDFKJ';
		let note3 = n.category ? n.category.toLowerCase() : 'XYZJASDFOJASDFKJ';
		let note4 = n.type ? n.type.toLowerCase() : 'XYZJASDFOJASDFKJ';
		//let note3 = n.id ? n.id : 'XYZJASDFOJASDFKJ';

	    return (note.search(text) !== -1) || (note2.search(text) !== -1) || (note3.search(text) !== -1)|| (note4.search(text) !== -1) ;
	  });

	  results = results ? results : [];
	 if (view.toString() == 'orders') {
		this.setState({
       		orderData: this.state.orderData.cloneWithRows(results)
     		});
	} 

  if (view.toString() == 'catalog') {
    this.setState({
          catalogData: this.state.catalogData.cloneWithRows(results)
        });
  } else {
           this.setState({
          restorderData: this.state.catalogData.cloneWithRows(results)
        });
      }
     
  };



    renderOrderLi(data) {
    	return (
    		<TouchableHighlight onPress={() => this.viewOrderDetail(data.id)}>
    		<View>
		<View style={{flex:1, alignItems: 'center', flexDirection: 'row'}}>	
    		<View style={{flex: 1, flexDirection: 'column'}}>
    		<Text style={styles.header}>{data.name}</Text>
            <Text style={styles.order_text_h1}>Order #{data.id}</Text>
    		<Text style={styles.order_text_h2}>{data.cost}</Text>
    		</View>
    		<Text style={[styles.order_text_h2, styles.important_text]}>Due: {data.date}</Text>
    		</View>
    		</View>
    		</TouchableHighlight>
   	);
    }

    renderCatalogLi(data) {
    	return (
    		<TouchableHighlight onPress={() => this.viewProductOffers(data.id)}>
    		<View>
		<View style={{flex:1, alignItems: 'center', flexDirection: 'row'}}>	
    		<Image source={catalog_imgs[data.picture]} style={styles.catalog_photo}/>
    		<View style={{flex: 1, flexDirection: 'column'}}>
    		<Text style={styles.order_text_h1}>{data.name}</Text>  		
    		</View>
    		<Text style={styles.order_text_h2}>{data.type}</Text>
    		</View>
    		</View>
    		</TouchableHighlight>

   	);
    }

    renderInvoice(data) {
      var itemTotal = data.quantity * data.price;
      itemTotal = itemTotal.toFixed(2);
      // Check if row is last in Listview
      if(data.id === this.state.crateData._cachedRowCount){
        return (
        <View style={{flex:1, paddingTop: 10}}>
          <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
            <View style={{flex: 0.57, flexDirection: 'column'}}>
              <Text style={styles.order_text_h2_1}>{data.name}</Text>
              <Text style={styles.order_text_h2}>{data.priceDisplay}</Text>  
            </View>
            <View style={{flex: 0.18, flexDirection: 'column'}}>
              <Text style={styles.order_text_h2_1}>{data.quantity}</Text>    
            </View>
            <View style={{flex: 0.25, flexDirection: 'column'}}>
              <Text style={styles.order_text_h2_1}>{itemTotal}</Text>    
            </View>
          </View>
          {/*Print Horizontal Line*/}
          <Hr lineColor='#8E8E8E' />
        </View>
        );
      } else {
        return (
        <View style={{flex:1, paddingTop: 10}}>
          <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
            <View style={{flex: 0.57, flexDirection: 'column'}}>
              <Text style={styles.order_text_h2_1}>{data.name}</Text>
              <Text style={styles.order_text_h2}>{data.priceDisplay}</Text>  
            </View>
            <View style={{flex: 0.18, flexDirection: 'column'}}>
              <Text style={styles.order_text_h2_1}>{data.quantity}</Text>    
            </View>
            <View style={{flex: 0.25, flexDirection: 'column'}}>
              <Text style={styles.order_text_h2_1}>{itemTotal}</Text>    
            </View>
          </View>
        </View>
        );
      }
    }



   render() {
        switch(this.state.page) {
        	case 'search':
	        return (
	            <View style={styles.container}> 
	            <ListView
        			dataSource={this.state.catalogData}
        			renderRow={(rowData) => this.renderCatalogLi(rowData)}
        			renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        			 renderHeader={() => 
        		            <View style={styles.search_container}>
			    <TextInput
			      style={styles.search_input}
			      placeholder="Search..."
			      onChangeText={(text) => this.searchData(text, 'catalog')}
			    />

			  </View>}  
        			  />        
	 	<Tabs selected={this.state.page} style={{backgroundColor:'white'}}
	              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name, searchText: ""})}>
	            <Text name="search" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Search</Text>
	            <Text name="crate" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Crate</Text>
	            <Text name="pending" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Pending</Text>
	        	</Tabs>
	            </View>
	        );

          case 'crate':
	        return (
            <View style={styles.container}>
              <ScrollView style={{marginBottom: 50}}>
                {/*Title*/}
                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                  <Text style={styles.order_text_title}>Crate Summary</Text>
                </View>

                {/*Table Header*/}
                <View style={{alignItems: 'center', flexDirection: 'row'}}> 
                  <View style={{flex: 0.57, flexDirection: 'column'}}>
                    <Text style={styles.order_text_h1_bold}>Item</Text>    
                  </View>
                  <View style={{flex: 0.18, flexDirection: 'column'}}>
                    <Text style={styles.order_text_h1_bold}>Qnt.</Text>    
                  </View>
                  <View style={{flex: 0.25, flexDirection: 'column'}}>
                    <Text style={styles.order_text_h1_bold}>Item Total</Text>    
                  </View>
                </View>
                <Hr lineColor='#8E8E8E' />
                
                {/*Row 1*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.57, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[0].name}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[0].farm}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[0].priceDisplay}</Text>  
                    </View>
                    <View style={{flex: 0.18, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[0].quantity}</Text>    
                    </View>
                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[0].itemTotal}</Text>    
                    </View>
                  </View>
                </View>

                {/*Row 2*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.57, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[1].name}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[1].farm}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[1].priceDisplay}</Text>  
                    </View>
                    <View style={{flex: 0.18, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[1].quantity}</Text>    
                    </View>
                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[1].itemTotal}</Text>    
                    </View>
                  </View>
                </View>

                {/*Row 3*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.57, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[2].name}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[2].farm}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[2].priceDisplay}</Text>  
                    </View>
                    <View style={{flex: 0.18, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[2].quantity}</Text>    
                    </View>
                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[2].itemTotal}</Text>    
                    </View>
                  </View>
                </View>

                {/*Row 4*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.57, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[3].name}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[3].farm}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[3].priceDisplay}</Text>  
                    </View>
                    <View style={{flex: 0.18, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[3].quantity}</Text>    
                    </View>
                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[3].itemTotal}</Text>    
                    </View>
                  </View>
                </View>

                {/*Row 5*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.57, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[4].name}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[4].farm}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[4].priceDisplay}</Text>  
                    </View>
                    <View style={{flex: 0.18, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[4].quantity}</Text>    
                    </View>
                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[4].itemTotal}</Text>    
                    </View>
                  </View>
                </View>

                {/*Row 6*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.57, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[5].name}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[5].farm}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[5].priceDisplay}</Text>  
                    </View>
                    <View style={{flex: 0.18, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[5].quantity}</Text>    
                    </View>
                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[5].itemTotal}</Text>    
                    </View>
                  </View>
                </View>

                {/*Row 7*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.57, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[6].name}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[6].farm}</Text>
                      <Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[6].priceDisplay}</Text>  
                    </View>
                    <View style={{flex: 0.18, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[6].quantity}</Text>    
                    </View>
                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[6].itemTotal}</Text>    
                    </View>
                  </View>
                </View>

                <Hr lineColor='#8E8E8E' />

                {/*SubTotal*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.40, flexDirection: 'column'}}></View>
                    <View style={{flex: 0.35, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>SubTotal</Text>    
                    </View>
                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[7].subTotal}</Text>    
                    </View>
                  </View>
                </View>

                {/*Tax*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.40, flexDirection: 'column'}}></View>
                    <View style={{flex: 0.35, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>Tax (<Text style={styles.order_text_h2}>{this.state.crateData._dataBlob.s1[7].taxRate}</Text>)</Text> 
                    </View>
                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h2_1}>{this.state.crateData._dataBlob.s1[7].taxAmt}</Text>    
                    </View>
                  </View>
                </View>

                {/*Total*/}
                <View style={{flex:1, paddingTop: 10}}>
                  <View style={{alignItems: 'flex-start', flexDirection: 'row'}}> 
                    <View style={{flex: 0.44, flexDirection: 'column'}}></View>
                    <View style={{flex: 0.28, flexDirection: 'column', paddingTop:3}}>
                      <Text style={styles.order_text_h1_plus_bold}>Total</Text> 
                    </View>
                    <View style={{flex: 0.28, flexDirection: 'column'}}>
                      <Text style={styles.order_text_h1_plus_plus_bold}>{this.state.crateData._dataBlob.s1[7].fullTotal}</Text>    
                    </View>
                  </View>
                </View>

                {/*Place Order Button*/}
                <View style={{alignItems: 'center'}}>
                  <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4'
                    onPress={() => this.enterPayment()}>
                    <Text style={styles.buttonText}>To Checkout</Text>
                  </TouchableHighlight>
                </View>

                <View style={{flex:1, paddingTop: 50}}></View>
	 	          </ScrollView>
              <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name, searchText: ""})}>
                <Text name="search" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Search</Text>
                <Text name="crate" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Crate</Text>
                <Text name="pending" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Pending</Text>
              </Tabs>
	          </View>
	        );

	case 'pending':
	        return (
	            <View style={styles.container}>
          
               <ListView
              dataSource={this.state.restorderData}
              renderRow={(rowData) => this.renderOrderLi(rowData)}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
               renderHeader={() => 
                        <View style={styles.search_container}>
          <TextInput
            style={styles.search_input}
            placeholder="Search..."
            onChangeText={(text) => this.searchData(text, 'pending')}
          />
        </View>}  
                />      

    <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name, searchText: ""})}>
              <Text name="search" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Search</Text>
              <Text name="crate" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Crate</Text>
              <Text name="pending" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Pending</Text>
            </Tabs>
	            </View>
	        );
    	}
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

module.exports = Shop;