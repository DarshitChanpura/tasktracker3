/*
Referred from Lecture Notes
*/
import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LogIn from './login';
import Register from './register';
import Nav from './nav';
import TaskForm from './taskform';
import EditForm from './editform';
import TaskList from './tasklist';
import Users from './users';

export default function taskTracker3_init(store){
  ReactDOM.render(
    <Provider store={store}>
      <TaskTracker />
    </Provider>,
    document.getElementById('root')
  );
}

let TaskTracker = connect((state) => state)((props) => {
    return <Router>
              <div>
                <Nav props={props}/>
                <Route path="/" exact={true} render={() =>
                    <LogIn />
                } />
              <Route path="/register" exact={true} render={() =>
                    <Register />
                } />
                <Route path="/tasklist" exact={true} render={() =>
                  <div>
                    <TaskForm users={props.users} />
                    <TaskList tasks={props.tasks} />
                  </div>
                } />
                <Route path="/users" exact={true} render={() =>
                  <Users users={props.users} />
                } />
                <Route path="/users/:user_id" render={({match}) =>
                  <TaskList tasks={_.filter(props.tasks, (pp) => {
                      if(pp.user){
                        return match.params.user_id == pp.user.id;
                      }else{
                        return false;}
                    }
                  )} />
                } />
              <Route path="/tasks/:task_id" render={({match}) =>
                  <EditForm task={_.filter(props.tasks, (pp) => {
                      if(pp){
                        return match.params.task_id == pp.id;
                      }else{
                        return false;}
                    }
                  )} />
                } />
            </div>
          </Router>;

});
