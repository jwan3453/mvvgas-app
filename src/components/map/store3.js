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
  }

  elementButton (value, props)  {
    let issued  = false;
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
              issued = true;
            }
          }
        })
      }
    }
    return (<TouchableOpacity onPress={() => this.showIssueItemList('Pump', selectIssue, value)} style={[{flex:1}, issued &&{backgroundColor:'red'} ]}>
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
    tableDataTop: [
      [this.elementButton('3'), this.elementButton('4'),this.elementButton('7'), this.elementButton('8')],
      [this.elementButton('1'), this.elementButton('2'),this.elementButton('5'), this.elementButton('6')],
    ],
    tableDataBottom: [
      [this.elementButton('11'), this.elementButton('12')],
      [this.elementButton('11D'), this.elementButton('12D')],
      [this.elementButton('9'), this.elementButton('10')],
      [this.elementButton('9D'), this.elementButton('10D')],
    ]
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.openIssues !== nextProps.openIssues) {
      this.setState({
        tableDataTop: [
          [this.elementButton('3',nextProps), this.elementButton('4',nextProps),this.elementButton('7',nextProps), this.elementButton('8',nextProps)],
          [this.elementButton('1',nextProps), this.elementButton('2',nextProps),this.elementButton('5',nextProps), this.elementButton('6',nextProps)],
        ],
        tableDataBottom: [
          [this.elementButton('11',nextProps), this.elementButton('12',nextProps)],
          [this.elementButton('11D',nextProps), this.elementButton('12D',nextProps)],
          [this.elementButton('9',nextProps), this.elementButton('10',nextProps)],
          [this.elementButton('9D',nextProps), this.elementButton('10D',nextProps)],
        ]
      });
    }
  }

  showIssueItemList(type,selectIssue,value) {
    if( (selectIssue !== null && this.props.role == 'admin'  ) || ( this.props.role == 'employee'  && selectIssue === null) ){
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
    if(openIssues) {
      openIssues.map((issue)=>{
        if(issue.feature.toLowerCase().includes('car wash')) {
          carwashIssue = issue;
        } 
        if(issue.feature.toLowerCase().includes('store')) {
          storeIssue = issue;
        } 
 
      })
    }
    return (
      <View style={styles.container}>
        <View style={styles.mapAreaView}>
          <TouchableOpacity 
            style={[size==='small'?styles.smallStoreView:styles.storeView,storeIssue && {backgroundColor:'red'}]}
            onPress={()=>this.showIssueItemList('Store',storeIssue)}
          >
            <Text style={{textAlign:'center'}}>Store</Text>
          </TouchableOpacity>
          <Table style={size==='small'?styles.smallTableView:styles.tableView}>
            <TableWrapper >
              <Cols data={this.state.tableDataTop} heightArr={size==='small'?[25, 25, 25, 25,]:[50, 50, 50, 50]} textStyle={styles.text}/>
            </TableWrapper>
            <TableWrapper >
              <Cols data={this.state.tableDataBottom} heightArr={size==='small'?[25, 25, 25, 25,]:[50, 50, 50, 50]}  textStyle={styles.text}/>
            </TableWrapper>
          </Table>

          <TouchableOpacity 
            style={[size==='small'?styles.smallCarWashView:styles.carWashView, carwashIssue && {backgroundColor:'red'}]}
            onPress={()=>this.showIssueItemList('Car Wash',carwashIssue)}
          >
            <Text style={{textAlign:'center'}}>Car Wash</Text>
          </TouchableOpacity>
        </View>
        <IssueItemList 
          feature={this.state.feature}
          location={3}
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
