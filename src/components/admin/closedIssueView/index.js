import React, { Component } from 'react';
import { StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  FlatList,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import CommonHeader  from '../../../lib/commonHeader'
import storage from '../../../storage';
import { API_ROOT } from '../../../constans/setting';
import Toast from 'react-native-easy-toast';
import LoadingIndicator from '../../../lib/loadingIndicator';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';
import moment from 'moment';


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:'white',
  },
  searchFilterView: {
    width:'95%',
    height:90,    
    flexDirection:'row',
    alignSelf:'center',
    // borderWidth:1,
    // borderColor:'red',

  },
  filterItemView: {
    marginRight:20,

  },
  filterText: {
    fontSize:18,
  },
  filterDateView: {
    marginTop:10,
    flexDirection:'row',
  },
  filterInput: {
    marginTop:10,
    width:170,
    height:40,
    borderWidth:1,
    flexDirection:'row',

    justifyContent:'space-between',
    alignItems:'center',
    borderColor:'#C3C3C3',
  },
  filterInputText: {
    fontSize:14,
    paddingLeft:15,
  },
  dropdownIcon: {
    height:14,
    width:14,
    marginRight:8,
  },
  searchBtn: {
    width:120,
    height: 40,
    borderWidth:1,
    //borderColor:'black',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
  },
  searchBtnText: {
    textAlign:'center',
  },

  closedIssueListView: {
    // marginTop: 20,
    paddingTop:20,
    paddingBottom:50,
    width:'95%',
    alignSelf:'center',
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
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:10,
  },
  noMatchText: {
    fontSize:20,
    textAlign:'center',
    paddingTop:10,
  },

  listPageView: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:'auto',
    marginTop:30,
  },
  pagingIconView: {
    height:50,
    width:50,
  },
  pagingIcon:{
    height:50,
    width:50,
  },
  pageView: {
    flexDirection:'row',
  },
  pageBtn: {
    height:45,
    width:45,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderLeftWidth:1,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#DEE2E6',
  },
  currentPageBtn: {
    backgroundColor:'#017BFF'
  },
  lastPageBtn: {
    borderRightWidth:1,
  },
  pageBtnText: {
    fontSize:20,
    color:'#017BFF',
  },
  currentPageBtnText : {
    color:'white',
  }
})

export default class ClosedIssueViewScreen extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.state = {
      firstSearch: 1,
      loading:false,
      startDate:date,
      endDate:date,
      issueItemList:null,
      locationList:null,
      featureList:null,

      selectedReportedIssue:null,
      selectedDiagnosedIssue:null,
      selectedLocation:null,
      selectedFeature:null,

      selectedReportedIssueText:'All reported issues',
      selectedDiagnosedIssueText:'All diagnosed issues',
      selectedLocationText:'All locations',
      selectedFeatureText:'All features',
      
