import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../components/auth/login'
import EmployeeScreen from '../components/employee';
import AdminNavigator from './admin';
// import EmployeeNavigator from './employee';

const AppNavigator = createStackNavigator({
 
    Login: { screen: LoginScreen },
    Admin:  AdminNavigator,
    Employee: EmployeeScreen,
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

export default AppNavigator; 