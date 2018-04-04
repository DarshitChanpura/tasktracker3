import store from './store';

class TheServer {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'LIST_TASKS',
          tasks: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'LIST_USERS',
          users: resp.data,
        });
      },
    });
  }

  submit_task(data) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
      },
    });
  }

  register_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ user: data }),
      success: (resp) => {
        // store.dispatch({
        //   type: 'ADD_USER',
        //   user: resp.data,
        // });
        location.replace("/");
      },
    });
  }

  update_task(data) {
    console.log(data.task);
    $.ajax("/api/v1/tasks/" + data.id, {
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ task: data.task }),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_TASK',
          task: resp.data,
        });
      },
    });
  }

  delete_task(data) {
    $.ajax("/api/v1/tasks/" + data, {
      method: "DELETE",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
          id: data,
        });
        //location.replace('/tasklist');
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      // error: (msg) => {
      //   store.dispatch({
      //     type: 'SET_LOGIN_ERROR',
      //     error: msg,
      //   });
      // }
    });
  }

}

export default new TheServer();
