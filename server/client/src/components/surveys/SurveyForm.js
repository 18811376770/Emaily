//shows user form to input
import React,{Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component{
  renderField(){
    return _.map(formFields, ({label,name}) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
    });
  }
    //<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
    //why no ()after onSurveySubmit? We do not want to execute it once js interpret it.
  render(){
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderField()}
          <Link to="/surveys" className="red btn-flat white-text">
          Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
          Next
          <i className="material-icons right">done</i>
          </button>

        </form>
      </div>
    );
  }
}
//values is object contains all information inside our form
function validate(values){
  const errors ={};
  errors.recipients = validateEmails(values.recipients || "");
  //Error.name match up with field, pass error as a props inside field
  _.each(formFields, ({name})=> {
    //cannot use value.name, because it refers to property called name
    if(!values[name]){
      errors[name] = 'You must provide a value';
    }
  });
  //once errors is empty, redux form assumes there are no errors inside the input
  return errors;
}
//this.props.handleSubmit is provided by reduxForm
export default reduxForm({
  validate,
  form:'surveyForm',
  destroyOnUnmount:false
})(SurveyForm);
