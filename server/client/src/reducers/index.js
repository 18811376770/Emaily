import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
export default combineReducers({
  form:reduxForm,
  auth:authReducer,
  surveys:surveysReducer
});
