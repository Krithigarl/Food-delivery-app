import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";

const Useradmin = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this user?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(() => {
        alert("User Deleted ✅");
        fetchUsers();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="mt-4">
      <h3>User Management</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, index) => (
            <tr key={u._id}>
              <td>{index + 1}</td>
              <td>{u.name || "N/A"}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteUser(u._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Useradmin;