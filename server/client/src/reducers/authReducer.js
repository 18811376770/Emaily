import {FETCH_USER} from '../actions/types';
export default function (state = null, action) {
  switch(action.type){
    case FETCH_USER:
      //if user is log out, payload is null, return false;
      return action.payload || false;
    default:
      return state;
  }
}
