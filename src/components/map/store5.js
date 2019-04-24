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
    flexDirection: 'row',
    width:600,
  },
  smallTableView: {
    marginTop:25,
    flexDirection: 'row',
    width:200,
  },

  tableColumnView: {
    width:200,
    backgroundColor:'red',
  },

  smallTableColumnView: {
    width:66,
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

export default class Store5 extends Component {
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

      tableData1:[
        [elementButton('10'), elementButton('8'),elementButton('8D')],
        [elementButton('9'), elementButton('7'),elementButton('7D')],

      ],

      tableData2:[
        [elementButton('')],
      ],

      tableData3:[
        [ elementButton('6')],
        [elementButton('5')]

      ],

      tableData4:[
        [elementButton('2'),elementButton('4'),elementButton('4D')],
        [elementButton('1'),elementButton('3'),elementButton('3D')],
      ],
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
              <TableWrapper style={size==='small'? {width: 66}: {width: 200}} >
                  <Cols data={this.state.tableData1} heightArr={size==='small'?[50,25,25]:[100,50,50]} />
              </TableWrapper>

              <TableWrapper style={size==='small'? {width: 66}: {width: 200}} >
                 <TableWrapper  borderStyle={{borderTopWidth:0, borderColor: 'transparent'}}>
                  <Cols data={this.state.tableData2} heightArr={size==='small'?[50]:[100]} />
                 </TableWrapper> 
                 <TableWrapper >
                  <Cols data={this.state.tableData3} heightArr={size==='small'?[50,25]:[100,100]} />
                </TableWrapper> 
               
              </TableWrapper>

            <TableWrapper style={size==='small'? {width: 66,borderLeftWidth:1}: {width: 200 ,borderLeftWidth:1}}>
                <Cols data={this.state.tableData4} heightArr={size==='small'?[50,25,25]:[100,50,50]} />
            </TableWrapper>

          </Table>

          
        </View>
      </View>
    )
  }
}
