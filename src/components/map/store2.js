import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, } from 'react-native-table-component';
import IssueItemList from './issueItemList';
import { NavigationActions } from 'react-navigation';


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
    width:400,
  },
  smallTableView: {
    marginTop:25,
    width:180,
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

export default class Store2 extends Component {
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
        style={[{flex:1}, isReported &&{backgroundColor:'#D73535'},isOnHold && {backgroundColor:'#FDFF00'}  ]}>
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
      [this.elementButton('1'), this.elementButton('3')],
      [this.elementButton('2'), this.elementButton('4')],
      [this.elementButton('5'), this.elementButton('7')],
      [this.elementButton('6'), this.elementButton('8')],
      [this.elementButton('9'), this.elementButton('11')],
      [this.elementButton('10'),this.elementButton('12')],
    ],

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.openIssues !== nextProps.openIssues) {
      this.setState({
        tableData: [
          [this.elementButton('1',nextProps), this.elementButton('3',nextProps)],
          [this.elementButton('2',nextProps), this.elementButton('4',nextProps)],
          [this.elementButton('5',nextProps), this.elementButton('7',nextProps)],
          [this.elementButton('6',nextProps), this.elementButton('8',nextProps)],
          [this.elementButton('9',nextProps), this.elementButton('11',nextProps)],
          [this.elementButton('10',nextProps), this.elementButton('12',nextProps)],
        ]
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
    } else {
      this.props.dispatch(NavigationActions.navigate({
      routeName: 'AdminLocationViewScreen',
      params:{ 
              location:2,
              refreshList:this.props.refreshList,
            }   ,
    }))
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
          <TouchableOpacity 
            style={[size==='small'?styles.smallStoreView:styles.storeView, storeReported && {backgroundColor:'#D73535'}, storeOnHold&&{backgroundColor:'#FDFF00'}]}
            onPress={()=>this.showIssueItemList('Store',storeIssue)}
          >
            <Text style={{textAlign:'center'}}>Store</Text>
          </TouchableOpacity>

          <Table style={size==='small'?styles.smallTableView:styles.tableView}>
            <TableWrapper >
              <Cols data={this.state.tableData} heightArr={size==='small'?[50, 50, 50, 50, 50,50]:[100, 100, 100, 100, 100,100]} textStyle={styles.text}/>
            </TableWrapper>
          </Table>
        </View>
        <IssueItemList 
          feature={this.state.feature}
          location={2}
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
