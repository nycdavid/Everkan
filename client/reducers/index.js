import { combineReducers } from 'redux';
import modals from './modals';
import lists from './lists';

const rootReducer = combineReducers({
  modals,
  lists,
});

export default rootReducer;
