/*
Referred from Lecture Notes
*/
import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  return <p><Link to={"/users/" + params.user.id}>{params.user.name}</Link></p>;
}

export default function Users(params) {
  if(params.login.email==""){
    return <div style={{padding: "4ex"}}><Link to="/" id="notloggedin"> LogIn </Link></div>;
  }
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return <div className="col">
    <h4>Click on user to view their tasks: </h4>
    { users }
  </div>;
}
