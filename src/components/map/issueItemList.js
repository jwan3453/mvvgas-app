import React, { Component } from 'react';
import { StyleSheet,Alert, View, Text, TouchableOpacity,ScrollView,TextInput, Image} from 'react-native';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import storage from '../../storage';
import { API_ROOT } from '../../constans/setting';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },

  popupStyle: {
    width: 450,
    height: 'auto',
    backgroundColor:'white',
  },
  issuePanelHeaderView: {
    height: 60,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'black'
  },
  panelHeaderText: {
    fontSize: 24,
  },


  issueTextView : {
    height: 30,
    width: '90%',
    justifyContent:'center',

    alignSelf:'center',
    marginTop:5,
    marginBottom:5,
  },

  issueText:{
    fontSize:16,
    textAlign: 'left',
  },

  issueItemScrollList: {
    height: 420,

  },
  issueItemView: {
    height: 50,
    width: '90%',
    paddingLeft:20,
    paddingRight:20,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'black',
    marginTop:10,
    marginBottom:10,
    borderRadius: 5,
  },
  selectedIssueItem: {
    backgroundColor:'#C6C6C6',
    borderColor:'#797979',
    borderWidth:2,
  },
  issueItemText: {
    fontSize:20,
  },
  issueDetialView: {
    marginTop:10,
    width:'90%',
    alignSelf:'center'
  },
  issueDetailLabel: {
    fontSize:18,
  },
  textInput: {
    color: 'black',
    fontSize: 16,
    height: 150,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlignVertical: "top"
  },
  submitIssueBtn:{
    height: 50,
    width: '90%',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'blue',
    marginTop:30,
    marginBottom:10,
    borderRadius: 5,
    backgroundColor:'#93C1F3'
  },
  submitIssueBtnText: {
    color:'white',
  },

  updateIssueBtn: {
    height: 50,
    width: '40%',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'blue',
    marginTop:30,
    marginBottom:10,
    borderRadius: 5,
    backgroundColor:'#93C1F3'
  },
  disalbeUpdateIssueBtn: {
    backgroundColor:"grey"
  },

  updateIssueBtnText: {
    color:'white',
  },

  closeIcon: {
    width:40,
    height:40,
    position:'absolute',
    top:10,
    right:20,
  }

});


const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

