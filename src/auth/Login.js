import * as React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/auth";
import { useDispatch } from "react-redux";
//Materail Design
import Card from "@mui/material/Card";

//Npm
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      let res = await login({
        email,
        password,
      });
      if (res.data) {
        // console.log(res.data);
        // Save user และ โทเค็น ส่งให้กับ local Storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        // Save User และ โทเค็น ส่งให้กับ  redux
        setTimeout(() => {
          toast.success(`เข้าสู่ระบบเรียบร้อยแล้ว`);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: res.data,
          });
          navigate("/home");
        }, 100);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        toast.error(err.response.data);
        setOpen(false);
      }
    }
  };
  return (
    <>
      <Card
        className="box"
        sx={{
          maxWidth: 450,
          marginTop: 20,
        }}
      >
        <LoginForm
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          open={open}
          setOpen={setOpen}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          แนะนำการใช้งานขนาดหน้าจอ 1366 x 768 ขึ้นไป
        </div>
      </Card>
    </>
  );
};

export default Login;
