import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,ScrollView } from 'react-native';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import storage from '../../storage';
import { API_ROOT } from '../../constans/setting';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },

  popupStyle: {
    width: 400,
    height: 600,
    backgroundColor:'white',
  },
  issuePanelView: {
    height: 60,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'black'
  },
  panelHeaderText: {
    fontSize: 24,
  },
  issueItemScrollList: {
    height: 400,

  },
  issueItemView: {
    height: 50,
    width: '80%',
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
  issueItemText: {
    fontSize:20,
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
      console.warn(data);
      if(data.status === 'ok') {
        this.setState({
          issueItems:data.issueItems
        })
      }

    })
    .catch((error) => {
      this.refs.toast.show('Something went wrong, contact admin')
    });
  }

  renderPopupContent(){
    const { role, currentFeature,openIssues} = this.props;
    if(role === 'admin') {

    }else if(role === 'employee'){

    }
    let issueItemList = [];
    if(this.state.issueItems) {
      this.state.issueItems.map((issueItem)=> {
        if(issueItem.type.toLowerCase().includes('pump')) {
          issueItemList.push(
            <TouchableOpacity style={styles.issueItemView}>
              <Text style={styles.issueItemText}>
                {issueItem.name}
              </Text>
            </TouchableOpacity>
          )
        }
      })
    }


    return (
      <View>
        <View style={styles.issuePanelView}>
          <Text style={styles.panelHeaderText}>
            Reported Issues
          </Text>
        </View>
        <ScrollView style={styles.issueItemScrollList} contentContainerStyle={{alignItems:'center'}}>
        {
          issueItemList
        }
        </ScrollView>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <PopupDialog
          ref={(issueItemListDialog) => { this.issueItemListDialog = issueItemListDialog; }}
          dialogAnimation={slideAnimation}
          dialogStyle={styles.popupStyle}
          dismissOnTouchOutside={true}
          visible={this.state.showIssueItem}
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