export default class IssueItemList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showIssueItem:false,
      issueItems:null,
      selectedDiagnosedIssues:null,
      selectedDiagnosedIssuesText:'',
      selectedReportIssue:null,
      issueDescription:'',
      continue:false,
    }
  }


  componentDidMount(){

    storage.load({
      key: 'apiToken',
    }).then(token => {
      this.fetchIssueItems(token);
    }).catch((error) => {console.warn(error) });
  }

  fetchIssueItems (token){
    fetch(API_ROOT+ '/api/issueitems', {
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
          issueItems:data.issueItems
        })
      }

    })
    .catch((error) => {
      this.props.showToast('Something went wrong, contact admin')
    });
  }

  selectItem(issueItem){
    if(this.props.role === 'employee') {
      this.setState({
        selectedReportIssue:issueItem
      })
    }else {
      let tmpObj = Object.assign([],this.state.selectedDiagnosedIssues);
      if(this.state.selectedDiagnosedIssues && this.state.selectedDiagnosedIssues.includes(issueItem.id)) {
        tmpObj.splice(tmpObj.indexOf(issueItem.id), 1);
        this.setState({
          selectedDiagnosedIssues: tmpObj
        })
      } else if(this.state.selectedDiagnosedIssues && !this.state.selectedDiagnosedIssues.includes(issueItem.id)){
        tmpObj.push(issueItem.id);
        this.setState({
          selectedDiagnosedIssues: tmpObj
        })
      }
    }
  }

  handleIssueDescriptionChange = (issueDescription) => {
    this.setState({ issueDescription});
  }



  createNewIssue(token){

    this.props.closeIssuePanel();
    fetch(API_ROOT+ '/api/issues', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.token
      },
      body:  JSON.stringify({
        reportedIssue:this.state.selectedReportIssue.id,
        description:this.state.issueDescription,
        location:this.props.location,
        feature:this.props.feature
      })
    }).then((response) => {return response.json()})
    .then((data) => {
      if(data.status === 'ok') {
        Alert.alert('Issue created');
        this.props.fetchOpenIssues(token);
      } else {
        Alert.alert('Unable to crate an issue');
      }
    })
    .catch((error) => {
      Alert.alert('Error when creating an issue');
      //this.props.showToast('Something went wrong, contact admin')
    });

    this.setState({
      selectedReportIssue:null,
      selectedDiagnosedIssues:null,
      continue:false,
    })
  }

  submitNewIssue(){
    if(this.state.selectedReportIssue === null) {
      Alert.alert('please select an issue.');
    } else {
      storage.load({
        key: 'apiToken',
      }).then(token => {
        this.createNewIssue(token);
      }).catch((error) => {console.warn(error) });
    }
  }

  updateCurrentIssue(token, status){

    this.props.closeIssuePanel();
    console.warn(this.props.currentIssue.id);
    fetch(API_ROOT+ '/api/issues/' + this.props.currentIssue.id, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.token
      },
      body: JSON.stringify({
        diagnosedIssue:this.state.selectedDiagnosedIssues.join(','),
        description:this.state.issueDescription,
        status,
      }), 
    }).then((response) => {return response.json()})
    .then((data) => {
      if(data.status === 'ok') {
        Alert.alert('Issue updated');
        this.props.fetchOpenIssues(token);
      } else {
        Alert.alert('Unable to update the issue');
      }
    })
    .catch((error) => {
      console.warn(error);
      Alert.alert('Error when updating the issue');
    });

    this.setState({
      selectedReportIssue:null,
      selectedDiagnosedIssues:null,
      continue:false,
    })
  }



  updateIssue(status){
    if(this.state.issueDescription !== '') {
      storage.load({
        key: 'apiToken',
      }).then(token => {
        this.updateCurrentIssue(token,status);
      }).catch((error) => {console.warn(error) });
    }
  }

  continueToCloseIssue(){
    this.setState({
      continue:true,
    })
  }

  renderPopupContent(){
    const { role,type,currentIssue} = this.props;
    let reported_issue = null;
    let panelHeader = '';
    let issueItemListView = null;
    let issueItemList = [];
    let issuePanelDisplay = null;
    //display list for employee to report issie
    if(role === 'employee') {
      panelHeader = 'Report Issue on '+ type;
      if(this.state.issueItems) {
        //select report issue as 'Other'
        if(this.state.selectedReportIssue !== null && this.state.selectedReportIssue.name.toLowerCase() === 'other') {
          issueItemListView = (
            <View style={styles.issueDetialView}>
              <Text style={styles.issueDetailLabel}>Enter Issue</Text>
              <TextInput
                style={styles.textInput}
                placeholder="please enter issue description"
                placeholderTextColor="rgba(0, 0, 0, 0.2)"
                onChangeText={this.handleIssueDescriptionChange}
                underlineColorAndroid='transparent'
                value={this.state.issueDescription}
                autoCapitalize = 'none'
                numberOfLines={10}
                 multiline={true}
              />
            </View>
          )
        }　else {
         // render issue list 
          this.state.issueItems.map((issueItem)=> {
            if(issueItem.type.toLowerCase().includes(type.toLowerCase())) {
              issueItemList.push(
                <TouchableOpacity 
                  style={
                    [
                      styles.issueItemView, 
                      this.state.selectedReportIssue && this.state.selectedReportIssue.id === issueItem.id && styles.selectedIssueItem ]} 
                  key={issueItem.id}
                  onPress={()=>this.selectItem(issueItem)}
                  >
                  <Text style={styles.issueItemText}>
                    {issueItem.name}
                  </Text>
                </TouchableOpacity>
              )
            }
          })

          issueItemListView = (
            <ScrollView style={styles.issueItemScrollList} contentContainerStyle={{alignItems:'center'}}>
            {
              issueItemList
            }
            </ScrollView>
          )
        }
      }

      issuePanelDisplay = (
        <View>
          {
            issueItemListView
          }
          <TouchableOpacity 
            style={styles.submitIssueBtn}
            onPress={()=>this.submitNewIssue()}
          >
            <Text style={styles.submitIssueBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )
    }
    //display list for admin to close the issie
    else {
      panelHeader = 'Issue on '+ type;
      if(currentIssue && this.state.issueItems) {
        this.state.issueItems.map((issueItem)=> {
          if(issueItem.id == currentIssue.reported_issue) {
            reported_issue = issueItem.name;
            if(reported_issue.toLowerCase().includes('other')) {
              reported_issue = 'Other, ' + currentIssue.description;
            }
          }
        })
      }

      if(this.state.issueItems) {
        if(this.state.continue === true) {
          //render the contiune panel
          let diagnosedIssueText = '';
          this.state.issueItems.map((issueItem)=>{
            if(this.state.selectedDiagnosedIssues && this.state.selectedDiagnosedIssues.includes(issueItem.id)) {
              diagnosedIssueText += issueItem.name + ', '
            }
          })

          issueItemListView = (
            <View>
              <View style={styles.issueTextView}>
                <Text style={styles.issueText}> Diagnosed Issue(s): { diagnosedIssueText  }</Text>
              </View>
              <View style={styles.issueDetialView}>
                <Text style={styles.issueText}>Enter followup on issue:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  placeholderTextColor="rgba(0, 0, 0, 0.2)"
                  onChangeText={this.handleIssueDescriptionChange}
                  underlineColorAndroid='transparent'
                  value={this.state.issueDescription}
                  autoCapitalize = 'none'
                  numberOfLines={10}
                  multiline={true}
                />
              </View>
            </View>
          );
        } else {
          this.state.issueItems.map((issueItem)=> {
            if(issueItem.type.toLowerCase().includes(type.toLowerCase())) {
              issueItemList.push(
                <TouchableOpacity 
                  style={
                    [ styles.issueItemView, 
                      this.state.selectedDiagnosedIssues && this.state.selectedDiagnosedIssues.includes(issueItem.id) && styles.selectedIssueItem 
                    ]} 
                  key={issueItem.id}
                  onPress={()=>this.selectItem(issueItem)}
                  >
                  <Text style={styles.issueItemText}>
                    {issueItem.name}
                  </Text>
                </TouchableOpacity>
              )
            }
          })

          issueItemListView = (
            <ScrollView style={styles.issueItemScrollList} contentContainerStyle={{alignItems:'center'}}>
            {
              issueItemList
            }
            </ScrollView>
          )
        }
      }



      issuePanelDisplay = (
        <View>
          {
            issueItemListView
          }
          {
            this.state.continue === false ?
            <TouchableOpacity 
              style={styles.submitIssueBtn}
              onPress={()=>this.continueToCloseIssue()}
            >
              <Text style={styles.submitIssueBtnText}>Continue</Text>
            </TouchableOpacity>:
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
              <TouchableOpacity 
                style={[styles.updateIssueBtn,this.state.issueDescription ==='' && styles.disalbeUpdateIssueBtn] }
                onPress={()=>this.updateIssue('on hold')}
              >
                <Text style={styles.updateIssueBtnText}>Put on hold</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.updateIssueBtn,this.state.issueDescription ==='' && styles.disalbeUpdateIssueBtn] }
                onPress={()=>this.updateIssue('closed')}
              >
                <Text style={styles.updateIssueBtnText}>Close Issue</Text>
              </TouchableOpacity>

            </View>
          }

        </View>
      )
    }


    return (
      <View>
        <TouchableOpacity 
          style={styles.issuePanelHeaderView}
          onPress={()=>{
            this.setState({
              selectedReportIssue:null,
              selectedDiagnosedIssues:null,
              continue:false,
            })
            this.props.closeIssuePanel();
          }}
        >
          <Text style={styles.panelHeaderText}>
            { panelHeader }
          </Text>
          <Image 
            style={styles.closeIcon}
            source={require('../../lib/images/close.png')}
          />
        </TouchableOpacity>
        { 
          reported_issue && 
          <View style={styles.issueTextView}>
            <Text style={styles.issueText}> Reported issue: { reported_issue  }</Text>
          </View>
        }

        
        {
          issuePanelDisplay
        }
      </View>
    )
  }

  componentWillReceiveProps(nextPrpos) {
    const {  currentIssue } = this.props;
    if(currentIssue !== nextPrpos.currentIssue) {
      this.setState({
        selectedDiagnosedIssues: [parseInt(nextPrpos.currentIssue.reported_issue)],
      })
    }
  }

  render() {
    const { currentIssue } = this.props;
    if(currentIssue !== null && this.state.selectedDiagnosedIssues === null ){
      this.setState({
        selectedDiagnosedIssues: [parseInt(currentIssue.reported_issue)],
      })
    }

    return (
      <View style={styles.container}>
        <PopupDialog
          ref={(issueItemListDialog) => { this.issueItemListDialog = issueItemListDialog; }}
          dialogAnimation={slideAnimation}
          dialogStyle={styles.popupStyle}
          dismissOnTouchOutside={true}
          visible={this.props.showIssueItem}
        >
          <View>
          {
            this.renderPopupContent()
          }
          </View>
        </PopupDialog>
      </View>
    )
  }
}
