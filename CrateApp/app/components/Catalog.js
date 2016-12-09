
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
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Test from './Test.js';
import ProductDetail from './ProductDetail.js';
import OrderDetail from './OrderDetail.js';
import OrderDetailPending from './OrderDetailPending.js';
import renderIf from './renderif.js';


var orders = require('../assets/orders.json');
var gear = require('../assets/settings.png');
var pendingOrders = require('../assets/pendingorders.json');
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
  9 : require('../assets/farm_imgs/4-stars.jpg'),
};



class Catalog extends Component {

  constructor(props) {
      super(props);
      this.state = props.route.appState;
      this.state["page"] = "orders";
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state['orderData'] = ds.cloneWithRows(orders);
      this.state['catalogData'] = ds.cloneWithRows(catalog);
      this.state['approvedVisible'] = true;
      this.state['farmID'] = 2;
      this.state['farm'] = (function() {
        function withProductID(e) {
          return e.id == 1;
        }
        return farms.find(withProductID);
      })();
      //this.setState({page: "orders"});
      //console.warn(JSON.stringify(props.appState));
    }

  toggleStatus(){
      this.setState({
        approvedVisible:!this.state.approvedVisible
      });
  }



  onBackPress(){
    return true;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

    viewProductDetail(id) {
        this.props.navigator.push({
          title: "Product Detail",
          component: ProductDetail,
          productID: id
        });
    }

    viewOrderDetail(id) {
        this.props.navigator.push({
          title: "Order Detail",
          component: OrderDetail,
          orderID: id
        });
    }


     viewOrderDetailPending(id) {
        this.props.navigator.push({
          title: "Pending Order",
          component: OrderDetailPending,
          orderID: id
        });
    }



  searchData (searchText, view) { 
	
     	 let text = searchText.toLowerCase();
     	 let items = null;
	if (view.toString() == 'orders') {
		items = orders;
	} else {
		items = catalog;
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
	} else {
		this.setState({
       		catalogData: this.state.catalogData.cloneWithRows(results)
     		});
	}
     
  };


  renderPendingLi(data) {
      return (
        <TouchableHighlight onPress={() => this.viewOrderDetailPending(data.id)}>
        <View>
    <View style={{flex:1, alignItems: 'center', flexDirection: 'row'}}> 
        <Image source={company_imgs[data.id]} style={styles.company_photo}/>
        <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={styles.order_text_h1}>Order #{data.id}</Text>
         <Text style={styles.order_text_h2}>{data.client}</Text>
        </View>
        <Text style={[styles.order_text_h2, styles.important_text]}> 2 Days Remaining</Text>
        </View>
        </View>
        </TouchableHighlight>
    );
    }


    renderOrderLi(data) {
    	return (
    		<TouchableHighlight onPress={() => this.viewOrderDetail(data.id)}>
    		<View>
		<View style={{flex:1, alignItems: 'center', flexDirection: 'row'}}>	
    		<Image source={company_imgs[data.id]} style={styles.company_photo}/>
    		<View style={{flex: 1, flexDirection: 'column'}}>
    		<Text style={styles.order_text_h1}>Order #{data.id}</Text>
    		<Text style={styles.order_text_h2}>{data.client}</Text>
    		</View>
    		<Text style={[styles.order_text_h2, styles.important_text]}>Due: {data.date}</Text>
    		</View>
    		</View>
    		</TouchableHighlight>
   	);
    }

    

    renderCatalogLi(data) {
    	return (

    		 <TouchableHighlight onPress={() => this.viewProductDetail(data.id)}>
    		<View>
		<View style={{flex:1, alignItems: 'center', flexDirection: 'row'}}>	
    		<Image source={catalog_imgs[data.picture]} style={styles.catalog_photo}/>
    		<View style={{flex: 1, flexDirection: 'column'}}>
    		<Text style={styles.order_text_h1}>{data.name}</Text>
    		<Text style={styles.order_text_h2}>ID #:{data.id}</Text>    		
    		</View>
    		<Text style={styles.order_text_h2}>{data.price}</Text>
    		<Text style={styles.order_text_h2}>{data.type}</Text>
    		</View>
    		</View>
    		</TouchableHighlight>

   	);
    }

    changeOrderView(index) {
      if (index == 0) {
        this.setState({
          page:"orders"
        });
           this.setState({
          orderData: this.state.orderData.cloneWithRows(orders)
        });
      } else {
       this.setState({
          page:"pending"
        }); 
          this.setState({
          orderData: this.state.orderData.cloneWithRows(pendingOrders)
        });
      }
    }



   render() {
        switch(this.state.page) {
        	case 'orders':
	        return (
	            <View style={styles.container}>  
                          <View style={{alignItems: 'center'}}>
                            <SegmentedControlTab
                                values={['Approved', 'Pending']}
                                tabsContainerStyle={styles.tabsContainerStyle}
                                onTabPress= {index => this.changeOrderView(index)}
                                name="catalog"
                                />
                          </View>

	            <ListView
        			dataSource={this.state.orderData}
        			renderRow={(rowData) => this.renderOrderLi(rowData)}
        			renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        			 renderHeader={() => 
        		            <View style={styles.search_container}>
			    <TextInput
			      style={styles.search_input}
			      placeholder="Search..."
			      onChangeText={(text) => this.searchData(text, 'orders')}
			    />
			  </View>}  
        			  />        
	 	<Tabs selected={this.state.page} style={{backgroundColor:'white'}}
	              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name, searchText: ""})}>
	            <Text name="orders" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Orders</Text>
	            <Text name="catalog" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Catalog</Text>
	            <Text name="profile" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Profile</Text>
	            <Text name="settings" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Settings</Text>
	        	</Tabs>
	            </View>

	        );

