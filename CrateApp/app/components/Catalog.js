
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

    renderOrderLi(data) {
    	return (
    		<View>
    		<Text>Order #{data.id}</Text>
    		<Text>{data.date}</Text>
    		<Text>{data.client}</Text>
    		</View>

   	);
    }

    renderCatalogLi(data) {
    	return (
    		<View>
    		<Text>Item #{data.id}</Text>
    		<Text>{data.name}</Text>
    		<Text>{data.type}</Text>
    		<Text>{data.price}</Text>
    		<Text>In season? {data.season}</Text>
    		<Text>Available? {data.available}</Text>
    		<Text>{data.category}</Text>
    		<Text>{data.image}</Text>
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
        			renderRow={(rowData) => this.renderOrderLi(rowData)}/>        
	 	<Tabs selected={this.state.page} style={{backgroundColor:'white'}}
	              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
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
        			dataSource={this.state.catalogData}
        			renderRow={(rowData) => this.renderCatalogLi(rowData)}/>
	 	<Tabs selected={this.state.page} style={{backgroundColor:'white'}}
	              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
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
	              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
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
	              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 70,
  },
   image: {
  width: 200,
  height: 200,
  resizeMode: 'contain',
}, 

});

module.exports = Catalog;