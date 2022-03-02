import * as React from "react";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { register } from "../actions/auth";

//Materail Design
import Card from "@mui/material/Card";

//Npm
import { toast } from "react-toastify";

const Register = () => {
  const [studentCard, setStudentCard] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        studentCard,
        password,
        email,
        name,
        lastname,
        mobile,
      });
      console.log("REGISTER USER ===> ", res);
      toast.success("ลงทะเบียนสำเร็จแล้ว");
      navigate("/login");
    } catch (err) {
      console.log(`Error : `, err);
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  return (
    <>
      <Card
        className="box"
        sx={{
          maxWidth: 450,
          marginTop: 7,
        }}
      >
        <RegisterForm
          handleSubmit={handleSubmit}
          studentCard={studentCard}
          setStudentCard={setStudentCard}
          name={name}
          setName={setName}
          lastname={lastname}
          setLastname={setLastname}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
          mobile={mobile}
          setMobile={setMobile}
        />
      </Card>
    </>
  );
};

export default Register;
