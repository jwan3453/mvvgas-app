import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, } from 'react-native-table-component';
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
  tableView: {
    marginTop:50,
    flexDirection: 'row',
    width:392,
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
    width:450,
    height:250,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
  },

  smallStoreView: {
    width:200,
    height:100,
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
  }
  elementButton (value, props)  {
    let isReported  = false;
    let isOnHold = false;
    let feature = 'pump';
    let selectIssue = null;
    if(props !== undefined) {
      const { openIssues } = props;
      if(openIssues) {
        openIssues.map((issue)=> {
          if(issue.feature.toLowerCase().includes(feature)){
            let pumpNo = issue.feature.match(/Pump #(.*)/)[1];
            if(value == pumpNo) {
              selectIssue = issue;
              if(issue.status === 'reported') {
                isReported = true
              } else {
                isOnHold = true
              }
            }
          }
        })
      }
    }
    
    return (
    <TouchableOpacity 
      onPress={
        () => this.showIssueItemList('Pump', selectIssue, value)} 
        style={[{flex:1}, isReported &&{backgroundColor:'red'},isOnHold && {backgroundColor:'#F58F09'}  ]}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{value}</Text>
      </View>
    </TouchableOpacity>)
  }

  state = {
    currentSelectIssue:null,
    selectFeatureType:'',
    showIssueItem:false,
    feature:'',
    tableData1:[
      [this.elementButton('10'), this.elementButton('8'),this.elementButton('8D')],
      [this.elementButton('9'), this.elementButton('7'),this.elementButton('7D')],

    ],

    tableData2:[
      [this.elementButton('')],
    ],

    tableData3:[
      [this.elementButton('6')],
      [this.elementButton('5')]

    ],

    tableData4:[
      [this.elementButton('2'),this.elementButton('4'),this.elementButton('4D')],
      [this.elementButton('1'),this.elementButton('3'),this.elementButton('3D')],
    ],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.openIssues !== nextProps.openIssues) {
      this.setState({
        tableData1:[
          [this.elementButton('10',nextProps), this.elementButton('8',nextProps),this.elementButton('8D',nextProps)],
          [this.elementButton('9',nextProps), this.elementButton('7',nextProps),this.elementButton('7D',nextProps)],
    
        ],
    
        tableData2:[
          [this.elementButton('')],
        ],
    
        tableData3:[
          [this.elementButton('6',nextProps)],
          [this.elementButton('5',nextProps)]
    
        ],
    
        tableData4:[
          [this.elementButton('2',nextProps),this.elementButton('4',nextProps),this.elementButton('4D',nextProps)],
          [this.elementButton('1',nextProps),this.elementButton('3',nextProps),this.elementButton('3D',nextProps)],
        ],
      });
    }
  }

  showIssueItemList(type,selectIssue,value) {
    if(!this.props.noClick  && !( this.props.role === 'employee' && selectIssue !== null)  ){
      let feature = '';
      if(type === 'Pump') {
        feature = type + ' #'+value;
      } else {
        feature = type;
      }
      this.setState({
        selectFeatureType:type,
        currentSelectIssue:selectIssue,
        showIssueItem:true,
        feature,
      })
    }
  }

  render() {
    const {size,openIssues} = this.props;
    let carwashIssue = null;
    let storeIssue = null;
    let carwashReported = false;
    let carwashOnHold = false;
    let storeReported = false;
    let storeOnHold = false;
    if(openIssues) {
      openIssues.map((issue)=>{
        if(issue.feature.toLowerCase().includes('car wash')) {
          carwashIssue = issue;
          if(carwashIssue.status === 'reported') {
            carwashReported = true
          } else {
            carwashOnHold = true
          }
        } 
        if(issue.feature.toLowerCase().includes('store')) {
          storeIssue = issue;
          if(storeIssue.status === 'reported') {
            storeReported = true
          } else {
            storeOnHold = true
          }
        } 
 
      })
    }
    return (
      <View style={styles.container}>
        <View style={styles.mapAreaView}>
        <TouchableOpacity 
            style={[size==='small'?styles.smallStoreView:styles.storeView, storeReported && {backgroundColor:'red'}, storeOnHold&&{backgroundColor:'#F58F09'}]}
            onPress={()=>this.showIssueItemList('Store',storeIssue)}
          >
            <Text style={{textAlign:'center'}}>Store</Text>
          </TouchableOpacity>

          <Table style={size==='small'?styles.smallTableView:styles.tableView}>
              <TableWrapper style={size==='small'? {width: 66}: {width: 130}} >
                  <Cols data={this.state.tableData1} heightArr={size==='small'?[50,25,25]:[100,50,50]} />
              </TableWrapper>

              <TableWrapper style={size==='small'? {width: 66}: {width: 130}} >
                 <TableWrapper  borderStyle={{borderTopWidth:0, borderColor: 'transparent'}}>
                  <Cols data={this.state.tableData2} heightArr={size==='small'?[50]:[100]} />
                 </TableWrapper> 
                 <TableWrapper >
                  <Cols data={this.state.tableData3} heightArr={size==='small'?[50,25]:[100,100]} />
                </TableWrapper> 
               
              </TableWrapper>

            <TableWrapper style={size==='small'? {width: 66,borderLeftWidth:1}: {width: 130 ,borderLeftWidth:1}}>
                <Cols data={this.state.tableData4} heightArr={size==='small'?[50,25,25]:[100,50,50]} />
            </TableWrapper>

          </Table>
        </View>
        <IssueItemList 
          feature={this.state.feature}
          location={5}
          showToast={(msg)=>this.props.showToast(msg)}
          fetchOpenIssues={(token=>this.props.fetchOpenIssues(token))}
          role={this.props.role} 
          type={this.state.selectFeatureType}
          currentIssue={this.state.currentSelectIssue} 
          showIssueItem={this.state.showIssueItem}
          closeIssuePanel={()=>{this.setState({
            showIssueItem:false,
          })}}
        />
      </View>
    )
  }
}
