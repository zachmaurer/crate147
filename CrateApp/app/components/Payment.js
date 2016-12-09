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

import Hr from 'react-native-hr';

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
  4 : require('../assets/company_imgs/powered_by_stripe.png'),
  5 : require('../assets/company_imgs/Credit-Card-Logos.jpg'),
};




class Payment extends Component {

  constructor(props) {
      super(props);
      //this.state = props.route.appState;
      this.state={
        totalAmt: props.route.totalAmt,
      };
    }


  onBackPress(){
    return true;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  confirmOrder() {
    this.props.navigator.replace({
      title: "Confirmation Page",
      component: Confirmation,
      appState: this.state,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={styles.order_text_title}>Checkout</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={styles.order_text_h1_bold}>Your Total: ${this.state.totalAmt}</Text>
          </View>
          <Hr lineColor='#8E8E8E' />
          <View style={{flexDirection: 'row', marginBottom: 20,}}></View>
          <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <Text style={styles.order_text_h2}>Pay immediately with your</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={() => this.confirmOrder()}>
              <Text style={styles.buttonText}>Stripe Account</Text>
            </TouchableHighlight>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={styles.order_text_h2}>or</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.5, flexDirection: 'column'}}>
              <Text style={styles.order_text_h1}>Pay with Credit Card</Text>
            </View>
            <View style={{flex: 0.5, alignItems: 'flex-end', marginRight: 15, flexDirection: 'column', paddingTop: 20,}}>
              <Image source={company_imgs[5]} style={{width: 150,}} />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.userInput}
              placeholder='Credit Card Number'/>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput  secureTextEntry={true}
              style={styles.userInput}
              placeholder='Security Code'/>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.userInput}
              placeholder='Card Expiration Date (mm/yyyy)'/>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={() => this.confirmOrder()}>
              <Text style={styles.buttonText}>Place Order</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
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
    paddingLeft: 12,
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
    marginTop: 20,
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
  userInput: {
  height: 40,
  alignSelf:'stretch',
  padding: 4,
  margin: 10,
  marginLeft: 10,
  marginRight: 10,
  flex: 1,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 5,
  //color: '#48BBEC'
},

});

module.exports = Payment;