        case 'pending':
          return (
              <View style={styles.container}>  
                          <View style={{alignItems: 'center'}}>
                            <SegmentedControlTab
                                values={['Approved', 'Pending']}
                                tabsContainerStyle={styles.tabsContainerStyle}
                                activeTabStyle={styles.activetabStyle}
                                tabStyle = {styles.tabStyle}
                                onTabPress= {index => this.changeOrderView(index)}
                                name="catalog"
                                />
                          </View>

              <ListView
              dataSource={this.state.orderData}
              renderRow={(rowData) => this.renderPendingLi(rowData)}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
               renderHeader={() => 
                        <View style={styles.search_container}>
          <TextInput
            style={styles.search_input}
            placeholder="Search..."
            onChangeText={(text) => this.searchData(text, 'orders')}
          />
        </View>}  
                />        
    <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name, searchText: ""})}>
              <Text name="pending" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Orders</Text>
              <Text name="catalog" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Catalog</Text>
              <Text name="profile" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Profile</Text>
              <Text name="settings" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Settings</Text>
            </Tabs>
              </View>

          );





          case 'catalog':
	        return (
	            <View style={styles.container}>
	            <ListView
	            	style={{height: 100}}
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
	            <Text name="orders" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Orders</Text>
	            <Text name="catalog" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Catalog</Text>
	            <Text name="profile" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Profile</Text>
	            <Text name="settings" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Settings</Text>
	        	</Tabs>
	            </View>
	        );

	case 'profile':
	        return (
          <View style={styles.container}>
	         <ScrollView>
            <View style={{alignItems: 'center', flexDirection: 'row'}}> 
              <Image source={farm_imgs[1]} style={styles.product_image}/>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.order_text_title}>  Rochester Farms </Text>
                <View style={{flexDirection:'row'}}>
                  <View style={{flexDirection:'column', marginTop: 2}}>
                    <Text style={styles.order_text_h2}>Customer Rating: </Text>
                  </View>
                  <View style={{flexDirection:'column', marginTop: 4}}>
                    <Image source={farm_imgs[9]} style={{width: 75, height: 15, alignSelf:'flex-end'}}/>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop:10}}>
              <Hr lineColor='#8E8E8E' />
              <View style={{flexDirection:'row'}}>
                <View style={{marginTop: 10, marginBottom: 5, marginLeft:12}}>
                  <Text style={styles.order_text_h1_lo}>About Rochester Farms</Text>
                </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{marginBottom: 10, marginLeft:12}}>
                  <Text style={styles.order_text_h2}>Rochester Farms is a family-run business - our family has been working on this land for over three generations. Based near Grass Valley, California, we specialize in fresh, organic produce and dairy products. We believe deeply in sustainable food, and are proud partners with local restaurants who have chosen to source only from local farmers like us.</Text>
                </View>
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
	 	   <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
	              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name, searchText: ""})}>
	            <Text name="orders" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Orders</Text>
	            <Text name="catalog" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Catalog</Text>
	            <Text name="profile" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Profile</Text>
	            <Text name="settings" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Settings</Text>
	        	</Tabs>
            </View>
	        );

	case 'settings':
	        return (
	          <View style={styles.container}>
              <View style={{marginTop: 70, flexDirection:'column', alignItems: 'center', alignSelf: 'center'}}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.order_text_h2}>Crate works best with a Stripe account.</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Connect to Stripe</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={{ alignItems: 'center', flex:1, paddingTop: 120}}>
	            <  Image source ={gear}/>
              </View>
	 	<Tabs selected={this.state.page} style={{backgroundColor:'white'}}
	              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name, searchText: ""})}>
	            <Text name="orders" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Orders</Text>
	            <Text name="catalog" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Catalog</Text>
	            <Text name="profile" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Profile</Text>
	            <Text name="settings" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Settings</Text>
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
    paddingTop: 70,
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
    fontSize: 20,
    //flex:1,
    //flexDirection: 'row',
    justifyContent: 'center',
  },
  order_text_h1: {
    paddingTop: 20,
    marginLeft: 12,
    fontSize: 13,
    //flex:1,
    //flexDirection: 'row',
  },
    order_text_h1_lo: {
    marginLeft: 12,
    fontSize: 10,
    //flex:1,
    //flexDirection: 'row',
  },
   order_text_h2: {
    paddingLeft: 25,
    paddingRight: 10,
    fontSize: 8,
    //flex:2,
    flexDirection: 'row',
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
    height: 32,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  segmentedTab: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  tabsContainerStyle : {
    width: 250,
    height: 70,
    paddingTop: 20,
    paddingBottom: 20,
  },
  tabStyle: {
    borderColor: '#DB5461',
  },
   activetabStyle: {
      backgroundColor: '#DB5461',
       
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


});

module.exports = Catalog;