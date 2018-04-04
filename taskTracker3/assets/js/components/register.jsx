import React from "react";
import { connect } from 'react-redux';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import api from '../api';

export default class Register extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    return <RegisterForm props={this.props}/>;
  }
}

function RegisterForm(props){

  function register(ev) {
    ev.preventDefault();
    let user={
        name: $("#username").val(),
        email: $("#email").val(),
        password: $("#pass").val(),
    }
    console.log(user);
    api.register_user(user);
    console.log(props);
    if(props.login)
    {

    }
    //console.log(props.login);
  }

  return(<Form >
      <FormGroup>
        <Input type="text" id="username" name="username" placeholder="Name"/>
      </FormGroup>
      <FormGroup>
        <Input type="email" id="email" name="email" placeholder="Email"/>
      </FormGroup>
      <FormGroup>
        <Input type="password" id="pass" name="pass" placeholder="Password"/>
      </FormGroup>
      <Button onClick={register}>Register</Button>

    </Form>);
}
