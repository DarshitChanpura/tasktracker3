import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from '../api';

function EditForm(params){

  function submit() {
    if($("#title").val() == "" || $("#description").val() == "")
      {
        alert("Fields cannot be empty!");
        return;
      }
    if(parseInt($("#minutes").val()) < 0 || (parseInt($("#minutes").val()) % 15) != 0)
      {
        alert("Minutes should be > 0 and a multiple of 15");
        return;
      }

    let data={
      id: params.task[0].id,
      task: {
        user_id: $("#user_id").val(),
        title: $("#title").val(),
        description: $("#description").val(),
        minutes: parseInt($("#minutes").val()),
        completed: $("#completed1").is(':checked') ? 'true' : 'false',
      }
    }

    api.update_task(data);

    document.getElementById('tasklistlink').click();
  }

  let task = params.task[0];
  if(params.is_checked.is_checked == null){
    params.dispatch({
      type: 'INITIAL_VALUE',
      is_checked: {
        is_checked: task.completed
      }
    });
  }


  function toggleCheckbox(event) {
      //event.preventDefault();
      params.dispatch({
        type: 'CHECK_TOGGLED',
        is_checked: {
          is_checked: event.target.checked
        }
      });

  }
  let user = <option key={task.user.id} value={task.user.id}>{task.user.name}</option>;

  return(<div style={{padding: "4ex"}}>
          <h2>Edit Task</h2>
          <FormGroup>
            <Label for="user_id">User</Label>
            <Input type="select" id="user_id" name="user_id" defaultValue={task.user.id}>
              { user }
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" id="title" name="title" defaultValue={task.title}/>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" id="description" name="description" defaultValue={task.description}/>
          </FormGroup>
          <FormGroup>
            <Label for="minutes">Minutes Spent</Label>
            <Input type="number" step="15" min="0" id="minutes" name="minutes" defaultValue={task.minutes}/>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" id="completed1" name="completed1"
                     checked={params.is_checked.is_checked == null ? task.completed : params.is_checked.is_checked}
                     onChange={toggleCheckbox}/>
              {' '}Completed
            </Label>
          </FormGroup>
          <br/>
          <Button onClick={submit} color="primary">Update Task</Button> &nbsp;
            <Link to="/tasklist" id="tasklistlink">Back</Link>

        </div>);
}
function state2props(state) {
  return { is_checked: state.is_checked};
}

export default connect(state2props)(EditForm);
