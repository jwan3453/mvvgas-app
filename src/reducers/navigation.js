import AppNavigator from '../navigators/app';
import { NavigationActions } from 'react-navigation';


const initialNavState = AppNavigator.router.getStateForAction(NavigationActions.init());
const navigation = (state = initialNavState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
}

export default navigation;