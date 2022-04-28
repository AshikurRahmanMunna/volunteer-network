import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Header from "./Pages/Shared/Header/Header";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/Shared/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login/Login";
import AddService from "./Pages/AddService/AddService";
import RequireAuth from "./Pages/Shared/RequireAuth/RequireAuth";
import YourServices from "./Pages/YourServices/YourServices";
import UpdateService from "./Pages/UpdateService/UpdateService";
import AdminRegister from "./Pages/AdminRegister/AdminRegister";
import RequireAdmin from "./Pages/Shared/RequireAdmin/RequireAdmin";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/services/add"
          element={
            <RequireAuth>
              <AddService></AddService>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/services"
          element={
            <RequireAuth>
              <YourServices></YourServices>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/services/update/:serviceId"
          element={
            <RequireAuth>
              <UpdateService></UpdateService>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/register/admin"
          element={
            <RequireAuth>
              <AdminRegister></AdminRegister>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/admin/volunteers"
          element={
            <RequireAuth>
              <RequireAdmin>
                
              </RequireAdmin>
            </RequireAuth>
          }
        ></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
