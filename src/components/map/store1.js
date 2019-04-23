import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  mapAreaView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',

  },
  tableView: {
    width:300,
  },
  smallTableView: {
    width:120,
  },
  storeView: {
    width:250,
    height:250,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
    marginLeft: 200,
  },
  smallStoreView: {
    width:120,
    height:120,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
    marginLeft: 50,
  },
  // singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  // head: { flex: 1, backgroundColor: '#c8e1ff' },
  // title: { flex: 2, backgroundColor: '#f6f8fa' },
  // titleText: { marginRight: 6, textAlign:'right' },
  // text: { textAlign: 'center' },
  btn: { flex:1, justifyContent:'center', alignItems:'center' },
  btnText: { textAlign: 'center' }
});

export default class Store1 extends Component {
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
      tableData: [
        [elementButton('12'), elementButton('11'), elementButton('10'), elementButton('9'), elementButton('8'),elementButton('7')],
        [elementButton('6'), elementButton('5'), elementButton('4'), elementButton('3'), elementButton('2'),elementButton('1')],
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
          <Table style={size==='small'?styles.smallTableView:styles.tableView}>
            <TableWrapper >
              <Cols data={this.state.tableData} heightArr={size==='small'?[25, 25, 25, 25, 25,25]:[50, 50, 50, 50, 50,50]} textStyle={styles.text}/>
            </TableWrapper>
          </Table>

          <View style={size==='small'?styles.smallStoreView:styles.storeView}>
            <Text style={{textAlign:'center'}}>Store</Text>
          </View>
        </View>
      </View>
    )
  }
}