/*
Referred from Lecture Notes
*/
import React from 'react';
import Task from './task';

export default function TaskList(params) {
  let tasks = _.map(params.tasks, (pp) => <Task key={pp.id} task={pp} />);
  return <div>
    { tasks }
  </div>;
}
