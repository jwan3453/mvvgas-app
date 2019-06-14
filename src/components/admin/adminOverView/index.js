import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList,Image} from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import { NavigationActions } from 'react-navigation';
import Store1 from '../../map/store1';
import Store2 from '../../map/store2';
import Store3 from '../../map/store3';
import Store4 from '../../map/store4';
import Store5 from '../../map/store5';
import Store10 from '../../map/store10';
import Button from '../../../lib/button'
import CommonHeader  from '../../../lib/commonHeader'
import storage from '../../../storage';
import { API_ROOT } from '../../../constans/setting';
import Toast from 'react-native-easy-toast';
import LoadingIndicator from '../../../lib/loadingIndicator';
import moment from 'moment';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:'white',
  },
  mapOverView: {
    width:'100%',
    height: 660,

  },
  smallMapView: {
    flex:1,
    height:330,
    borderWidth:1,
    //borderColor:'black',
  },
  storeNameText: {
    paddingTop:10,
    paddingBottom:10,
    textAlign:'center',
    fontSize:24,
  },
  issueCountText: {
    position:'absolute',
    width:'100%',
    bottom:5,
    textAlign:'center',
    fontSize:18,
  },

  openIssuesListView: {
    marginTop: 20,
    paddingLeft:50,
    paddingRight:50,
    paddingBottom:50,
  },

  openIssueListHeader:{
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom:20,
    justifyContent:'space-between',
  },

  openIssueText: {
    fontSize:20,
  },
  closedIssueBtn: {
    width: 160,
    height: 40,
    borderWidth:1,
    //borderColor:'black',
    borderRadius: 15,
    justifyContent:'center',
  },
  closedIssueBtnText: {
  
    textAlign:'center',
    //color:'black',
    fontSize: 16,
  },
  issueListTable: {
    width:'100%',
    height:'auto',
  },

  tableHeadView: {
    width:'100%',
    height: 64,
    flexDirection:'row',
  },
  headCell:{
    borderWidth:1,
    alignItems:'center',
    flexDirection:'row',
    paddingLeft:10,
  },
  headCellText: {
    fontSize:16,
  },
  sortIcon: {
    height:18,
    width:18,
    marginTop:5,
    marginLeft:10,
  },
  rowStyle: {
    flexDirection:'row',
    borderLeftWidth:1,
    borderRightWidth:1,
    borderBottomWidth:1,
  },
  columnCell: {
     paddingTop:10,
     paddingBottom:10,
     paddingLeft:10,
  },
  noMatchText: {
    fontSize:20,
    textAlign:'center',
    paddingTop:10,
  },


});

