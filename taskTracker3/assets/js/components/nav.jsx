/*
Referred from Lecture Notes
*/
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import api from '../api';

let Session = connect(({token}) => {return {token};})((props) => {
  return <div className="navbar-text">
    Welcome, { props.token.user_name }
  </div>;
});

function Nav(props) {
  let session_info="";
  if (props.token) {
    session_info = <nav className="navbar navbar-dark bg-dark navbar-expand">
                      <span className="navbar-brand">
                        TaskTracker 3.0
                      </span>
                      <ul className="navbar-nav mr-auto">
                        <NavItem>
                          <NavLink to="/tasklist" exact={true} activeClassName="active" className="nav-link">TaskList</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink to="/users" exact={true} activeClassName="active" className="nav-link">All Users</NavLink>
                        </NavItem>
                      </ul>
                      <Session token={props.token} />;
                    </nav>
  }

  return (
    <div className="container">
      { session_info }
      </div>
  );
}

function state2props(state) {
  return { token: state.token,};
}

export default connect(state2props)(Nav);
