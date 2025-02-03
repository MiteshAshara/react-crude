import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:8081/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8081/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchUsers())
      .catch((err) => console.log(err));
  };

  const handleEdit = (user) => {
    setEditUser(user.id);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8081/users/${editUser}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        fetchUsers();
        setEditUser(null);
        setFormData({ first_name: "", last_name: "", email: "" });
      })
      .catch((err) => console.log(err));
  };

  const handleAddUser = () => {
    fetch("http://localhost:8081/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        fetchUsers();
        setFormData({ first_name: "", last_name: "", email: "" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-3">
      <h3 className="text-center">CRUD Operation in React.js</h3>
      <div className="mt-4">
        <h5>Add New User</h5>
        <div className="card p-3">
          <div className="mb-2">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-dark mt-2" onClick={handleAddUser}>
            Add User
          </button>
        </div>
      </div>

      <div className="mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-dark btn-sm me-2" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button className="btn btn-dark btn-sm" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editUser && (
        <div className="mt-4">
          <h5>Edit User</h5>
          <div className="card p-3">
            <div className="mb-2">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-dark mt-2" onClick={handleUpdate}>
              Update User
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
