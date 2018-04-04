defmodule TaskTracker3Web.TokenController do
  use TaskTracker3Web, :controller
  alias TaskTracker3.Accounts.User

  action_fallback TaskTracker3Web.FallbackController

  def create(conn, %{"email" => email, "pass" => pass})  do
    with {:ok, %User{} = user} <- TaskTracker3.Accounts.get_and_auth_user(email, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
