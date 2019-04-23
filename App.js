/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: 'red',
//     marginBottom: 5,
//   },
// });



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
    // SplashScreen.hide();
    // CodePush.sync(
    //   {},
    //   () => {},
    //   () => {},
    // );

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
