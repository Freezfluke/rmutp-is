// เพิ่มหน้าเหล่านั้น ใน app.js
// จากนั้นตามเส้นทางที่แสดงแต่ละส่วนประกอบโดยใช้ส่วนประกอบ react-router
import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./fragments/Header";
import Menu from "./fragments/Menu";
//Component
import Home from "./management/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./user/Dashboard";
import Petition from "./user/Petition";

//Security Route
import PrivateRoute from "./fragments/PrivateRoute";
import LoginRoute from "./fragments/LoginRoute";

//npm
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Materail
import { Container } from "@mui/material";
import DetailPetition from "./user/DetailPetition";
import UsersList from "./user/UsersList";
import ClassRoomList from "./user/ClassRoomList";
import UserEdit from "./user/UserEdit";
import ClassRoomEdit from "./user/ClassRoomEdit";
import EditProfile from "./user/EditProfile";
import EditPassword from "./user/EditPassword";
//

function App() {
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const { auth } = useSelector((state) => ({ ...state }));

  console.log("auth :", JSON.stringify(auth));

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <BrowserRouter>
      {auth !== null && (
        <Menu open={openDrawer} handleDrawerClose={handleDrawerClose} />
      )}
      {auth !== null && (
        <Header handleDrawerOpen={handleDrawerOpen} open={openDrawer} />
      )}
      <ToastContainer
        position="top-center"
        theme="colored"
        style={{ width: "350px", textAlign: "center", fontSize: "18px" }}
      />
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Routes>
          <Route exact path="/" element={<PrivateRoute auth={auth} />}>
            <Route excat path="/home" element={<Home open={openDrawer} />} />
            <Route exact path="/users" element={<UsersList />} />
            <Route exact path="/classrooms" element={<ClassRoomList />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/petition" element={<Petition />} />
            <Route
              exact
              path="/users/editprofile/:userId"
              element={<EditProfile />}
            />
            <Route
              exact
              path="/users/edit/password/:userId"
              element={<EditPassword />}
            />
            <Route
              exact
              path="/petition/edit/:petitionId"
              element={<DetailPetition />}
            />
            <Route
              exact
              path="/classrooms/edit/:classRoomId"
              element={<ClassRoomEdit />}
            />

            <Route exact path="/users/edit/:userId" element={<UserEdit />} />
          </Route>
          <Route exact path="/login" element={<LoginRoute auth={auth} />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route exact={true} path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
