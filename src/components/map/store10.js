import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import IssueItemList from './issueItemList';


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

  mapSectionView: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 50,
  },

  smallMapSectionView: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 10,
  },

  tableViewTopLeft: {
    width:200,
  },
  smallTableViewTopLeft: {
    width:120,
  },

  tableViewBottomLeft: {
    flexDirection:'row',
    width:300,
  },
  smallTableViewBottomLeft: {
    flexDirection:'row',
    width:160,
  },

  tableViewBottomRight: {
    flexDirection:'row',
    width:300,
    marginLeft: 100,
  },
  smallTableViewBottomRight: {
    flexDirection:'row',
    width:160,
    marginLeft: 50,
  },

  storeView: {
    width:250,
    height:200,
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
  carWashView: {
    width:150,
    height:100,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
    marginLeft: 200,
  },
  samllCarWashView : {
    width:70,
    height:50,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
    marginLeft: 50,
  },

  btn: { flex:1, justifyContent:'center', alignItems:'center' },
  btnText: { textAlign: 'center' }
});

export default class Store10 extends Component {
  constructor(props) {
    super(props);
    const elementButton = (value) => (
      <TouchableOpacity onPress={() => this._alertIndex(value)} style={{flex:1,backgroundColor:'red'}}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{value}</Text>
        </View>
      </TouchableOpacity>
    );

    this.state = {
      currentSelectFeature:'',
      tableData1: [
        [elementButton('28'), elementButton('28D')],
        [elementButton('27'), elementButton('27D')],
        [elementButton('26'), elementButton('26D')],
        [elementButton('25'), elementButton('25D')],
      ],
      tableData2: [
        [elementButton('22'), elementButton('22D'),elementButton('24'), elementButton('24D')],
        [elementButton('21'), elementButton('21D'),elementButton('23'), elementButton('23D')],
      ],
      tableData3: [
        [elementButton('18'), elementButton('20')],
        [elementButton('17'), elementButton('19')],
        [elementButton('14'), elementButton('16')],
        [elementButton('13'), elementButton('15')],
      ],
      tableData4: [
        [elementButton('10'), elementButton('12')],
        [elementButton('9'), elementButton('11')],
        [elementButton('6'), elementButton('8')],
        [elementButton('5'), elementButton('7')],
      ],
      tableData5: [
        [elementButton('2'), elementButton('2D'),elementButton('4'), elementButton('4D')],
        [elementButton('1'), elementButton('1D'),elementButton('3'), elementButton('3D')],
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
        <View style={size==='small'?styles.smallMapSectionView:styles.mapSectionView}>
            <Table style={size==='small'?styles.smallTableViewTopLeft:styles.tableViewTopLeft}>
              <TableWrapper >
                <Cols data={this.state.tableData1} heightArr={size==='small'?[25, 25, 25, 25]:[50, 50, 50, 50]} textStyle={styles.text}/>
              </TableWrapper>
            </Table>

            <View style={size==='small'?styles.samllCarWashView:styles.carWashView}>
              <Text style={{textAlign:'center'}}>Car Wash</Text>
            </View>
          </View>

          <View style={size==='small'?styles.smallMapSectionView:styles.mapSectionView}>
            <View style={size==='small'?styles.smallStoreView:styles.storeView}>
              <Text style={{textAlign:'center'}}>Store</Text>
            </View>
          </View>

          <View style={size==='small'?styles.smallMapSectionView:styles.mapSectionView}>
            <Table style={size==='small'?styles.smallTableViewBottomLeft:styles.tableViewBottomLeft}>
              <TableWrapper style={size==='small'? {width: 60}: {width: 100}} >
                  <Cols data={this.state.tableData2} heightArr={size==='small'?[25,25,25,25]:[50,50,50,50]} />
              </TableWrapper>

              <TableWrapper style={size==='small'? {width: 100}: {width: 200 }}>
                  <Cols data={this.state.tableData3} heightArr={size==='small'?[50,50]:[100,100]} />
              </TableWrapper>

            </Table>


            <Table style={size==='small'?styles.smallTableViewBottomRight:styles.tableViewBottomRight}>
              <TableWrapper style={size==='small'? {width: 100}: {width: 200 }}>
                  <Cols data={this.state.tableData4} heightArr={size==='small'?[50,50]:[100,100]} />
              </TableWrapper>
              <TableWrapper style={size==='small'? {width: 60}: {width: 100}} >
                  <Cols data={this.state.tableData5} heightArr={size==='small'?[25,25,25,25]:[50,50,50,50]} />
              </TableWrapper>
            </Table>

          </View>

        </View>
        <IssueItemList role={'admin'} currentFeature={this.state.currentSelectFeature} openIssues={this.props.openIssues}/>
      </View>
    )
  }
}