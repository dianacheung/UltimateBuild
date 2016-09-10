import React, { Component } from 'react';
import { Link } from 'react-router';
import Cookie from 'react-cookie';
import $ from 'jquery';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Logout from './logout.jsx';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { ssid: Cookie.load('ssid') };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    // TODO: instead of doing auth check here, able to define a route onEnter method? 
    // https://github.com/reactjs/react-router/blob/master/examples/auth-flow/app.js

    //console.log('state ssid', this.state.ssid);
    if(this.state.ssid) { // active user
      // redirect to /dashboard
      this.props.history.push('/dashboard');
    } else { // no active user
      // redirect to /signup
      this.props.history.push('/signup');
    }
  }

  // Define the logout handling
  handleLogout() {
    // make ajax post call to server to logout user    
    var postUrl = '/logout';        
    $.post(postUrl, {})
      .then(() => {
        // HACK: needed to call setHomeState to allow updating of setState and route redirect
        this.setHomeState({ ssid: undefined }); // clear out ssid in state
        //this.props.history.push('/dashboard');
      })
      .catch((err) => {console.log('err', err)});
    
  }

  // HACK: needed to declare a separate function to setState so that can also redirect to new route
  setHomeState(newStateObj) {
    this.setState(newStateObj);
  }

  // Define event handler for onsubmit for signup and login forms
  handleFormSubmit(e) {
    e.preventDefault();

    var userName = e.target.elements[0].value.trim();
    var passWord = e.target.elements[1].value.trim();

    if(!userName || !passWord) { // validation check, both fields required
      return;
    }

    var user = {username: userName, password: passWord};
    
    var postUrl;
    if(e.target.className === 'signupForm') {
      postUrl = '/signup';
    } else {
      postUrl = '/login'
    }

    // create new user or login user by making appropriate ajax post call
    $.post(postUrl, user)
      .then((data)=> {
        // HACK: needed to call setHomeState to allow updating of setState and route redirect
        this.setHomeState({ ssid: Cookie.load('ssid') });
        this.props.history.push('/dashboard');
      })
      .catch((err) => {console.log('err', err)});
  }

  render() {
    // Note: {childrenWithMoreProps} is a placeholder container, similar to ng-view, for displaying the content of different children routes
    
    var childrenWithMoreProps = React.Children.map(this.props.children, (child) => {
      if(child.type === Signup || child.type === Login) {
        return React.cloneElement(child, {
          handleFormSubmit: this.handleFormSubmit
        });
      } else if(child.type === Logout) {
        return React.cloneElement(child, {
          handleLogout: this.handleLogout
        });
      } else {
        return child;
      }
    });

    return(
      <div>
        <h2>Home</h2>
        <ul>
          <li>
          {this.state.ssid ? (
            <Link to="/logout">Logout</Link>
          ) : (
           <Link to="/signup">Signup</Link>
          )}  
          </li>
          <li>
          {this.state.ssid ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
           <Link to="/login">Login</Link>
          )}   
          </li>
        </ul>
         {childrenWithMoreProps}
      </div>
    );
  }
}

export default Home;