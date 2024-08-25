import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
        setTimeout(() => navigate("/"), 2000); // Wait for 2 seconds before navigating
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete user!");
      });
  };

  return (
    <div
      className="d-flex flex-column vh-100 align-items-center"
      style={{
        background:
          "linear-gradient(135deg, #a1c4fd 20%, #c2e9fb 50%, #ffffff 70%)",
      }}
    >
      <div className="d-flex flex-column align-items-center pt-5">
        <h1 className="title mb-4">Delete User</h1>
      </div>
      <div className="w-75 bg-white rounded p-4 shadow mt-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* You can add a button or any other element here if needed */}
        </div>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>NIC</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.nic}</td>
                <td>{user.gender}</td>
                <td>{user.department}</td>
                <td className="text-center">
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
