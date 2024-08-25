import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Update() {
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
        <h1 className="title">Update User</h1>
      </div>
      <div className="w-75 bg-white rounded p-4 shadow mt-3">
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
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-warning btn-sm mx-1"
                  >
                    Update
                  </Link>
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

export default Update;
