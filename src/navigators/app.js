import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../components/auth/login'
import EmployeeScreen from '../components/employee';
import AdminNavigator from './admin';
import { getTransitionConfig } from '../lib/slideScreenConfig';
// import EmployeeNavigator from './employee';

const AppNavigator = createStackNavigator({
 
    Login: { screen: LoginScreen },
    Admin:  AdminNavigator,
    Employee: EmployeeScreen,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transitionConfig:getTransitionConfig 
  }
);

export default AppNavigator; 