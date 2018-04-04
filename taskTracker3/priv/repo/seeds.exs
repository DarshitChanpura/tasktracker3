defmodule Seeds do
  alias TaskTracker3.Repo
  alias TaskTracker3.Accounts.User
  alias TaskTracker3.Scheduler.Task

  def run do

    p = Comeonin.Argon2.hashpwsalt("password1");

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "a@a.com", password_hash: p})
    b = Repo.insert!(%User{ name: "bob", email: "b@b.com", password_hash: p})
    c = Repo.insert!(%User{ name: "carol", email: "c@c.com", password_hash: p})
    d = Repo.insert!(%User{ name: "dave", email: "d@d.com", password_hash: p})

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, title: "T1", description: "alice's task", completed: false, minutes: 15})
    Repo.insert!(%Task{ user_id: b.id, title: "T2", description: "bob's task", completed: false, minutes: 0})
    Repo.insert!(%Task{ user_id: c.id, title: "T3", description: "carol's task", completed: false, minutes: 30})
    Repo.insert!(%Task{ user_id: d.id, title: "T4", description: "dave's task", completed: false, minutes: 45})

  end
end

Seeds.run
