import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "../Users";
import CreateUsers from "../CreateUsers";
import UpdateUsers from "../UpdateUsers";
import Update from "../Update";
import Delete from "../Delete";

const Router = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUsers />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/update/:id" element={<UpdateUsers />} />
        </Routes>
    </div>
  )
}

export default Router;
