import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
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

  return (
    <div
      className="vh-100 d-flex flex-column align-items-center"
      style={{
        background:
          "linear-gradient(135deg, #a1c4fd 20%, #c2e9fb 50%, #ffffff 70%)",
      }}
    >
      <div className="d-flex flex-column align-items-center pt-5">
        <h1 className="title">User Management System</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 mt-3">
        <div className="w-75 bg-white rounded p-4 shadow">
          <table className="table table-hover table-bordered ">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>NIC</th>
                <th>Gender</th>
                <th>Department</th>
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
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Users;
