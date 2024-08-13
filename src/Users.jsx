import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:4000/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        toast.success("User has been deleted successfully!");
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete user!");
      });
  };

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
      }}
    >
      <div className="w-75 bg-white rounded p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">User Management</h3>
          <Link to="/create" className="btn btn-primary">
            ADD +
          </Link>
        </div>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td className="text-center">
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-warning btn-sm mx-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Users;
