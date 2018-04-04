defmodule TaskTracker3Web.TaskController do
  use TaskTracker3Web, :controller

  alias TaskTracker3.Scheduler
  alias TaskTracker3.Scheduler.Task

  action_fallback TaskTracker3Web.FallbackController

  def index(conn, _params) do
    tasks = Scheduler.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    token = task_params["token"]
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400)
    if String.to_integer(task_params["user_id"]) != user_id do
      IO.inspect({:bad_match, task_params["user_id"], user_id})
      raise "Invalid user!"
    end
    with {:ok, %Task{} = task} <- Scheduler.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Scheduler.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Scheduler.get_task!(id)

    with {:ok, %Task{} = task} <- Scheduler.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Scheduler.get_task!(id)
    with {:ok, %Task{}} <- Scheduler.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
