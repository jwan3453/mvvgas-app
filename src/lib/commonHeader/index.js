import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import storage from '../../storage';
import { NavigationActions } from 'react-navigation';


const styles = StyleSheet.create({
  container: {
    height:80,
    width:'100%',
    borderBottomWidth:1,
    borderColor:'black',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingLeft:40,
    paddingRight:40,
    marginBottom:20,
  },
  logoIcon: {
    width:62,
    height:56,
    marginRight:20,
  },
  leftArea: {
    height:80,
    flexDirection:'row',
    alignItems:'center',
  },

  middelArea:{
    //width:300,
  },
  headerText: {
    fontSize:24,
  },

  headerBtn: {
    width:150,
    height: 40,
    borderWidth:1,
    borderColor:'black',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
  },

  headerBtnText: {
    textAlign:'center',
  },

  rightArea: {
   // width:200,
  }

})

export default class CommonHeder extends Component {

  logout=()=>{
    const { dispatch } = this.props;
    storage.remove({
      key: 'apiToken',
    });

    dispatch(NavigationActions.navigate({
      routeName: 'Login',
    }))
  }

  render() {
    const { needLogout, needViewClosedIssue, needGoMainMenu, headerText,dispatch } = this.props;
    return (
      <View style={styles.container}>

        <View style={styles.leftArea}> 
          <Image 
              style={styles.logoIcon}
              source={require('../images/logo.png')}
          />

          {
            needGoMainMenu &&
            <TouchableOpacity 
              style={styles.headerBtn}
              onPress={()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminOverViewScreen',
                }))
              }}

            >
              <Text style={styles.headerBtnStyle}>Main Menu</Text>
            </TouchableOpacity>
          }

          {
            needViewClosedIssue &&
            <TouchableOpacity 
              style={styles.headerBtn}
              onPress={()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'ClosedIssueViewScreen',
                }))
              }}
            >
              <Text style={styles.headerBtnStyle}>View All Issues</Text>
            </TouchableOpacity>
          }

        </View>  

        {
          headerText &&
          <View style={styles.middelArea}> 
            <Text style={styles.headerText}>{headerText}</Text>
          </View> 
        }


        <View style={styles.rightArea}>
          {
            needLogout &&
            <TouchableOpacity style={styles.headerBtn}
              onPress={this.logout}
            >
              <Text style={styles.headerBtnStyle}>Logout</Text>
            </TouchableOpacity>
          }
        </View>

      </View>
    );
  }
}
