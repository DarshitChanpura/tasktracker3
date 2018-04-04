import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from '../api';

export default function EditForm(params){

  function submit() {
    // alert($("#minutes").val());
    // alert($("#completed").val());
    let data={
      id: params.task[0].id,
      task: {
        user_id: $("#user_id").val(),
        title: $("#title").val(),
        description: $("#description").val(),
        minutes: parseInt($("#minutes").val()),
        completed: $("#completed").is(':checked') ? 'true' : 'false',
      }
    }

    api.update_task(data);
    //location.replace("/tasklist");
    document.getElementById('tasklistlink').click();
  }


  let task = params.task[0];
  var is_checked = task.completed;

  function toggleCheckbox(event) {
      event.preventDefault();
      alert(is_checked);
      is_checked = event.target.checked;
        $("#completed").prop("checked",is_checked);
      alert(is_checked);
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
              <Input type="checkbox" id="completed" name="completed"
                     checked={is_checked}
                     onChange={toggleCheckbox}/>
              {' '}Completed
            </Label>
          </FormGroup>
          <br/>
          <Button onClick={submit} color="primary">Update Task</Button> &nbsp;
            <Link to="/tasklist" id="tasklistlink">Back</Link>

        </div>);
}
