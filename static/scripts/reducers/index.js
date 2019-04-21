/*
* Combine reducers: https://redux.js.org/api/combinereducers
* easy to add additional storage in the future
*/

import { combineReducers } from 'redux';
import lists from './lists';

// storage of all the name of dataset
export default combineReducers({
  lists,
});
