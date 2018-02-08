//responsible for view level setup
import React, {Component} from 'react';
import  {BrowserRouter, Route} from 'react-router-dom';
import Header from "./Header";
import  {connect} from 'react-redux';
import * as actions from '../actions'
import Landing from './Landing';
const SurveyNew=()=><h2>SurveyNew</h2>;
const Dashboard=()=><h2>Dashboard</h2>;
class App extends Component{
  componentDidMount(){
    this.props.fetchUser();
  }
  render(){
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing}/>
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/survey/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};
export default connect(null,actions)(App);
