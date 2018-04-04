/*
Referred from Lecture Notes
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from '../api';

function TaskForm(params) {

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
    //console.log(action);
    params.dispatch(action);
  }

  function submit() {
    //console.log("Should create a task.");
    //console.log(params.form);
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
                <Input type="checkbox" name="completed" checked={params.form.completed} onChange={update}/>
                {' '}Completed
              </Label>
            </FormGroup>
            <br/>
            <Button onClick={submit} color="primary">Assign Task</Button> &nbsp;
            <Button onClick={clear}>Clear Form</Button>
          </div>);
}

//transforms state into a property to be used by this component
function state2props(state) {
  console.log("rerender", state);
  return { form: state.form };
}

export default connect(state2props)(TaskForm);