export default class AdminOverViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      allOpenIssues:null,
      allOpenIssuesNoSort:null,
      issueCount:[],
      order:'asc',
      token:null,
    }
  }

  componentDidMount(){
    storage.load({
      key: 'apiToken',
    }).then(token => {
      this.setState({
        token,
      }, ()=>{this.fetchAllOpenIssues(token)});
      
    }).catch((error) => {console.warn(error) });
  }

  fetchAllOpenIssues (token){
    this.setState({loading:true})
    fetch(API_ROOT+ '/api/issues/openissues', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.token
      },
    }).then((response) => {return response.json()})
    .then((data) => {
      if(data.status === 'ok') {

        let openIssueArray = [];
        let issueCountArray = []
        data.list.map((item)=>{
          if(openIssueArray[item.location]) {
            openIssueArray[item.location].push(item)
          } else {
            openIssueArray[item.location] = [];
            openIssueArray[item.location][0] = item;
          }
        })
        data.count.map((item)=> {
          issueCountArray[item.location] = item.issueCount;
        })


        this.setState({
          allOpenIssuesNoSort:data.list,
          allOpenIssues:openIssueArray,
          issueCount:issueCountArray
        })
      }
      this.setState({loading:false})
    })
    .catch((error) => {
      this.setState({loading:false})
      this.refs.toast.show('Something went wrong, contact admin')
    });
  }

  refreshList = () => {
    this.fetchAllOpenIssues(this.state.token);
  }


  onColumnSort(sortColumn) 
  {
    let data =  this.state.allOpenIssuesNoSort;
    let order = this.state.order;
    let orderNumber = 1;
    if(sortColumn === this.state.currentColumn) {
      order = order ==='asc'?'desc':'asc' 
    } else {
      order = 'asc';
    }
    orderNumber = order ==='asc'?-1:1
    data = data.sort((a, b) => {
      if(sortColumn === 'create_at') {
        return (moment(a[sortColumn],'hh:mm:ss a MM/DD/YYYY').unix()  < moment(b[sortColumn],'hh:mm:ss a MM/DD/YYYY').unix()) ? orderNumber* 1 : orderNumber * -1
      } else {
        let sortColumnA = a[sortColumn];
        let sortColumnB = b[sortColumn];
        sortColumnA = sortColumnA === null?'':sortColumnA
        sortColumnB = sortColumnB === null?'':sortColumnB

        if(sortColumn === 'feature') {
          let matchesA = sortColumnA.match(/\d+/g);
          let matchesB = sortColumnB.match(/\d+/g);
          if(matchesA !== null && matchesB !== null) {
            sortColumnA = parseInt(matchesA[0])
            sortColumnB = parseInt(matchesB[0])
          }
        }
        
        return sortColumnA < sortColumnB ? orderNumber* 1 : orderNumber * -1
      }
    })
    this.setState({
      allOpenIssuesNoSort:data,
      currentColumn:sortColumn,
      order,
    })
  }

  keyExtractor = (item, index) => index;
  renderItem = ({ item, index }) => {
    if(item=== undefined){
      return;
    }
    return (
      <View style={styles.rowStyle} index={index}>
        <View style={[styles.columnCell,{flex:2}]}>
          <Text>{item.created_at}</Text>
        </View>
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.status}</Text>
        </View>
        <View style={[styles.columnCell,{flex:2}]}>
          <Text>{item.reported_issue_text}</Text>
        </View>
        <View style={[styles.columnCell,{flex:2}]}>
          <Text>{item.diagnosed_issue}</Text>
        </View>
        <View style={[styles.columnCell,{flex:2}]}>
          <Text>{item.description}</Text>
        </View>               
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.location_text}</Text>
        </View>      
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.feature}</Text>
        </View>          
      </View>
    );
  }



  render() {
    const {dispatch} = this.props.navigation;
    return (
      <View style={styles.container}>
        {
          this.state.loading &&
          <LoadingIndicator />
        }
        <CommonHeader
          needLogout={true}
          needViewClosedIssue={true}
          dispatch={dispatch}
        />
        <ScrollView style={{ marginTop:-20}}>
        <View style={styles.mapOverView}>
          <View style={{width:'100%',flexDirection:"row"}}>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{ 
                          location:1,
                          refreshList:this.refreshList,
                        }   ,
                }))
              }
              }>
              <Text style={styles.storeNameText}>Tacoma Express #1</Text>
              <Store1 
                size={'small'}
                openIssues={this.state.allOpenIssues && this.state.allOpenIssues[1]?this.state.allOpenIssues[1]:null}
                noClick={true}
                refreshList = {this.refreshList}
                dispatch={dispatch}
              />
              <Text style={styles.issueCountText}>
                Current Issues: { this.state.issueCount[1]?this.state.issueCount[1]:0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{ 
                          location:2,
                          refreshList:this.refreshList,
                        }   ,
                }))
              }
              }>
              <Text style={styles.storeNameText}>Tacoma Express #2</Text>
              <Store2
                size={'small'}
                openIssues={this.state.allOpenIssues && this.state.allOpenIssues[2]?this.state.allOpenIssues[2]:null}
                noClick={true}
                refreshList = {this.refreshList}
                dispatch={dispatch}
              />
              <Text style={styles.issueCountText}>
                Current Issues: { this.state.issueCount[2]?this.state.issueCount[2]:0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{ 
                          location:3,
                          refreshList:this.refreshList,
                        }   ,
                }))
              }
              }>
              <Text style={styles.storeNameText}>Tacoma Express #3</Text>
              <Store3
                size={'small'}
                openIssues={this.state.allOpenIssues && this.state.allOpenIssues[3]?this.state.allOpenIssues[3]:null}
                noClick={true}
                refreshList = {this.refreshList}
                dispatch={dispatch}
              />
              <Text style={styles.issueCountText}>
                Current Issues: { this.state.issueCount[3]?this.state.issueCount[3]:0}
              </Text>
            </TouchableOpacity>
          </View>  
          <View  style={{width:'100%',flexDirection:"row"}}>
          <TouchableOpacity 
            style={styles.smallMapView}
            onPress={ ()=>{
              dispatch(NavigationActions.navigate({
                routeName: 'AdminLocationViewScreen',
                params:{ 
                        location:4,
                        refreshList:this.refreshList,
                      }   ,
              }))
            }
            }>
            <Text style={styles.storeNameText}>Tacoma Express #4</Text>
            <Store4
              size={'small'}
              openIssues={this.state.allOpenIssues && this.state.allOpenIssues[4]?this.state.allOpenIssues[4]:null}
              noClick={true}
              refreshList = {this.refreshList}
              dispatch={dispatch}
            />
            <Text style={styles.issueCountText}>
              Current Issues: { this.state.issueCount[4]?this.state.issueCount[4]:0}
            </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{ 
                          location:5,
                          refreshList:this.refreshList,
                        }   ,
                }))
              }
              }>
              <Text style={styles.storeNameText}>Tacoma Express #5</Text>
              <Store5
                size={'small'}
                openIssues={this.state.allOpenIssues && this.state.allOpenIssues[5]?this.state.allOpenIssues[5]:null}
                noClick={true}
                refreshList = {this.refreshList}
                dispatch={dispatch}
                />
              <Text style={styles.issueCountText}>
                Current Issues: { this.state.issueCount[5]?this.state.issueCount[5]:0}
              </Text>    
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.smallMapView}
              onPress={ ()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'AdminLocationViewScreen',
                  params:{ 
                          location:10,
                          refreshList:this.refreshList,
                        }   ,
                }))
              }
              }>
              <Text style={styles.storeNameText}>Tacoma Express #10</Text>
              <Store10
                size={'small'}
                openIssues={this.state.allOpenIssues && this.state.allOpenIssues[10]?this.state.allOpenIssues[10]:null}
                noClick={true}
                refreshList = {this.refreshList}
                dispatch={dispatch}
              />
              <Text style={styles.issueCountText}>
                Current Issues: { this.state.issueCount[10]?this.state.issueCount[10]:0}
              </Text>
            </TouchableOpacity>
          </View>  
        </View>

        <View style={styles.openIssuesListView}>
          <View style={styles.openIssueListHeader}>
            <Text style={styles.openIssueText}>
              Open Issues
            </Text>
            <Button
              style={styles.closedIssueBtn}
              title="See Closed Issues"
              titleStyle={styles.closedIssueBtnText}
              onPress={()=>{
                dispatch(NavigationActions.navigate({
                  routeName: 'ClosedIssueViewScreen',
                  params:{ 
                    refreshList:this.refreshList,
                  }   ,
                }))
              }}
            />
        </View>


        <View style={styles.tableHeadView}>
          <TouchableOpacity 
            style={[styles.headCell,{flex:2}]}
            onPress={() => this.onColumnSort('created_at')}
          >
            <Text style={styles.headCellText}>Time Stamp</Text>
            <Image 
              style={styles.sortIcon}
              source={require('../../../lib/images/sort.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.headCell,{flex:1}]}
            onPress={() => this.onColumnSort('status')}
          > 
            <Text>Status</Text>
            <Image 
              style={styles.sortIcon}
              source={require('../../../lib/images/sort.png')}
            />
          </TouchableOpacity>         
          <TouchableOpacity 
            style={[styles.headCell,{flex:2}]}
            onPress={() => this.onColumnSort('reported_issue_text')}
          > 
            <Text>Reported Issue</Text>
            <Image 
              style={styles.sortIcon}
              source={require('../../../lib/images/sort.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.headCell,{flex:2}]}
            onPress={() => this.onColumnSort('diagnosed_issue')}
          >
            <Text>Diagnosed Issues</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.headCell,{flex:2}]}
            onPress={() => this.onColumnSort('description')}
          >
            <Text>Description</Text>
            <Image 
              style={styles.sortIcon}
              source={require('../../../lib/images/sort.png')}
            />
          </TouchableOpacity> 
          <TouchableOpacity 
            style={[styles.headCell,{flex:1}]}
            onPress={() => this.onColumnSort('location')}
          >
            <Text>Location</Text>
            <Image 
              style={styles.sortIcon}
              source={require('../../../lib/images/sort.png')}
            />
          </TouchableOpacity>                                 
          <TouchableOpacity style={[styles.headCell,{flex:1}]}
            style={[styles.headCell,{flex:1}]}
            onPress={() => this.onColumnSort('feature')}
          >
            <Text>Feature</Text>
            <Image 
              style={styles.sortIcon}
              source={require('../../../lib/images/sort.png')}
            />
          </TouchableOpacity>
        </View>

        {
          this.state.allOpenIssuesNoSort && this.state.allOpenIssuesNoSort.length > 0 ?
            <FlatList
            legacyImplementation={true}
            data={this.state.allOpenIssuesNoSort}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onEndReachedThreshold={0.1}
          /> :
          <Text style={styles.noMatchText}>No matching records found</Text>
        }

      </View>
        
        </ScrollView>
        <Toast
          ref="toast"
          position='top'
          opacity={1}
          style={{ zIndex: 100, backgroundColor: 'black' }}
        />
      </View>
    )
  }
}
