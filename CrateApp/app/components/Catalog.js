
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
} from 'react-native';


import Tabs from 'react-native-tabs';


var orders = require('../assets/orders.json');
var catalog = require('../assets/catalog.json');

var catalog_imgs = {
	"gouda.jpg" : require('../assets/catalog_imgs/gouda.jpg'),
	"tomato.jpg" : require('../assets/catalog_imgs/tomato.jpg'),
	"milk.jpg" : require('../assets/catalog_imgs/milk.jpg'),
	"strawberry.jpg" : require('../assets/catalog_imgs/strawberry.jpg'),
};

var company_imgs = {
	"001" : require('../assets/company_imgs/1.jpg'),
	"003" : require('../assets/company_imgs/2.jpg'),
	"002" : require('../assets/company_imgs/3.jpg'),
};


class Catalog extends Component {


constructor(props) {
      super(props);
      this.state = props.appState;
      this.state["page"] = "orders";
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state['orderData'] = ds.cloneWithRows(orders);
      this.state['catalogData'] = ds.cloneWithRows(catalog);
      //this.setState({page: "orders"});
      //console.warn(JSON.stringify(props.appState));
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



    renderOrderLi(data) {
    	return (


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




   	);
    }

    renderCatalogLi(data) {
    	var img = '../assets/catalog_imgs/gouda.jpg';
    	return (
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

   	);
    }



   render() {
        switch(this.state.page) {
        	case 'orders':
	        return (
	            <View style={styles.container}>  
	            <ListView
        			dataSource={this.state.orderData}
        			renderRow={this.renderOrderLi}
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
	            <Text> Profile 1 </Text>
	            <Text> Profile 2 </Text>
	            <Text> Profile 3 </Text>
	             <Text> {JSON.stringify(this.state)} </Text>
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
	            <Text> Setting 1 </Text>
	            <Text> Setting 2 </Text>
	            <Text> Setting 3 </Text>
	             <Text> {JSON.stringify(this.state)} </Text>
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
    paddingTop: 70,
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
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },


});

module.exports = Catalog;