      token:null,
      order:'asc',
      offset:0,
      currentColumn:'',
      closedIssueList:null,
      totalIssues:0,
      pageSize:10,
    } 
  }

  componentDidMount(){
    
    storage.load({
      key: 'apiToken',
    }).then(token => {
      this.getAllFilterList(token);
      this.setState({
        token
      }, ()=>this.search('new'))
    }).catch((error) => {console.warn(error) });
  }

  getAllFilterList (token){
    this.setState({loading:true})
    fetch(API_ROOT+ '/api/getallfilterItems', {
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
          issueItemList:data.issueItems,
          locationList:data.locations,
          featureList:data.features,
        })

        const { location } = this.props.navigation.state.params;
        if(location) {
          data.locations.map( (locationItem) => {
            if(locationItem.id === location ) {
              this.setState({
                selectedLocationText:locationItem.name
              })
            }
          })
          this.setState({
            selectedLocation:location,
          })
        }

      }
      this.setState({loading:false})
    })
    .catch((error) => {
      this.setState({loading:false})
      this.refs.toast.show('Something went wrong, contact admin')
    });
  }


  search(type) {
    const { location } = this.props.navigation.state.params;
    let searchLocation = null;
    if(location && this.state.firstSearch === 1) {
      searchLocation = location
    } else {
      searchLocation = this.state.selectedLocation === 0?null:this.state.selectedLocation;
    }
    this.setState({
      loading:true,
      firstSearch: this.state.firstSearch + 1
    })
    if(this.state.token) { 
     let params = {
        status:'closed',
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        reportedIssue:this.state.selectedReportedIssue === 0?null:this.state.selectedReportedIssue,
        diagnosedIssue:this.state.selectedDiagnosedIssue === 0?null:this.state.selectedDiagnosedIssue,
        location:searchLocation,
        feature:this.state.selectedFeature === 'All Features'?null:this.state.selectedFeature,
        offset:type === 'new'?0:this.state.offset,
        order:this.state.order,
      };

      if(type === 'new') {
        this.setState({
          offset:0,
        })
      }

      Object.keys(params).forEach((key) => (params[key] == null) && delete params[key])
      var queryString = Object.keys(params).map(function(key) {
        if(params[key] !== null) {
          return key + '=' + params[key]
        } 
       
      }).join('&');
      // queryString = queryString.replace(' #','%23');
      fetch(API_ROOT+ '/api/issues?'+ encodeURI(queryString).replace('#','%23'), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ this.state.token.token
        },

      }).then((response) => {return response.json()})
      .then((data) => {
        this.setState({loading:false})
        if(data.status === 'ok') {
          this.setState({
            closedIssueList: data.rows,
            totalIssues:data.total,
            offset: this.state.offset + data.rows.length,
          })
        }
        this.setState({loading:false})
      })
      .catch((error) => {
        this.setState({loading:false})
        this.refs.toast.show('Something went wrong, contact admin')
      });
    }
  }

  selectFilters(type){

    let data = null;
    let tmpList = [];
    switch(type) {
      case 'reported issue':
        this.state.issueItemList.map((item)=>{
          if(item.name.toLowerCase().includes('other')) {
            tmpList[item.id]  = 'Other - ' + item.type;
          } else {
            tmpList[item.id] = item.name
          }
          //tmpList[item.id] = item.name;
        })
        tmpList[0]='All reported issues';
        data = tmpList;
        break;
      case 'diagnosed issue':
        this.state.issueItemList.map((item)=>{
          if(item.name.toLowerCase().includes('other')) {
            tmpList[item.id]  = 'Other - ' + item.type;
          } else {
            tmpList[item.id] = item.name
          }
          //tmpList[item.id] = item.name;
        })
        tmpList[0]='All diagnosed issues';
        data = tmpList;
        break;
      case 'location':
        this.state.locationList.map((item)=>{
            tmpList[item.id] = item.name
        })
        tmpList[0]='All locations';
        tmpList = tmpList.filter(function() { return true; });
        data = tmpList;
        this.setState({
          selectedFeature: 'All Features',
          selectedFeatureText: 'All Features',
        })
        break;
      case 'feature':
        if(this.state.selectedLocation === null) {
          this.refs.toast.show('please selelct the location first');
          return;
        } else {
          tmpList.push('All features');
          this.state.featureList.map((item)=>{
            if(item.location == this.state.selectedLocation) {
              tmpList.push(item.feature);
            }
          })
          data = tmpList;
        }
        break;
    }
    Picker.init({
      pickerFontSize: 20,
      pickerTextEllipsisLen: 20,
      pickerData: data,
      selectedValue: [this.state.usBankAccountType],
      pickerTitleText: type,
      onPickerConfirm: selelcted => {
        switch(type) {
          case 'reported issue':
            this.setState({
              selectedReportedIssue: data.indexOf(selelcted[0]),
              selectedReportedIssueText: selelcted[0],
            })
            break;
          case 'diagnosed issue':
            this.setState({
              selectedDiagnosedIssue: data.indexOf(selelcted[0]),
              selectedDiagnosedIssueText: selelcted[0],
            })
            break;
          case 'location':
            let matchs = selelcted[0].match(/\d+$/);
            this.setState({
              selectedLocation: matchs?matchs[0]:null,
              selectedLocationText: selelcted[0],
            })
            break;
          case 'feature':
            this.setState({
              selectedFeature: selelcted[0],
              selectedFeatureText: selelcted[0],
            })
            break;
        }
      },
    });
    Picker.show();
  }

  onColumnSort(sortColumn) 
  {
    let data =  this.state.closedIssueList;
    let order = this.state.order;

    let orderNumber = 1;
    if(sortColumn === this.state.currentColumn) {
      order = order ==='asc'?'desc':'asc' 
    } else {
      order = 'asc';
    }
    orderNumber = order ==='asc'?-1:1
    data = data.sort((a, b) => {
      if(sortColumn === 'closedAt') {
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
      closedIssueList:data,
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
          <Text>{item.closedAt}</Text>
        </View>
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.status}</Text>
        </View>
        <View style={[styles.columnCell,{flex:2}]}>
          <Text>{item.reportedIssueText}</Text>
        </View>
        <View style={[styles.columnCell,{flex:2}]}>
          <Text>{item.diagnosedIssues}</Text>
        </View>
        <View style={[styles.columnCell,{flex:2}]}>
          <Text>{item.description}</Text>
        </View>               
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.locationText}</Text>
        </View>      
        <View style={[styles.columnCell,{flex:1}]}>
          <Text>{item.feature}</Text>
        </View>          
      </View>
    );
  }

  renderPageNumbers() {
    let maxPageNo = 7;
    let pages = Math.ceil(this.state.totalIssues / this.state.pageSize );
    let currentPage = Math.ceil(this.state.offset / this.state.pageSize);
    let pagesDisplay = [];
    if(!pages || pages === 0) {
      return;
    }

    let loopNum = pages <= maxPageNo?pages:maxPageNo;
    for(let i=0; i<loopNum; i++) {

      let pageNo = 0;
      if(pages > maxPageNo &&  currentPage < (5) ) {

        if(i === (loopNum - 1)) {
          pageNo = pages;
        } else {
          pageNo = i + 1;
        }

      } else if(pages > maxPageNo &&  currentPage > (pages -4) ){

        if(i === 0) {
          pageNo = 1;
        } else {
          pageNo = pages - (6 - i);
        }

      } else if(pages > maxPageNo && 4 < currentPage  &&  currentPage < (pages - 3) ){
        if(i === 0) {
          pageNo = 1;
        } else  if(i === (loopNum - 1)) {
          pageNo = pages;
        } else {
          pageNo = currentPage  - ( 3 - i );
        }

      } else {
        pageNo = i + 1;
      }


      if(pages > maxPageNo &&  currentPage < (5) && i === (loopNum-2) ) {
        pagesDisplay.push(
          <View 
            style={
              [ styles.pageBtn, 
                currentPage ===(loopNum-1)?styles.lastPageBtn:null,
              ]}  
            >
  
            <Text style={[styles.pageBtnText]}>...</Text>
          </View>
        )
      } else if(pages > maxPageNo &&  currentPage > (pages -4) && i === 1){
        pagesDisplay.push(
          <View 
            style={
              [ styles.pageBtn, 
                currentPage ===(loopNum-1)?styles.lastPageBtn:null,
              ]}  
            >
  
            <Text style={[styles.pageBtnText]}>...</Text>
          </View>
        )
      } else if(pages > maxPageNo &&  currentPage < (pages - 3) && currentPage > 4 && (i === 1 || i === (loopNum-2)) ){
        pagesDisplay.push(
          <View 
            style={
              [ styles.pageBtn, 
                currentPage ===(loopNum-1)?styles.lastPageBtn:null,
              ]}  
            >
  
            <Text style={[styles.pageBtnText]}>...</Text>
          </View>
        )
      }
      else{
        pagesDisplay.push(
          <TouchableOpacity 
            style={
              [ styles.pageBtn, 
                currentPage === pageNo?styles.currentPageBtn:null,
                i ===(loopNum-1)?styles.lastPageBtn:null,
              ]}
              onPress={()=>{
                console.warn(i * this.state.pageSize);
                this.setState({
                  offset:((pageNo-1) * this.state.pageSize)
                },()=>this.search())
                }}    
            >
  
            <Text style={[styles.pageBtnText,currentPage ===pageNo?styles.currentPageBtnText:null]}>{pageNo}</Text>
          </TouchableOpacity>
        )
      }

    }
    return (
      <View style={styles.pageView}>  
        {
          pagesDisplay
        }
      </View>
    )
  }

  movePage(type) {
    if(type === 'backward') {
      if(this.state.offset > this.state.pageSize ) {
        this.setState({
          offset: (Math.ceil(this.state.offset  / this.state.pageSize) - 2 ) * this.state.pageSize
        },()=>this.search())
      }
    }  else {
      if(this.state.offset < this.state.totalIssues) {
        this.setState({
          offset: this.state.offset 
        },()=>this.search())
      }
    }
  }

  render(){
    const {dispatch} = this.props.navigation;
    const {refreshList, location } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        {
          this.state.loading &&
          <LoadingIndicator />
        }
        <CommonHeader
          needLogout={true}
          needGoMainMenu={true}
          refreshIssueList={()=>{refreshList !==undefined && refreshList()}}
          dispatch={dispatch}
        />

        <ScrollView>

          <View style={styles.searchFilterView}>
            <View style={styles.filterItemView}>
              <Text style={styles.filterText}>Date range</Text>
              <View style={styles.filterDateView}>
                <DatePicker
                  style={{width: 150}}
                  date={this.state.startDate}
                  mode="date"
                  placeholder={this.state.startDate}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                  }}
                  onDateChange={(date) => {
                    this.setState({startDate: date})
                  }}
                />
                <DatePicker
                  style={{width: 170}}
                  date={this.state.endDate}
                  mode="date"
                  placeholder={this.state.endDate}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      marginLeft: 20
                    }
                  }}
                  onDateChange={(date) => {
                    this.setState({endDate: date})
                  }}
                />              
              </View>
            </View>

            <View style={styles.filterItemView}>
              <Text style={styles.filterText}>Reported Issue</Text>
              <TouchableOpacity 
                style={styles.filterInput}
                onPress={()=>this.selectFilters('reported issue')}
              >
                  <Text style={styles.filterInputText}>{this.state.selectedReportedIssueText}</Text>
                  <Image 
                    style={styles.dropdownIcon}
                    source={require('../../../lib/images/dropdown.png')}
                  />
              </TouchableOpacity>
            </View>

            <View style={styles.filterItemView}>
              <Text style={styles.filterText}>Diagnosed Issue</Text>
              <TouchableOpacity 
                style={styles.filterInput}
                onPress={()=>this.selectFilters('diagnosed issue')}
              >
                  <Text style={styles.filterInputText}>{this.state.selectedDiagnosedIssueText}</Text>
                  <Image 
                    style={styles.dropdownIcon}
                    source={require('../../../lib/images/dropdown.png')}
                  />
              </TouchableOpacity> 
            </View>

            <View style={styles.filterItemView}>
              <Text style={styles.filterText}>Location</Text>
              <TouchableOpacity 
                style={styles.filterInput}
                onPress={()=>this.selectFilters('location')}
              >
                  <Text style={styles.filterInputText}>{this.state.selectedLocationText}</Text>
                  <Image 
                    style={styles.dropdownIcon}
                    source={require('../../../lib/images/dropdown.png')}
                  />
              </TouchableOpacity> 
            </View>   

            <View style={styles.filterItemView}>
              <Text style={styles.filterText}>Feature</Text>
              <TouchableOpacity 
                style={styles.filterInput}
                onPress={()=>this.selectFilters('feature')}
              >
                  <Text style={styles.filterInputText}>{this.state.selectedFeatureText}</Text>
                  <Image 
                    style={styles.dropdownIcon}
                    source={require('../../../lib/images/dropdown.png')}
                  />
              </TouchableOpacity> 
            </View>         

            <View style={[styles.filterItemView,{marginTop:33,}]}>
              <TouchableOpacity 
                style={styles.searchBtn}
                onPress={()=>this.search('new')}
              >
                  <Text style={styles.searchBtnText}>search</Text>
              </TouchableOpacity> 
            </View>  
          </View>

          <View style={styles.closedIssueListView}>
            <View style={styles.tableHeadView}>
              <TouchableOpacity 
                style={[styles.headCell,{flex:2}]}
                onPress={() => this.onColumnSort('closedAt')}
              >
                <Text style={styles.headCellText}>Date closed</Text>
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
                onPress={() => this.onColumnSort('reportedIssueText')}
              > 
                <Text>Reported Issue</Text>
                <Image 
                  style={styles.sortIcon}
                  source={require('../../../lib/images/sort.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.headCell,{flex:2}]}
                onPress={() => this.onColumnSort('diagnosedIssues')}
              >
                <Text>Diagnosed Issues</Text>
                <Image 
                  style={styles.sortIcon}
                  source={require('../../../lib/images/sort.png')}
                />
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
              this.state.closedIssueList && this.state.closedIssueList.length > 0 ?
              <FlatList
                legacyImplementation={true}
                data={this.state.closedIssueList}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                onEndReachedThreshold={0.1}
              />:
              <Text style={styles.noMatchText}>No matching records found</Text>
            }



            {
              this.state.closedIssueList && this.state.closedIssueList.length > 0 &&
              <View style={styles.listPageView}>
                <TouchableOpacity 
                  style={styles.pagingIconView}
                  onPress={()=>this.movePage('backward')}
                >
                <Image 
                  style={styles.pagingIcon}
                  source={require('../../../lib/images/pageLeft.png')}
                />
                </TouchableOpacity>

                {
                  this.renderPageNumbers()
                }

                <TouchableOpacity 
                  style={styles.pagingIconView}
                  onPress={()=>this.movePage('forward')}
                  >
                <Image 
                  style={styles.pagingIcon}
                  source={require('../../../lib/images/pageRight.png')}
                />
                </TouchableOpacity>
              </View>
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
