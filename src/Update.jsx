import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Update() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {/* Search Input */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, NIC, or department"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Emp No</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Age</th>
              <th className="text-center">NIC</th>
              <th className="text-center">Gender</th>
              <th className="text-center">Department</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td className="text-center">{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">{user.age}</td>
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
