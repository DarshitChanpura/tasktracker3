/*
Referred from Lecture Notes
*/
import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  return <p><Link to={"/users/" + params.user.id}>{params.user.name}</Link></p>;
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return <div>
    { users }
  </div>;
}
