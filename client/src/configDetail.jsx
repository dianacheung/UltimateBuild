import React, { Component } from 'react';
import $ from 'jquery';

class ConfigDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { config: {} };
  }

  componentWillMount() {
    // make ajax call to get a specific config by id
    var getUrl = '/configbyid/' +  this.props.params.id;        
    $.get(getUrl)
      .then((data) => {
        this.setState({ config: data });
      })
      .catch((err) => { console.log('err', err); });

  }

  componentWillReceiveProps(nextProps) {
    // make ajax call to get a specific config by id
    var getUrl = '/configbyid/' +  nextProps.params.id;        
    $.get(getUrl)
      .then((data) => {
        this.setState({ config: data });
      })
      .catch((err) => { console.log('err', err); });

  }

  render() {
    return(
      <div>
        <h3>Config Detail</h3>
        <p>Config # {this.props.params.id}</p>
        <p>{JSON.stringify(this.state.config)}</p>
      </div>
    );
  }
}

export default ConfigDetail;