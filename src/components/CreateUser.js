import * as React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { register } from "../actions/auth";
import { allClassRoom } from "../actions/classRooms";

//Materail Design
import Card from "@mui/material/Card";

//Npm
import { toast } from "react-toastify";
import UserCreateForm from "./UserCreateForm";

const CreateUser = (props) => {
  const [open, setOpen] = useState(props.open);
  const [allClass, setAllClass] = useState([0]);
  const [values, setValues] = useState({
    email: "",
    name: "",
    lastname: "",
    password: "",
    studentCard: "",
    mobile: "",
    role: "",
    image: "",
    teacherSignature: {
      data: "",
    },
    prefix: "",
    status: "",
    classRoom: "",
  });
  const navigate = useNavigate();

  const {
    email,
    studentCard,
    name,
    lastname,
    password,
    mobile,
    role,
    image,
    teacherSignature,
    prefix,
    status,
    newPassword,
    classRoom,
  } = values;

  const [prwview, setPreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/219/219986.png"
  );

  useEffect(() => {
    loadAllClassRoom();
  }, []);

  const loadAllClassRoom = async () => {
    let res = await allClassRoom();
    console.log("res", res.data);
    setAllClass(res.data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChangeSelect = async (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var jsonClassRoom = JSON.stringify(classRoom);
    // console.log(values);
    let userData = new FormData();
    userData.append("email", email);
    userData.append("studentCard", studentCard);
    userData.append("name", name);
    userData.append("lastname", lastname);
    image && userData.append("image", image);
    userData.append("password", password);
    userData.append("status", status);
    userData.append("mobile", mobile);
    userData.append("role", role);
    teacherSignature && userData.append("teacherSignature", teacherSignature);
    userData.append("prefix", prefix);
    userData.append("classRoom", jsonClassRoom);

    console.log([...userData]);
    try {
      let res = await register(userData);
      console.log("Create User Res", res);
      toast.success("สร้างผู้ใช้งานเรียบร้อยแล้ว");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (err) {
      if (err.response.status === 400) {
        console.log(err);
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
        <UserCreateForm
          handleSubmit={handleSubmit}
          values={values}
          setValues={setValues}
          open={props.open}
          setOpen={props.setOpen}
          handleClose={props.handleClose}
          prwview={prwview}
          setPreview={setPreview}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleChangeSelect={handleChangeSelect}
          setAllClass={setAllClass}
          allClass={allClass}
        />
      </Card>
    </>
  );
};

export default CreateUser;
