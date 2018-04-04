defmodule TaskTracker3.Scheduler.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :minutes, :integer
    field :title, :string
    belongs_to :user, TaskTracker3.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :minutes, :user_id])
    |> validate_required([:title, :description, :completed, :minutes, :user_id])
    |> validate_change(:minutes, fn :minutes, minute ->
          if rem(minute, 15) != 0 do
              [minutes: "should be multiple of 15"]
          else
              []
          end
        end)
  end
end
