defmodule TaskTracker3.SchedulerTest do
  use TaskTracker3.DataCase

  alias TaskTracker3.Scheduler

  describe "tasks" do
    alias TaskTracker3.Scheduler.Task

    @valid_attrs %{completed: "some completed", description: "some description", minutes: "some minutes", title: "some title"}
    @update_attrs %{completed: "some updated completed", description: "some updated description", minutes: "some updated minutes", title: "some updated title"}
    @invalid_attrs %{completed: nil, description: nil, minutes: nil, title: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Scheduler.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Scheduler.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Scheduler.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Scheduler.create_task(@valid_attrs)
      assert task.completed == "some completed"
      assert task.description == "some description"
      assert task.minutes == "some minutes"
      assert task.title == "some title"
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Scheduler.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, task} = Scheduler.update_task(task, @update_attrs)
      assert %Task{} = task
      assert task.completed == "some updated completed"
      assert task.description == "some updated description"
      assert task.minutes == "some updated minutes"
      assert task.title == "some updated title"
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Scheduler.update_task(task, @invalid_attrs)
      assert task == Scheduler.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Scheduler.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Scheduler.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Scheduler.change_task(task)
    end
  end

  describe "tasks" do
    alias TaskTracker3.Scheduler.Task

    @valid_attrs %{completed: true, description: "some description", minutes: 42, title: "some title"}
    @update_attrs %{completed: false, description: "some updated description", minutes: 43, title: "some updated title"}
    @invalid_attrs %{completed: nil, description: nil, minutes: nil, title: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Scheduler.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Scheduler.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Scheduler.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Scheduler.create_task(@valid_attrs)
      assert task.completed == true
      assert task.description == "some description"
      assert task.minutes == 42
      assert task.title == "some title"
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Scheduler.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, task} = Scheduler.update_task(task, @update_attrs)
      assert %Task{} = task
      assert task.completed == false
      assert task.description == "some updated description"
      assert task.minutes == 43
      assert task.title == "some updated title"
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Scheduler.update_task(task, @invalid_attrs)
      assert task == Scheduler.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Scheduler.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Scheduler.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Scheduler.change_task(task)
    end
  end
end
