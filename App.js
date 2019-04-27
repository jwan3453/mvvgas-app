

import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import AppNavigator from './src/navigators/app';
import { reduxifyNavigator } from 'react-navigation-redux-helpers'
import rootReducer from './src/reducers';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { createStore, applyMiddleware } from 'redux';
import SplashScreen from 'react-native-splash-screen'
// import SplashScreen from 'react-native-splash-screen';
// import CodePush from 'react-native-code-push'

const mapStateToProps = state => ({
  state: state.navigationReducer,
})

const navigationmiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

//integrate react navigation with redux
const AppNav = reduxifyNavigator(AppNavigator, "root")
const ConnectedNavigator =  connect(mapStateToProps)(AppNav);
const store = createStore(
  rootReducer,
  applyMiddleware(navigationmiddleware),
);


 class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    SplashScreen.hide();
  }
  render() {
    // XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    // GLOBAL.originalXMLHttpRequest :
    // GLOBAL.XMLHttpRequest;

    // global._fetch = fetch;
    // global.fetch = function (uri, options, ...args) {
    //     return global._fetch(uri, options, ...args).then((response) => {
    //       console.log('Fetch', { request: { uri, options, ...args }, response });
    //       return response;
    //     });
    //   };
    return (
      <Provider store={store }>
        <ConnectedNavigator />
      </Provider>
    );
  }
}
//const codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
export default App;
