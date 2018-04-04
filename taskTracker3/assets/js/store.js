/*
Referred from Lecture Notes
*/
import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 *  state layout:
 *  {
 *   tasks: [... Tasks ...],
 *   users: [... Users ...],
 *   form: {
 *     user_id: "",
 *     title: "",
 *     description: "",
 *     minutes: 0,
 *     completed: false,
 *     token: ""
 *   },
 *   token:{
 *     user_id: Number,
 *     user_name: String,
 *     token: string
 *   },
 *   login: {
 *     email: string,
 *     pass: string
 *   }
 * }
 *
 * */
function token(state = null, action) {
   switch (action.type) {
     case 'SET_TOKEN':
       return action.token;
     default:
       return state;
   }
}

 let empty_login = {
   email: "",
   pass: "",
 };

function login(state = empty_login, action) {
   switch (action.type) {
     case 'UPDATE_LOGIN_FORM':
       return Object.assign({}, state, action.data);
     default:
       return state;
   }
}

function tasks(state = [], action) {
  switch (action.type) {
    case 'LIST_TASKS':
      return [...action.tasks];
    case 'UPDATE_TASK':
        let st = state.filter(task => task.id !== action.task.id);
        console.log(st);
        return [action.task, ...st];
    case 'DELETE_TASK':
        return state.filter(task => task.id !== action.id);
    case 'ADD_TASK':
      return [action.task, ...state];
    default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'LIST_USERS':
      return [...action.users];
    default:
      return state;
  }
}

let empty_form = {
  user_id: "",
  title: "",
  description: "",
  minutes: 0,
  completed: false,
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return Object.assign({}, state, empty_form);;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token.token);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  //console.log("reducer", action);
  let reducer = combineReducers({tasks, users, form, token, login});
  let state1 = reducer(state0, action);
  //console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
