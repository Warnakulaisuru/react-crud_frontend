import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [nic, setNIC] = useState("");
  const [nicType, setNicType] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if age is a negative number
    if (age < 0) {
      toast.error("Age cannot be a negative number!");
      return;
    }

    // Validate NIC based on selected NIC type
    if (nicType === "V" || nicType === "X") {
      if (nic.length !== 9) {
        toast.error("NIC must be 9 characters long when using V or X!");
        return;
      }
    } else if (nic.length !== 12) {
      toast.error("NIC must be 12 characters long!");
      return;
    }

    // Check for existing user by NIC or email
    axios
      .post("http://localhost:4000/checkUser", {
        email,
        nic: nic + nicType,
      })
      .then((response) => {
        if (response.data.exists) {
          toast.error("User with this NIC or email already exists!");
        } else {
          // Proceed with user creation
          axios
            .post("http://localhost:4000/createUser", {
              name,
              email,
              age,
              nic: nic + nicType, // Combine NIC number with NIC type
              gender,
              department,
            })
            .then((result) => {
              console.log(result);
              toast.success("Data has been added successfully!");
              setTimeout(() => navigate("/"), 2000); // Wait for 2 seconds before navigating
            })
            .catch((err) => {
              console.log(err);
              toast.error("Failed to add data!");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to check existing user!");
      });
  };

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg, #a1c4fd 20%, #c2e9fb 50%, #ffffff 70%)",
      }}
    >
      <div className="w-50 bg-white rounded p-4 shadow">
        <h2 className="text-center mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nic" className="form-label">
              NIC
            </label>
            <input
              type="text"
              id="nic"
              placeholder="Enter NIC"
              className="form-control"
              value={nic}
              onChange={(e) => setNIC(e.target.value)}
              required
            />
            <div className="mt-2">
              <label className="form-check-label me-2">NIC Type:</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="nicType"
                  id="nicTypeV"
                  value="V"
                  onChange={(e) => setNicType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="nicTypeV">
                  V
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="nicType"
                  id="nicTypeX"
                  value="X"
                  onChange={(e) => setNicType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="nicTypeX">
                  X
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="nicType"
                  id="nicTypeNone"
                  value=""
                  onChange={(e) => setNicType(e.target.value)}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="nicTypeNone">
                  None
                </label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="department">Department</label>
            <select
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Account">Account</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CreateUsers;
