import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../components/auth/login'
import AdminNavigator from './admin';
// import EmployeeNavigator from './employee';

const AppNavigator = createStackNavigator({
  Admin:  AdminNavigator,
    Login: { screen: LoginScreen },

    // Employee: { screen: EmployeeNavigator}
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

export default AppNavigator; 