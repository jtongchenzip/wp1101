import { combineReducers } from 'redux';
import user from './user';
import problem from './problem';
import submission from './submission';

export default combineReducers({
  user,
  problem,
  submission,
});
