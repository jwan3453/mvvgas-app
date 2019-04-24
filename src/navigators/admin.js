import { createStackNavigator } from 'react-navigation';
import AdminOverViewScreen from '../components/admin/adminOverView'
import AdminLocationViewScreen from '../components/admin/adminLocationView';

// import EmployeeNavigator from './employee';

const AdminNavigator = createStackNavigator({
  AdminLocationViewScreen: { screen: AdminLocationViewScreen },
    AdminOverViewScreen: { screen: AdminOverViewScreen },
    

  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

export default AdminNavigator; 