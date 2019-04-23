import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import { NavigationActions } from 'react-navigation';
import Store1 from '../../map/store1';
import Store2 from '../../map/store2';
import Store3 from '../../map/store3';
import Store4 from '../../map/store4';
import Store5 from '../../map/store5';
import Store10 from '../../map/store10';


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
 
  },
  mapOverView: {
    width:'100%',
    height: 600,

  },
  smallMapView: {
    flex:1,
    height:330,
    borderWidth:1,
    borderColor:'black',
  }
});

export default class AdminOverViewScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {dispatch} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.mapOverView}>
          <View style={{width:'100%',flexDirection:"row"}}>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{store:1},
                }))}
              }>
              <Store1 
                size={'small'}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{store:2},
                }))}
              }>
              <Store2
              size={'small'}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{store:3},
                }))}
              }>
              <Store3
              size={'small'}
              />
            </TouchableOpacity>
          </View>  
          <View  style={{width:'100%',flexDirection:"row"}}>
          <TouchableOpacity 
            style={styles.smallMapView}
            onPress={ ()=>{
              dispatch(NavigationActions.navigate({
                routeName: 'AdminLocationViewScreen',
                params:{store:4},
              }))}
            }>
            <Store4
              size={'small'}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{store:5},
                }))}
              }>
              <Store5
                size={'small'}
                />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{store:10},
                }))}
              }>
              <Store10
                size={'small'}
              />
            </TouchableOpacity>
          </View>  
        </View>
      </View>
    )
  }
}
