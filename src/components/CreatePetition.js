import * as React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import PetitionCreateForm from "./PetitionCreateForm";

//import actions
import { createPetition } from "../actions/petitions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allUser } from "../actions/auth";

const CreatePetition = (props) => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const { user } = auth;
  const [open, setOpen] = useState(props.open);
  const today = moment(new Date()).format("YYYY/MM/DD");
  //state
  const [values, setValues] = useState({
    typePetition: "",
    petitionName: "",
    petitionImage: "",
    teacher: "",
    branchHead: "",
    dateAppoveBranchHead: "",
    dateAppoveTeacher: "",
    status: "",
    email: "",
    from: "",
  });

  const [prwview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const handleClose = () => {
    setOpen(false);
  };

  // destructuring varaiables from state
  const {
    typePetition,
    petitionName,
    petitionImage,
    teacher,
    branchHead,
    status,
    email,
    from,
    dateAppoveBranchHead,
    dateAppoveTeacher,
  } = values;

  useEffect(() => {
    loadAllStudent();
  }, []);

  const loadAllStudent = async (e) => {
    let res = await allUser();
    console.log("res", res);
    let student = res.data.filter((studentData) => {
      return studentData.email === user.email;
    });
    let branchHead = res.data.filter((branchHeadData) => {
      return branchHeadData.role === "หัวหน้าสาขา";
    });
    console.log("student", student);
    setValues({
      ...values,
      from: student[0],
      teacher: student[0].classRoom,
      branchHead: branchHead[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    let jsonFrom = JSON.stringify(from);
    let jsonTeacher = JSON.stringify(teacher);
    let jsonbranchHead = JSON.stringify(branchHead);
    let pettionData = new FormData();
    pettionData.append("typePetition", typePetition);
    pettionData.append("email", email);
    pettionData.append("petitionName", petitionName);
    petitionImage && pettionData.append("petitionImage", petitionImage);
    pettionData.append("teacher", teacher);
    pettionData.append("status", status);
    pettionData.append("branchHead", jsonbranchHead);
    pettionData.append("from", jsonFrom);
    pettionData.append("teacher", jsonTeacher);
    pettionData.append("dateAppoveBranchHead", dateAppoveBranchHead);
    pettionData.append("dateAppoveTeacher", dateAppoveTeacher);

    console.log([...pettionData]);
    try {
      let res = await createPetition(token, pettionData);
      console.log("CreatePetitions Res", res);
      toast.success("สร้างแบบคำร้องเรียบร้อยแล้ว");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      if (err.response.status === 400) {
        console.log(err);
        toast.error(err.response.data);
      }
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, petitionImage: e.target.files[0] });
  };

  const handleChangeSelect = async (e) => {
    setValues({
      ...values,
      typePetition: e.target.value,
      petitionName: e.target.value,
      email: user.email,
      status: "รอการตรวจสอบ",
    });
  };

  return (
    <div>
      <PetitionCreateForm
        values={values}
        setValues={setValues}
        handleChangeSelect={handleChangeSelect}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        handleClose={props.handleClose}
        open={props.open}
        setOpen={props.setOpen}
        prwview={prwview}
        setPreview={setPreview}
      />
    </div>
  );
};

export default CreatePetition;
