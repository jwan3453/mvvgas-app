import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, } from 'react-native-table-component';


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  mapAreaView:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',

  },
  tableView: {
    marginTop:50,
    width:600,
  },
  smallTableView: {
    marginTop:25,
    width:200,
  },
  storeView: {
    width:250,
    height:250,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
  },

  smallStoreView: {
    width:120,
    height:80,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
  },
  btn: { flex:1, justifyContent:'center', alignItems:'center' },
  btnText: { textAlign: 'center' }
});

export default class Store2 extends Component {
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
      tableDataTop:[
        [elementButton('1'), elementButton('2')],
        [elementButton('3'), elementButton('4')],

      ],
      tableDataBottom: [
        [elementButton('7'), elementButton('8')],
        [elementButton('7D'), elementButton('8D')],
        [elementButton('5'), elementButton('6')],
        [elementButton('5D'), elementButton('6D')],
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
              <Cols data={this.state.tableDataTop} heightArr={size==='small'?[25, 25, 25, 25, 25,25]:[50, 50, 50, 50, 50,50]} textStyle={styles.text}/>
              <Cols data={this.state.tableDataBottom} heightArr={size==='small'?[25, 25, 25, 25, 25,25]:[50, 50, 50, 50, 50,50]} textStyle={styles.text}/>
            </TableWrapper>
          </Table>
        </View>
      </View>
    )
  }
}
