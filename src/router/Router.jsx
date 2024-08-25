import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "../Users";
import CreateUsers from "../CreateUsers";
import UpdateUsers from "../UpdateUsers";

const Router = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUsers />} />
          <Route path="/update/:id" element={<UpdateUsers />} />
        </Routes>
    </div>
  )
}

export default Router;
