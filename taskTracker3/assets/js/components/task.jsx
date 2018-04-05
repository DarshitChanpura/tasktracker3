/*
Referred from Lecture Notes
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardBody, Button } from 'reactstrap';
import api from '../api';

export default function Task(params) {

  function deleteTask(ev,taskId){
    var p = confirm("Are you sure? If yes, press OK");
    if(p){
      api.delete_task(taskId);
    }
  }
  let task = params.task;

  let show_edit_link;
  let show_delete_button;
  if(params.currentUserId == task.user.id)
  {
    show_edit_link = <Link to={"/tasks/" + task.id}>Edit</Link>;
    show_delete_button = <Button onClick={(e) => deleteTask(e, task.id)}>Delete</Button>;
  }

  return(<Card>
          <CardBody>
            <CardTitle>Task for: <b>{ task.user.name }</b></CardTitle>
            <div>
              <p><i>Title</i>: { task.title }</p>
              <p><i>Description</i>: { task.description }</p>
              <p><i>Minutes Spent</i>: { task.minutes }</p>
              <p><i>Completed</i>: { String(task.completed) }</p>
            </div>

              {show_edit_link}
              &emsp;
              {show_delete_button}

          </CardBody>
        </Card>);
}
