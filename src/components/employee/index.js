import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import storage from '../../storage';
import Button from '../../lib/button'
import Store1 from '../map/store1';
import Store2 from '../map/store2';
import Store3 from '../map/store3';
import Store4 from '../map/store4';
import Store5 from '../map/store5';
import Store10 from '../map/store10';
import { API_ROOT } from '../../constans/setting';
import Toast from 'react-native-easy-toast';
import LoadingIndicator from '../../lib/loadingIndicator';
import CommonHeader from '../../lib/commonHeader'


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:'white',
  },
  openIssuesListView: {
    marginTop: 20,
    paddingLeft:80,
    paddingRight:80,
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
    borderColor:'black',
    borderRadius: 15,
    justifyContent:'center',
  },
  closedIssueBtnText: {
  
    textAlign:'center',
    color:'black',
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
  rowStyle: {
    flexDirection:'row',
  },
  columnCell: {
    padding:10,
  },

});


export default class EmployeeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openIssues:null,
      currentColumn:'',
      order:'asc',
      token:null,
      loading:false,
    }
  }
  
  componentDidMount(){

    storage.load({
      key: 'apiToken',
    }).then(token => {
      this.fetchOpenIssues(token);
      this.setState({
        token
      })
    }).catch((error) => {console.warn(error) });
  }

  fetchOpenIssues (token){
    this.setState({loading:true})
    const { location }  = this.props.navigation.state.params;
    fetch(API_ROOT+ '/api/issues/openissues/location/'+ location, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.token
      },
    }).then((response) => {return response.json()})
    .then((data) => {
      if(data.status === 'ok') {
        this.setState({
          openIssues:data.list
        })
      }
      this.setState({loading:false})
    })
    .catch((error) => {
      this.setState({loading:false})
      this.refs.toast.show('Something went wrong, contact admin')
    });
  }

  onColumnSort(sortColumn) {
    let data =  this.state.openIssues;
    let order = this.state.order;
    if(sortColumn === this.state.currentColumn) {
      if(order === 'asc') {
        order='desc';
        data = data.sort((a, b) => (a[sortColumn] > b[sortColumn]) ? 1 : -1)
      } else {
        order='asc';
        data = data.sort((a, b) => (a[sortColumn] < b[sortColumn]) ? 1 : -1)
      }
    } else {
      order='desc';
      data = data.sort((a, b) => (a[sortColumn] > b[sortColumn]) ? 1 : -1)
    }
    this.setState({
      openIssues:data,
      currentColumn:sortColumn,
      order,
    })
  }

  keyExtractor = (item, index) => index;
  renderItem = ({ item, index }) => {
    return (
      <View style={styles.rowStyle} index={index}>
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.created_at}</Text>
        </View>
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.reported_issue}</Text>
        </View>
        <View style={[styles.columnCell,{flex:2}]}>
          <Text>{item.diagnosed_issue}</Text>
        </View>
        <View style={[styles.columnCell,{flex:3}]}>
          <Text>{item.description}</Text>
        </View>        
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.location}</Text>
        </View>         
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.feature}</Text>
        </View>          
      </View>
    );
  };
  
  render() {
    const { location }  = this.props.navigation.state.params;
    const {dispatch} = this.props.navigation;
    return (
      <View style={styles.container}>
      <CommonHeader
        needLogout={true}
        headerText={'Tacoma Market #' + location}
        dispatch={dispatch}
      />
      <ScrollView >
      {
        this.state.loading &&
        <LoadingIndicator />
      }
      {
        location == 1 &&
        <Store1
          role='employee' 
          size={'regular'} 
          openIssues={this.state.openIssues}
          showToast={(msg) =>this.refs.toast.show(msg)}
          fetchOpenIssues={(token)=>this.fetchOpenIssues(token)}

        />
      }
      {
        location == 2 &&
        <Store2
          role='employee' 
          size={'regular'} 
          openIssues={this.state.openIssues}
          showToast={(msg) =>this.refs.toast.show(msg)}
          fetchOpenIssues={(token)=>this.fetchOpenIssues(token)}
        />
      }
      {
        location == 3 &&
        <Store3
          role='employee' 
          size={'regular'} 
          openIssues={this.state.openIssues}
          showToast={(msg) =>this.refs.toast.show(msg)}
          fetchOpenIssues={(token)=>this.fetchOpenIssues(token)}
        />
      }
      {
        location == 4 &&
        <Store4
          role='employee' 
          size={'regular'} 
          openIssues={this.state.openIssues}
          showToast={(msg) =>this.refs.toast.show(msg)}
          fetchOpenIssues={(token)=>this.fetchOpenIssues(token)}
        />
      }
      {
        location == 5 &&
        <Store5
          role='employee' 
          size={'regular'} 
          openIssues={this.state.openIssues}
          showToast={(msg) =>this.refs.toast.show(msg)}
          fetchOpenIssues={(token)=>this.fetchOpenIssues(token)}
        />
      }
      {
        location == 10 &&
        <Store10
          role='employee' 
          size={'regular'} 
          openIssues={this.state.openIssues}
          showToast={(msg) =>this.refs.toast.show(msg)}
          fetchOpenIssues={(token)=>this.fetchOpenIssues(token)}
        />
      }                              

    
        {
        //   <View style={styles.openIssuesListView}>
        //   <View style={styles.openIssueListHeader}>
        //     <Text style={styles.openIssueText}>
        //       Open Issues
        //     </Text>
        //     <Button
        //       style={styles.closedIssueBtn}
        //       title="See Closed Issue"
        //       titleStyle={styles.closedIssueBtnText}
        //       onPress={this.login}
        //     />
        //   </View>


        //   <View style={styles.tableHeadView}>
        //     <TouchableOpacity 
        //       style={[styles.headCell,{flex:1}]}
        //       onPress={() => this.onColumnSort('created_at')}
        //     >
        //       <Text style={styles.headCellText}>Time Stamp</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity 
        //       style={[styles.headCell,{flex:1}]}
        //       onPress={() => this.onColumnSort('reported_issue')}
        //     > 
        //       <Text>Reported Issue</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity 
        //       style={[styles.headCell,{flex:2}]}
        //       onPress={() => this.onColumnSort('diagnoed_issues')}
        //     >
        //       <Text>Diagnosed Issues</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity 
        //       style={[styles.headCell,{flex:3}]}
        //       onPress={() => this.onColumnSort('description')}
        //     >
        //       <Text>Description</Text>
        //     </TouchableOpacity>            
        //     <TouchableOpacity 
        //       style={[styles.headCell,{flex:1}]}
        //       onPress={() => this.onColumnSort('location')}
        //     >
        //       <Text>Location</Text>
        //     </TouchableOpacity>            
        //     <TouchableOpacity style={[styles.headCell,{flex:1}]}
        //       style={[styles.headCell,{flex:1}]}
        //       onPress={() => this.onColumnSort('feature')}
        //     >
        //       <Text>Feature</Text>
        //     </TouchableOpacity>
        //   </View>


        //   <FlatList
        //     legacyImplementation={true}
        //     data={this.state.openIssues}
        //     extraData={this.state}
        //     keyExtractor={this.keyExtractor}
        //     renderItem={this.renderItem}
        //     onEndReachedThreshold={0.1}
        //   />
        // </View>
        }
        <Toast
          ref="toast"
          position='top'
          opacity={1}
          style={{ zIndex: 100, backgroundColor: 'black' }}
        />
      </ScrollView>
      </View>
    )
  }
}
