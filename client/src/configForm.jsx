import React, { Component } from 'react';

class ConfigForm extends Component {
  render() {
    return(
      <div>
        <h3>Config Form</h3>
        <form className="configForm" onSubmit={this.props.handleConfigFormSubmit}>
          <input type="text" name="entry" placeholder="entry" />
          <input type="text" name="output" placeholder="output" />
          <input type="text" name="test" placeholder="test" />
          <input type="text" name="loader" placeholder="loader" />
          <input type="text" name="exclude" placeholder="exclude" />
          <input type="text" name="presets" placeholder="presets" />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default ConfigForm;