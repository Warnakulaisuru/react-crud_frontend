import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function UpdateUsers() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [nic, setNIC] = useState("");
  const [nicType, setNicType] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/getUser/" + id)
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        setNIC(result.data.nic.replace(/[VX]$/, "")); // Extract NIC number
        setNicType(result.data.nicType);
        setGender(result.data.gender);
        setDepartment(result.data.department);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^A-Za-z\s'-]/g, ""); // Remove non-alphabetic characters
    if (filteredValue.length <= 30) {
      setName(filteredValue);
      }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (filteredValue.length <= 2) {
      setAge(filteredValue);
    }
  };

  const handleNICChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (filteredValue.length <= 12) {
      setNIC(filteredValue);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate age
    if (age < 0) {
      toast.error("Age cannot be a negative number!");
      return;
    }

    // Validate NIC
    if (nicType === "V" || nicType === "X") {
      if (nic.length !== 9) {
        toast.error("NIC must be 9 characters long when using V or X!");
        return;
      }
    } else if (nic.length !== 12) {
      toast.error("NIC must be 12 characters long!");
      return;
    }

    axios
      .put("http://localhost:4000/updateUser/" + id, {
        name,
        email,
        age,
        nic: nic + nicType, // Combine NIC number with NIC type
        gender,
        department,
      })
      .then((result) => {
        console.log(result);
        toast.success("User has been updated successfully!");
        setTimeout(() => navigate("/"), 2000); // Wait for 2 seconds before navigating
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update user!");
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
        <h2 className="text-center mb-4">Update User</h2>
        <form onSubmit={handleUpdate}>
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
              onChange={handleNameChange}
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
              type="text" // Changed from "number" to "text" to allow custom input handling
              id="age"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={handleAgeChange}
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
              onChange={handleNICChange}
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
                  checked={nicType === "V"}
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
                  checked={nicType === "X"}
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
                  checked={nicType === ""}
                />
                <label className="form-check-label" htmlFor="nicTypeNone">
                  None
                </label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-control"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              className="form-control"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="IT">IT</option>
              <option value="Account">Account</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Update
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UpdateUsers;
