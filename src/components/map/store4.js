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
    width:600,
  },
  smallTableView: {
    marginTop:25,
    width:250,
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
    tableDataTop:[
      [this.elementButton('1'), this.elementButton('2')],
      [this.elementButton('3'), this.elementButton('4')],

    ],
    tableDataBottom: [
      [this.elementButton('7'), this.elementButton('8')],
      [this.elementButton('7D'), this.elementButton('8D')],
      [this.elementButton('5'), this.elementButton('6')],
      [this.elementButton('5D'), this.elementButton('6D')],
    ]
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.openIssues !== nextProps.openIssues) {
      this.setState({
        tableDataTop:[
          [this.elementButton('1',nextProps), this.elementButton('2',nextProps)],
          [this.elementButton('3',nextProps), this.elementButton('4',nextProps)],
    
        ],
        tableDataBottom: [
          [this.elementButton('7',nextProps), this.elementButton('8',nextProps)],
          [this.elementButton('7D',nextProps), this.elementButton('8D',nextProps)],
          [this.elementButton('5',nextProps), this.elementButton('6',nextProps)],
          [this.elementButton('5D',nextProps), this.elementButton('6D',nextProps)],
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
              <Cols data={this.state.tableDataTop} heightArr={size==='small'?[25, 25, 25, 25, 25,25]:[50, 50, 50, 50, 50,50]} textStyle={styles.text}/>
              <Cols data={this.state.tableDataBottom} heightArr={size==='small'?[25, 25, 25, 25, 25,25]:[50, 50, 50, 50, 50,50]} textStyle={styles.text}/>
            </TableWrapper>
          </Table>
        </View>
        <IssueItemList 
          feature={this.state.feature}
          location={4}
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
