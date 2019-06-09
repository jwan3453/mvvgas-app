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
    width:350,
    height:250,
    alignContent:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
    textAlign:'center',
    marginLeft: 200,
  },
  smallStoreView: {
    width:160,
    height:120,
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

export default class Store1 extends Component {
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

    return (<TouchableOpacity onPress={() => this.showIssueItemList('Pump', selectIssue, value)} style={[{flex:1}, isReported &&{backgroundColor:'red'},isOnHold && {backgroundColor:'#F58F09'}  ]}>
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
    isOnHold:false,
    tableData: [
      [this.elementButton('12'), this.elementButton('11'), this.elementButton('10'), this.elementButton('9'), this.elementButton('8'),this.elementButton('7')],
      [this.elementButton('6'), this.elementButton('5'), this.elementButton('4'), this.elementButton('3'), this.elementButton('2'),this.elementButton('1')],
    ]
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.openIssues !== nextProps.openIssues) {
      this.setState({
        tableData: [
          [this.elementButton('12',nextProps), this.elementButton('11',nextProps), this.elementButton('10',nextProps), this.elementButton('9',nextProps), this.elementButton('8',nextProps),this.elementButton('7',nextProps)],
          [this.elementButton('6',nextProps), this.elementButton('5',nextProps), this.elementButton('4',nextProps), this.elementButton('3',nextProps), this.elementButton('2',nextProps),this.elementButton('1',nextProps)],
        ]
      });
    }
  }

  showIssueItemList(type,selectIssue,value) {
    if(!this.props.noClick && !( this.props.role === 'employee' && selectIssue !== null) ){
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

    if( selectIssue !== null) {
      if(selectIssue.status.includes('hold') && selectIssue.on_hold_reason !== '') {
        this.setState({
          isOnHold:true
        })
      } else {
        this.setState({
          isOnHold:false
        })
      }
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
          <Table style={size==='small'?styles.smallTableView:styles.tableView}>
            <TableWrapper >
              <Cols data={this.state.tableData} heightArr={size==='small'?[25, 25, 25, 25, 25,25]:[50, 50, 50, 50, 50,50]} textStyle={styles.text}/>
            </TableWrapper>
          </Table>

          <TouchableOpacity 
            style={[size==='small'?styles.smallStoreView:styles.storeView, storeReported && {backgroundColor:'red'}, storeOnHold&&{backgroundColor:'#F58F09'}]}
            onPress={()=>this.showIssueItemList('Store',storeIssue)}
          >
            <Text style={{textAlign:'center'}}>Store</Text>
          </TouchableOpacity>
        </View>
        <IssueItemList 
          feature={this.state.feature}
          location={1}
          showToast={(msg)=>this.props.showToast(msg)}
          fetchOpenIssues={(token=>this.props.fetchOpenIssues(token))}
          role={this.props.role} 
          type={this.state.selectFeatureType}
          currentIssue={this.state.currentSelectIssue} 
          showIssueItem={this.state.showIssueItem}
          closeIssuePanel={()=>{this.setState({
            showIssueItem:false,
          })}}
          isOnHold={this.state.isOnHold}
          edit={()=>{this.setState({isOnHold:false})}}
        />
      </View>
    )
  }
}