import * as React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "../components/CreatePetition.css";

import { useSelector } from "react-redux";
import { read, updateUserPassword } from "../actions/auth";
import UserEditPasswordForm from "../components/UserEditPasswordForm";

const EditPassword = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const { user } = auth;
  //state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allClass, setAllClass] = useState([]);
  const [values, setValues] = useState({
    name: "",
    studentCard: "",
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
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
    userData.append("classRoom", classRoom);

    console.log([...userData]);

    try {
      let res = await updateUserPassword(token, userData, user._id);
      console.log("Update User", res);
      toast.success(`รหัสผ่านถูกอัพเดตเรียบร้อยแล้ว`);
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
      <UserEditPasswordForm
        user={user}
        handleSignatureChange={handleSignatureChange}
        values={values}
        setValues={setValues}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
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

export default EditPassword;
