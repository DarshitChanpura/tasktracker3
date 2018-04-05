/*
Referred from Lecture Notes
*/

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import TaskList from './tasklist';
import api from '../api';

function TaskForm(params) {


  if(params.login.email == ""){
    return <div style={{padding: "4ex"}}><Link to="/" id="notloggedin"> LogIn </Link></div>;
  }

  function update(ev) {
    let t = $(ev.target);

    let data = {};
    if (t.attr('name') == "completed") {
      data["completed"] = $(t).is(':checked') ? 'true' : 'false';
    }
    else {
      data[t.attr('name')] = t.val();
    }
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };

    params.dispatch(action);
  }

  function submit() {
    if(params.form.user_id == "" || params.form.title == "" || params.form.description == "")
      {
        alert("Fields cannot be empty!");
        return;
      }
      if(params.form.minutes < 0 || (params.form.minutes % 15) != 0){
        alert("Minutes should be > 0 and a multiple of 15");
        return;
      }

    api.submit_task(params.form)
  }

  function clear() {
    params.dispatch({ type: 'CLEAR_FORM' });
  }


  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return( <div style={{padding: "4ex"}}>
            <h2>New Task</h2>
            <FormGroup>
              <Label for="user_id">User</Label>
              <Input type="select" name="user_id" value={params.form.user_id} onChange={update}>
                <option></option>
                { users }
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" value={params.form.title} onChange={update}/>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" value={params.form.description} onChange={update}/>
            </FormGroup>
            <FormGroup>
              <Label for="minutes">Minutes Spent</Label>
              <Input type="number" step="15" min="0" name="minutes" value={params.form.minutes} onChange={update}/>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="completed" checked={params.form.completed == 'true'} onChange={update}/>
                {' '}Completed
              </Label>
            </FormGroup>
            <br/>
            <Button onClick={submit} color="primary">Assign Task</Button> &nbsp;
            <Button onClick={clear}>Clear Form</Button>
            <br/><br/><br/>
            <TaskList tasks={params.tasks} currentUserId={params.token.user_id}/>
          </div>);
}

//transforms state into a property to be used by this component
function state2props(state) {
  return { form: state.form,
          login: state.login,
          token: state.token};
}

export default connect(state2props)(TaskForm);
