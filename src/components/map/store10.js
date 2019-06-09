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
    width:100,
    height:60,
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
    tableData1: [
      [this.elementButton('28'), this.elementButton('28D')],
      [this.elementButton('27'), this.elementButton('27D')],
      [this.elementButton('26'), this.elementButton('26D')],
      [this.elementButton('25'), this.elementButton('25D')],
    ],
    tableData2: [
      [this.elementButton('22'), this.elementButton('22D'),this.elementButton('24'), this.elementButton('24D')],
      [this.elementButton('21'), this.elementButton('21D'),this.elementButton('23'), this.elementButton('23D')],
    ],
    tableData3: [
      [this.elementButton('18'), this.elementButton('20')],
      [this.elementButton('17'), this.elementButton('19')],
      [this.elementButton('14'), this.elementButton('16')],
      [this.elementButton('13'), this.elementButton('15')],
    ],
    tableData4: [
      [this.elementButton('10'), this.elementButton('12')],
      [this.elementButton('9'), this.elementButton('11')],
      [this.elementButton('6'), this.elementButton('8')],
      [this.elementButton('5'), this.elementButton('7')],
    ],
    tableData5: [
      [this.elementButton('2'), this.elementButton('2D'),this.elementButton('4'), this.elementButton('4D')],
      [this.elementButton('1'), this.elementButton('1D'),this.elementButton('3'), this.elementButton('3D')],
    ]
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.openIssues !== nextProps.openIssues) {
      this.setState({
        tableData1: [
          [this.elementButton('28',nextProps), this.elementButton('28D',nextProps)],
          [this.elementButton('27',nextProps), this.elementButton('27D',nextProps)],
          [this.elementButton('26',nextProps), this.elementButton('26D',nextProps)],
          [this.elementButton('25',nextProps), this.elementButton('25D',nextProps)],
        ],
        tableData2: [
          [this.elementButton('22',nextProps), this.elementButton('22D',nextProps),this.elementButton('24',nextProps), this.elementButton('24D',nextProps)],
          [this.elementButton('21',nextProps), this.elementButton('21D',nextProps),this.elementButton('23',nextProps), this.elementButton('23D',nextProps)],
        ],
        tableData3: [
          [this.elementButton('18',nextProps), this.elementButton('20',nextProps)],
          [this.elementButton('17',nextProps), this.elementButton('19',nextProps)],
          [this.elementButton('14',nextProps), this.elementButton('16',nextProps)],
          [this.elementButton('13',nextProps), this.elementButton('15',nextProps)],
        ],
        tableData4: [
          [this.elementButton('10',nextProps), this.elementButton('12',nextProps)],
          [this.elementButton('9',nextProps), this.elementButton('11',nextProps)],
          [this.elementButton('6',nextProps), this.elementButton('8',nextProps)],
          [this.elementButton('5',nextProps), this.elementButton('7',nextProps)],
        ],
        tableData5: [
          [this.elementButton('2',nextProps), this.elementButton('2D',nextProps),this.elementButton('4',nextProps), this.elementButton('4D',nextProps)],
          [this.elementButton('1',nextProps), this.elementButton('1D',nextProps),this.elementButton('3',nextProps), this.elementButton('3D',nextProps)],
        ]
      });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.openIssues === nextProps.openIssues ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }


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
        <View style={size==='small'?styles.smallMapSectionView:styles.mapSectionView}>
            <Table style={size==='small'?styles.smallTableViewTopLeft:styles.tableViewTopLeft}>
              <TableWrapper >
                <Cols data={this.state.tableData1} heightArr={size==='small'?[25, 25, 25, 25]:[50, 50, 50, 50]} textStyle={styles.text}/>
              </TableWrapper>
            </Table>

            <TouchableOpacity 
              style={[size==='small'?styles.samllCarWashView:styles.carWashView,carwashReported && {backgroundColor:'red'}, carwashOnHold&&{backgroundColor:'#F58F09'}]}
              onPress={()=>this.showIssueItemList('Car Wash',carwashIssue)}
            >
              <Text style={{textAlign:'center'}}>Car Wash</Text>
            </TouchableOpacity>
          </View>

          <View style={size==='small'?styles.smallMapSectionView:styles.mapSectionView}>
            <TouchableOpacity 
              style={[size==='small'?styles.smallStoreView:styles.storeView, storeReported && {backgroundColor:'red'}, storeOnHold&&{backgroundColor:'#F58F09'}]}
              onPress={()=>this.showIssueItemList('Store',storeIssue)}
            >
              <Text style={{textAlign:'center'}}>Store</Text>
            </TouchableOpacity>
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
        <IssueItemList 
          feature={this.state.feature}
          location={10}
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