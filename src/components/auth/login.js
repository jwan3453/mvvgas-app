import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Alert
} from 'react-native';

import Button from '../../lib/button';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import { API_ROOT } from '../../constans/setting';
import LoadingIndicator from '../../lib/loadingIndicator';
import storage from '../../storage';

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex:1,
    alignItems:'center',
 
  },
  logoView: {
  },
  logoImage: {
    width:  220,
    resizeMode:'contain'
  },
  pinCodeText: {
    fontSize:20,
    padding:30,
    marginTop: 200
  },  
  textInput: {
    textAlign: 'center',
    // color: theme.text_color_inverse,
    fontSize: 18,
    height: 45,
    borderWidth: 1,
    // borderColor: theme.text_color_inverse,
    width: 400,
    borderRadius: 20,
  },
  registerBtnStyle:{
    width:250,
    height: 50,
    backgroundColor: '#93C1F3',
    marginTop:20,
    borderRadius: 20,
    justifyContent:'center',
  },
  registerBtnTextStyle:{
    textAlign:'center',
    color:'white',
    fontSize: 16,
  }
});

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      pin: '',
    }
  }

  //submit register
  login = () => {

    const { navigation } = this.props;
    const { dispatch } = navigation;
    this.setState({loading:true});
    fetch(API_ROOT+ '/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storePin: this.state.pin,
      }),
    }).then((response) => {return response.json()})
    .then((data) => {
      this.setState({loading:false})
      if(data.response && data.response.api_token) {
        this.refs.toast.show('logged in');
        storage.save({
          key: 'apiToken',
          data: {
            role:  data.response.role?data.response.role:null,
            token: data.response.api_token
          },
          expires: (new Date()).getTime()/1000 + (30 * 24 * 60 * 60),
        }).then((data)=>{
        
        });

        dispatch(NavigationActions.navigate({
          routeName: 'Admin',
        }));

      } else {
        console.warn();
        this.refs.toast.show('Wrong pin, please try again');
      }
    })
    .catch((error) => {
      this.setState({loading:false})
      console.warn(error);
      this.refs.toast.show('Something went wrong, contact admin')});
  }

  handlePinChange = (pin) => {
    this.setState({ pin});
  }

  render(){
    return(
      <View style={styles.container}>

        {
          this.state.loading &&
          <LoadingIndicator />
        }

        <View style={styles.logoView}>
        </View>
        <Text style={styles.pinCodeText}>Please Enter Pin Code</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={'white'}
          returnKeyType="go"
          underlineColorAndroid='transparent'
          secureTextEntry
          onChangeText={this.handlePinChange}
          value={this.state.pin}
        />
        <Button
          style={styles.registerBtnStyle}
          title="Login"
          titleStyle={styles.registerBtnTextStyle}
          onPress={this.login}
        />
        <Toast
          ref="toast"
          position='top'
          opacity={1}
          style={{ zIndex: 100, backgroundColor: 'black' }}
        />
      </View>
    );
  }
}

export default LoginScreen;
