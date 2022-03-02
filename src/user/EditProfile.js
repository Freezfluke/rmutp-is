import * as React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import "../components/CreatePetition.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import moment from "moment";

import { useSelector } from "react-redux";
import { read, updateUser } from "../actions/auth";
import { allClassRoom } from "../actions/classRooms";
import UserProfileForm from "../components/UserProfileForm";

const EditProfile = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const { user } = auth;
  //state

  const [allClass, setAllClass] = useState([]);
  const [values, setValues] = useState({
    name: "",
    studentCard: "",
    password: "",
    lastname: "",
    email: "",
    mobile: "",
    prefix: "",
    status: "",
    position: "",
    role: "",
    classRoom: "",
  });

  const [prwview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const [previewSignature, setPreviewSignature] = useState(
    "https://track.thailandpost.co.th/img/No_signature.cdf1fd67.png"
  );
  // destructuring varaiables from state
  var {
    name,
    studentCard,
    lastname,
    password,
    email,
    mobile,
    prefix,
    status,
    position,
    role,
    classRoom,
  } = values;

  const [image, setImage] = useState("");
  const [teacherSignature, setTeacherSignature] = useState("");

  useEffect(() => {
    // console.log(match.params.petitionId);
    loadAllPetitions();
    loadAllClassRoom();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loadAllClassRoom = async () => {
    let res = await allClassRoom();
    console.log("res", res.data);
    setAllClass(res.data);
  };

  const loadAllPetitions = async () => {
    console.log("user", user._id);
    let res = await read(user._id);
    console.log(res);
    // console.log("res", res);

    setValues({
      ...values,
      ...res.data,
    });
    // const jsonClassRoom = JSON.parse(classRoom);
    console.log(classRoom);
    console.log("values", values);
    if (!res.data.teacherSignature) {
      setPreviewSignature(
        "https://track.thailandpost.co.th/img/No_signature.cdf1fd67.png"
      );
    } else {
      setPreviewSignature(
        `${process.env.REACT_APP_API}/user/teacherSignature/${res.data._id}`
      );
    }

    setPreview(`${process.env.REACT_APP_API}/user/userImage/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var jsonClassRoom = JSON.stringify(classRoom);
    let userData = new FormData();
    userData.append("name", name);
    userData.append("studentCard", studentCard);
    userData.append("password", password);
    teacherSignature && userData.append("teacherSignature", teacherSignature);
    image && userData.append("image", image);
    userData.append("lastname", lastname);
    userData.append("email", email);
    userData.append("mobile", mobile);
    userData.append("prefix", prefix);
    userData.append("status", status);
    userData.append("position", position);
    userData.append("role", role);
    userData.append("classRoom", jsonClassRoom);

    console.log([...userData]);

    try {
      let res = await updateUser(token, userData, user._id);
      console.log("Update User", res);
      toast.success(`แบบคำร้องนี้ ${res.data.name} ถูกอัพเดตเรียบร้อยแล้ว`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleSignatureChange = (e) => {
    // console.log(e.target.files[0]);
    setPreviewSignature(URL.createObjectURL(e.target.files[0]));
    setTeacherSignature(e.target.files[0]);
  };

  const handleChangeSelect = async (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <UserProfileForm
        user={user}
        handleSignatureChange={handleSignatureChange}
        password={password}
        values={values}
        setValues={setValues}
        handleChangeSelect={handleChangeSelect}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        prwview={prwview}
        setPreview={setPreview}
        handleChange={handleChange}
        setPreviewSignature={setPreviewSignature}
        previewSignature={previewSignature}
        teacherSignature={teacherSignature}
        setTeacherSignature={setTeacherSignature}
        setAllClass={setAllClass}
        allClass={allClass}
      />
    </div>
  );
};

export default EditProfile;
