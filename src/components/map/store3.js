import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, } from 'react-native-table-component';


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  mapAreaView:{
    flexDirection:'row',
    justifyContent:'center',
    // alignItems:'center',

  },
  tableView: {
    width:300,
    marginLeft: 100,
    marginTop:80,
  },
  smallTableView: {
    marginTop:50,
    width:180,
    marginLeft: 30,
  },
  storeView: {
    marginTop:80,
    width:250,
    height:250,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
  },

  smallStoreView: {
    marginTop:50,
    width:120,
    height:80,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
  },

  carWashView: {
    width:150,
    height:150,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
    marginLeft:100,
     marginTop:40,
  },
  smallCarWashView: {
    marginTop:30,
    width:60,
    height:60,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
     marginLeft:20,

  },

  btn: { flex:1, justifyContent:'center', alignItems:'center' },
  btnText: { textAlign: 'center' }
  }
);



export default class Store3 extends Component {
  constructor(props) {
    super(props);
    const elementButton = (value) => (
      <TouchableOpacity onPress={() => this._alertIndex(value)} style={{flex:1}}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{value}</Text>
        </View>
      </TouchableOpacity>
    );

    this.state = {
      // tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
      tableDataTop: [
        [elementButton('3'), elementButton('4'),elementButton('7'), elementButton('8')],
        [elementButton('1'), elementButton('2'),elementButton('5'), elementButton('6')],
      ],
      tableDataBottom: [
        [elementButton('11'), elementButton('12')],
        [elementButton('11D'), elementButton('12D')],
        [elementButton('9'), elementButton('10')],
        [elementButton('9D'), elementButton('10D')],
      ]
    }
  }

  _alertIndex(value) {
    Alert.alert(`This is column ${value}`);
  }

  render() {
    const {size} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.mapAreaView}>
          <View style={size==='small'?styles.smallStoreView:styles.storeView}>
            <Text style={{textAlign:'center'}}>Store</Text>
          </View>

          <Table style={size==='small'?styles.smallTableView:styles.tableView}>
            <TableWrapper >
              <Cols data={this.state.tableDataTop} heightArr={size==='small'?[25, 25, 25, 25,]:[50, 50, 50, 50]} textStyle={styles.text}/>
            </TableWrapper>
            <TableWrapper >
              <Cols data={this.state.tableDataBottom} heightArr={size==='small'?[25, 25, 25, 25,]:[50, 50, 50, 50]}  textStyle={styles.text}/>
            </TableWrapper>
          </Table>

          <View style={size==='small'?styles.smallCarWashView:styles.carWashView}>
            <Text style={{textAlign:'center'}}>Car Wash</Text>
          </View>
        </View>
      </View>
    )
  }
}
