import { createStackNavigator } from 'react-navigation';
import AdminOverViewScreen from '../components/admin/adminOverView'
import AdminLocationViewScreen from '../components/admin/adminLocationView';
import ClosedIssueViewScreen from '../components/admin/closedIssueView';
import { getTransitionConfig } from '../lib/slideScreenConfig';
// import EmployeeNavigator from './employee';

const AdminNavigator = createStackNavigator({

    AdminOverViewScreen: { screen: AdminOverViewScreen },
    AdminLocationViewScreen: { screen: AdminLocationViewScreen },
    ClosedIssueViewScreen: {screen:ClosedIssueViewScreen},
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transitionConfig:getTransitionConfig 
  }
);

export default AdminNavigator; 