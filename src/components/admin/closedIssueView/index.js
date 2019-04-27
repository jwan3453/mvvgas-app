import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import CommonHeader  from '../../../lib/commonHeader'
import storage from '../../../storage';
import { API_ROOT } from '../../../constans/setting';
import Toast from 'react-native-easy-toast';
import LoadingIndicator from '../../../lib/loadingIndicator';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:'white',
  },
  searchFilterView: {
    width:'95%',
    height:90,
    alignSelf:'center',
    borderWidth:1,
    borderColor:'red',
    flexDirection:'row',
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
    // borderColor:'black',
    justifyContent:'space-between',
    alignItems:'center',
  },
  filterInputText: {
    fontSize:14,
    paddingLeft:15,
  },
  sortIcon: {
    height:14,
    width:14,
    marginRight:10,
  }
})

export default class ClosedIssueViewScreen extends Component {
  constructor(props) {
    super(props);

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.state = {
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
    } 
  }

  componentDidMount(){

    storage.load({
      key: 'apiToken',
    }).then(token => {
      this.getAllFilterList(token);
      this.setState({
        token
      })
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
      }
      this.setState({loading:false})
    })
    .catch((error) => {
      this.setState({loading:false})
      this.refs.toast.show('Something went wrong, contact admin')
    });
  }

  selectFilters(type){

    let data = null;
    switch(type) {
      case 'reportedIssue':
        data = this.state.issueItemList;
        break;
      case 'diagnosedIssue':
        data = this.state.issueItemList;
        break;
      case 'location':
        data = this.state.locationList
        break;
      case 'feature':
        data = this.state.featureList
        break;
    }
    console.warn(data);
    Picker.init({
      pickerFontSize: 16,
      pickerTextEllipsisLen: 20,
      pickerData: [1,2,3,4],
      selectedValue: [this.state.usBankAccountType],
      pickerTitleText: 'I missed this class',
      onPickerConfirm: data => {
        console.warn(data);
      },
    });
    Picker.show();
  }

  render(){
    const {dispatch} = this.props.navigation;
    return (
      <View style={styles.container}>
        {
          this.state.loading &&
          <LoadingIndicator />
        }
        <CommonHeader
          needLogout={true}
          needGoMainMenu={true}
          dispatch={dispatch}
        />

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
              onPress={()=>this.selectFilters('reportedIssue')}
            >
                <Text style={styles.filterInputText}>All reported Issue</Text>
                <Image 
                  style={styles.sortIcon}
                  source={require('../../../lib/images/sort.png')}
                />
            </TouchableOpacity>
          </View>

          <View style={styles.filterItemView}>
            <Text style={styles.filterText}>Diagnosed Issue</Text>
            <TouchableOpacity 
              style={styles.filterInput}
              onPress={()=>this.selectFilters('diagnosedIssue')}
            >
                <Text style={styles.filterInputText}>All diagnosed Issues</Text>
                <Image 
                  style={styles.sortIcon}
                  source={require('../../../lib/images/sort.png')}
                />
            </TouchableOpacity> 
          </View>

          <View style={styles.filterItemView}>
            <Text style={styles.filterText}>Location</Text>
            <TouchableOpacity 
              style={styles.filterInput}
              onPress={()=>this.selectFilters('location')}
            >
                <Text style={styles.filterInputText}>All locations</Text>
                <Image 
                  style={styles.sortIcon}
                  source={require('../../../lib/images/sort.png')}
                />
            </TouchableOpacity> 
          </View>   

          <View style={styles.filterItemView}>
            <Text style={styles.filterText}>Feature</Text>
            <TouchableOpacity 
              style={styles.filterInput}
              onPress={()=>this.selectFilters('feature')}
            >
                <Text style={styles.filterInputText}>All features</Text>
                <Image 
                  style={styles.sortIcon}
                  source={require('../../../lib/images/sort.png')}
                />
            </TouchableOpacity> 
          </View>         
        </View>





        </View>
    )
  }
}
