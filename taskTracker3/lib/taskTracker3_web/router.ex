defmodule TaskTracker3Web.Router do
  use TaskTracker3Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskTracker3Web do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/tasklist", PageController, :index
    get "/users/:id", PageController, :index
    get "/tasks/:id", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", TaskTracker3Web do
    pipe_through :api

    post "/token", TokenController, :create
    put "/tasks/:id", TaskController, :update
    delete "/tasks/:id", TaskController, :delete
    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
  end
end
