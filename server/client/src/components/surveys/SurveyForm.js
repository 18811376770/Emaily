//shows user form to input
import React,{Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import {Link} from 'react-router-dom';
const FIELDS = [
  {label:"Survey Title", name:"title"},
  {label:"Subject Line", name:"subject"},
  {label:"Email Body", name:"body"},
  {label:"Recipient List", name:"emails"}
]

class SurveyForm extends Component{
  renderField(){
    return _.map(FIELDS, ({label,name}) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
    });
  }
  render(){
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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
  if(!values.title){
    //Error.name match up with field, pass error as a props inside field
    errors.title = "You must provide a title";
  }
  //once errors is empty, redux form assumes there are no errors inside the input
  return errors;
}
//this.props.handleSubmit is provided by reduxForm
export default reduxForm({
  validate,
  form:'surveyForm'
})(SurveyForm);
