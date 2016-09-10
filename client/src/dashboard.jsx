import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import ConfigForm from './configForm.jsx';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = { configs: [] };
    this.handleConfigFormSubmit = this.handleConfigFormSubmit.bind(this);
  }

  componentWillMount() {
    // make ajax call to get list of saved configs
    // assume user is authenicated for now
    var getUrl = '/configlist';        
    $.get(getUrl)
      .then((data) => {
        this.setState({ configs: data });
      })
      .catch((err) => { console.log('err', err); });

  }

  setDashboardState(newStateObj) {
    this.setState(newStateObj);
  }

  handleConfigFormSubmit(e) {
    e.preventDefault();

    // extract data to be submitted
    var entry = e.target.elements[0].value.trim();
    var output = e.target.elements[1].value.trim();
    var test = e.target.elements[2].value.trim();
    var loader = e.target.elements[3].value.trim();
    var exclude = e.target.elements[4].value.trim();
    var presets = e.target.elements[5].value.trim();

    // TODO: add form validation checks

    var newConfig = {entry: entry, output: output, test: test, loader: loader, exclude: exclude, presets: presets};

    // make ajax post call to create new config file for user
    var postUrl = '/createconfig';
    $.post(postUrl, newConfig)
      .then((data)=> {
        // update state of dashboard
        var currStateConfigs = this.state.configs;
        currStateConfigs.push(data);
        this.setDashboardState(currStateConfigs);
        
        // redirect
        this.props.history.push('/dashboard');
      })
      .catch((err) => {console.log('err', err)});
  }

  render() {

    // Note: {childrenWithMoreProps} is a placeholder container, similar to ng-view, for displaying the content of different children routes
    
    var childrenWithMoreProps = React.Children.map(this.props.children, (child) => {
      if(child.type === ConfigForm) {
        return React.cloneElement(child, {
          handleConfigFormSubmit: this.handleConfigFormSubmit
        });
      } else {
        return child;
      }
    });

    return(
      <div>
        <h2>Dashboard</h2>
        <p>My Config Files</p>
        <ul>
        {this.state.configs.map((config, index) => {
          var href = "/dashboard/configDetail/" + config._id;
          return <li key={index}><Link to={href}>Config # {config._id}</Link></li>;
        })}
        </ul>

        <Link to="/dashboard/configForm">Add a Config File</Link>

        {childrenWithMoreProps}
      </div>
    );
  }
}

export default Dashboard;