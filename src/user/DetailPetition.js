import * as React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import axios from "axios";
import "../components/CreatePetition.css";
import moment from "moment";

import { useSelector } from "react-redux";
import { allPetitions, read, updatePetition } from "../actions/petitions";
import { useParams } from "react-router-dom";
import PetitionEditForm from "../components/PetitionEditForm";
import { allUser, deleteUser } from "../actions/auth";
import { allClassRoom, readClassroom } from "../actions/classRooms.js";
import { checkboxClasses } from "@mui/material";

const DetailPetition = () => {
  const match = { params: useParams() };
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const [nameTeacher, setNameTeacher] = useState("");
  const [nameBranchHead, setNameBranchHead] = useState("");
  const [openReload, setOpenReload] = useState(false);
  const [openModalMessage, setOpenModalMessage] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = auth;
  const { user } = auth;
  //state
  const [values, setValues] = useState({
    typePetition: "",
    petitionName: "",
    teacher: "",
    branchHead: "",
    dateAppoveBranchHead: "",
    dateAppoveTeacher: "",
    status: "",
    email: "",
    from: "",
    comment: [],
  });
  //Setmoreimage
  const [petitionImage, setPetitionImage] = useState("");
  const [prwview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [signatureTeacher, setSignatureTeacher] = useState("");
  const [signatureBranchHead, setSignatureBranchHead] = useState("");
  // destructuring varaiables from state
  const {
    typePetition,
    petitionName,
    teacher,
    branchHead,
    status,
    email,
    from,
    comment,
  } = values;

  useEffect(() => {
    // console.log(match.params.petitionId);
    loadAllPetitions();
  }, []);

  const handleClickOpenModal = () => {
    setOpenModalMessage(true);
  };

  const handleCloseOpenModal = () => {
    setOpenModalMessage(false);
  };

  const loadAllPetitions = async () => {
    setOpenReload(true);
    let setupPetitions = [];
    let res = await read(match.params.petitionId);
    console.log("res", res);
    setValues({ ...values, ...res.data });
    let resPetitions = await allPetitions();
    let resUsers = await allUser();
    let resClassRoom = await allClassRoom();
    let desPetitions = [...resPetitions.data];
    let desUsers = [...resUsers.data];
    let desClassroom = [...resClassRoom.data];
    let petitionDetail = await desPetitions.filter((e) => {
      return e._id === match.params.petitionId;
    })[0];
    console.log("petitionDetail", petitionDetail);
    let petitionUser = await desUsers.filter((e) => {
      return e._id === petitionDetail.from;
    })[0];
    console.log("petitionUser", petitionUser);
    let petitionClassRoom = await desClassroom.filter((e) => {
      return e._id === petitionUser.classRoom;
    })[0];
    console.log("petitionClassRoom", petitionClassRoom);
    let petitionTeacher = await desUsers.filter((e) => {
      return petitionClassRoom.teacher === e._id;
    })[0];
    let petitionBranchHead = await desUsers.filter((e) => {
      return e.role === "หัวหน้าสาขา";
    })[0];
    console.log("petitionTeacher", petitionTeacher);
    setupPetitions.push({
      _id: petitionDetail._id,
      email: petitionDetail.email,
      typePetition: petitionDetail.typePetition,
      petitionName: petitionDetail.petitionName,
      dateAppoveTeacher: petitionDetail.dateAppoveTeacher,
      dateAppoveBranchHead: petitionDetail.dateAppoveBranchHead,
      from: petitionUser,
      branchHead: petitionBranchHead,
      class: petitionClassRoom,
      teacher: petitionTeacher,
      status: petitionDetail.status,
      petitionImage: petitionDetail.petitionImage,
      comment: petitionDetail.comment,
      createdAt: petitionDetail.createdAt,
      updatedAt: petitionDetail.updatedAt,
      __v: petitionDetail.__v,
    });
    console.log("setupPetitions", setupPetitions[0]);
    setNameTeacher(
      `${setupPetitions[0].teacher.prefix}${setupPetitions[0].teacher.name} ${setupPetitions[0].teacher.lastname}`
    );

    setNameBranchHead(
      `${setupPetitions[0].branchHead.prefix}${setupPetitions[0].branchHead.name} ${setupPetitions[0].branchHead.lastname}`
    );
    setPreview(
      `${process.env.REACT_APP_API}/petition/petitionImage/${res.data._id}`
    );

    setSignatureTeacher(
      `${process.env.REACT_APP_API}/user/teacherSignature/${setupPetitions[0].teacher._id}`
    );
    setSignatureBranchHead(
      `${process.env.REACT_APP_API}/user/teacherSignature/${setupPetitions[0].branchHead._id}`
    );
    setOpenReload(false);
  };

  const handleCreateAndDownloadPdf = async (e) => {
    e.preventDefault();

    if (status === "รอเจ้าหน้าที่ตรวจสอบ") {
      var imageSignatureTeacher = "";
      var imagePetition = prwview;
      var fullnameTeacher = "";
      var imageSignatureBranchhead = "";
      var fullnameBranchhead = "";
      var dateAppoveBranchHead = "";
      var dateAppoveTeacher = "";
    }
    if (status === "แบบคำร้องถูกต้อง") {
      var imageSignatureTeacher = "";
      var imagePetition = prwview;
      var fullnameTeacher = "";
      var imageSignatureBranchhead = "";
      var fullnameBranchhead = "";
      var dateAppoveBranchHead = "";
      var dateAppoveTeacher = "";
    }
    if (status === "ที่ปรึกษาอนุมัติแล้ว") {
      var imageSignatureTeacher = signatureTeacher;
      var imagePetition = prwview;
      var fullnameTeacher = `${nameTeacher}`;
      var dateAppoveTeacher = values.dateAppoveTeacher;

      var dateAppoveBranchHead = "";
      var imageSignatureBranchhead = "";
      var fullnameBranchhead = "";
    }
    if (status === "หัวหน้าสาขาอนุมัติแล้ว") {
      var imageSignatureTeacher = signatureTeacher;
      var imagePetition = prwview;
      var fullnameTeacher = `${nameTeacher}`;
      var imageSignatureBranchhead = signatureBranchHead;
      var dateAppoveTeacher = values.dateAppoveTeacher;
      var dateAppoveBranchHead = values.dateAppoveBranchHead;
      var fullnameBranchhead = `${nameBranchHead}`;
    }

    axios
      .post(`${process.env.REACT_APP_API_CREATEPDF}/create-pdf`, {
        imageSignatureTeacher,
        imagePetition,
        fullnameTeacher,
        imageSignatureBranchhead,
        fullnameBranchhead,
        dateAppoveTeacher,
        dateAppoveBranchHead,
        status,
      })
      .then(() =>
        axios.get(`${process.env.REACT_APP_API_CREATEPDF}/fetch-pdf`, {
          responseType: "blob",
        })
      )
      .then((res) => {
        console.log("respdf", res.data);
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "แบบขอเพิ่ม/ถอน/เปลื่ยน/การลงทะเบียน.pdf");
      });
  };

  const handleClickCancel = async (e) => {
    e.preventDefault();
    console.log("message", message);
    if (message === null || message === "" || message === " ") {
      toast.error("กรุณาระบุเหตุผลที่ไม่อนุมัติ");
    } else {
      let teacherApproveDate = "";
      let branchHeadApproveDate = "";
      let updateStatus = "แบบคำร้องไม่ถูกต้อง";
      handleSubmitCancel(
        updateStatus,
        teacherApproveDate,
        branchHeadApproveDate
      );
    }
  };

  const handleClickStaffApprove = async (e) => {
    e.preventDefault();
    let teacherApproveDate = "";
    let branchHeadApproveDate = "";
    let updateStatus = "แบบคำร้องถูกต้อง";
    handleSubmit(updateStatus, teacherApproveDate, branchHeadApproveDate);
  };

  const handleClickTeachearApprove = async (e) => {
    e.preventDefault();
    let teacherApproveDate = moment().add(543, "year").format("DD/MM/YYYY");
    let branchHeadApproveDate = "";
    let updateStatus = "ที่ปรึกษาอนุมัติแล้ว";
    handleSubmit(updateStatus, teacherApproveDate, branchHeadApproveDate);
  };

  const handleClickBranchHeadApprove = async (e) => {
    e.preventDefault();
    let updateStatus = "หัวหน้าสาขาอนุมัติแล้ว";
    let teacherApproveDate = "";
    let dateApproveBranchHead = moment().add(543, "year").format("DD/MM/YYYY");
    handleSubmit(updateStatus, dateApproveBranchHead, teacherApproveDate);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    let oldComment = [];
    console.log("message", message);

    let newComment = {
      messge: message,
      fullname: `${user.prefix}${user.name} ${user.lastname}`,
    };
    console.log("NewComment", newComment);
    oldComment.push(...values.comment, newComment);
    let petitionData = new FormData();
    // let jsonFrom = JSON.stringify(from);
    // let jsonTeacher = JSON.stringify(teacher);
    // let jsonbranchHead = JSON.stringify(branchHead);
    let jsonoldComment = JSON.stringify(oldComment);
    petitionData.append("typePetition", typePetition);
    petitionData.append("email", email);
    petitionData.append("petitionName", petitionName);
    petitionImage && petitionData.append("petitionImage", petitionImage);
    petitionData.append("status", values.status);
    petitionData.append("branchHead", branchHead);
    petitionData.append("from", from);
    petitionData.append("dateAppoveTeacher", values.dateAppoveTeacher);
    petitionData.append("dateAppoveBranchHead", values.dateAppoveBranchHead);
    petitionData.append("comment", jsonoldComment);
    console.log([...petitionData]);
    try {
      let res = await updatePetition(
        token,
        petitionData,
        match.params.petitionId
      );
      console.log("Update Petition", res);
      toast.success(`โพสต์แสดงความคิดเห็นเรียบร้อยแล้ว`);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleSubmitCancel = async (
    updateStatus,
    teacherApproveDate,
    dateApproveBranchHead
  ) => {
    let dateAppoveTeacher = teacherApproveDate;
    let dateAppoveBranchHead = teacherApproveDate;
    console.log("dateApproveBranchHead", dateAppoveBranchHead);
    let oldComment = [];
    // let jsonFrom = JSON.stringify(from);
    // let jsonTeacher = JSON.stringify(teacher);
    // let jsonbranchHead = JSON.stringify(branchHead);
    let newComment = {
      messge: message,
      fullname: `${user.prefix}${user.name} ${user.lastname}`,
    };
    console.log("NewComment", newComment);
    oldComment.push(...values.comment, newComment);
    let jsonoldComment = JSON.stringify(oldComment);

    let petitionData = new FormData();
    petitionData.append("typePetition", typePetition);
    petitionData.append("email", email);
    petitionData.append("petitionName", petitionName);
    petitionImage && petitionData.append("petitionImage", petitionImage);
    petitionData.append("status", updateStatus);
    petitionData.append("branchHead", branchHead);
    petitionData.append("from", from);
    petitionData.append("dateAppoveTeacher", dateAppoveTeacher);
    petitionData.append("dateAppoveBranchHead", dateAppoveBranchHead);
    petitionData.append("comment", jsonoldComment);
    console.log([...petitionData]);
    try {
      let res = await updatePetition(
        token,
        petitionData,
        match.params.petitionId
      );
      console.log("Update Petition", res);
      toast.success(
        `แบบคำร้องนี้ ${res.data.petitionName} ถูกอัพเดตเรียบร้อยแล้ว`
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data);
        // setOpen(false);
      }
    }
  };

  const handleSubmit = async (
    updateStatus,
    teacherApproveDate,
    dateApproveBranchHead
  ) => {
    let dateAppoveTeacher = teacherApproveDate;
    let dateAppoveBranchHead = teacherApproveDate;
    console.log("dateApproveBranchHead", dateAppoveBranchHead);
    // let jsonFrom = JSON.stringify(from);
    // let jsonTeacher = JSON.stringify(teacher);
    // let jsonbranchHead = JSON.stringify(branchHead);

    let jsonoldComment = JSON.stringify(values.comment);

    let petitionData = new FormData();
    petitionData.append("typePetition", typePetition);
    petitionData.append("email", email);
    petitionData.append("petitionName", petitionName);
    petitionImage && petitionData.append("petitionImage", petitionImage);
    petitionData.append("status", updateStatus);
    petitionData.append("branchHead", branchHead);
    petitionData.append("from", from);
    petitionData.append("dateAppoveTeacher", dateAppoveTeacher);
    petitionData.append("dateAppoveBranchHead", dateAppoveBranchHead);
    petitionData.append("comment", jsonoldComment);
    console.log([...petitionData]);
    try {
      let res = await updatePetition(
        token,
        petitionData,
        match.params.petitionId
      );
      console.log("Update Petition", res);
      toast.success(
        `แบบคำร้องนี้ ${res.data.petitionName} ถูกอัพเดตเรียบร้อยแล้ว`
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data);
        // setOpen(false);
      }
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setPetitionImage(e.target.files[0]);
  };

  const handleChangeSelect = async (e) => {
    setValues({
      ...values,
      typePetition: e.target.value,
      petitionName: e.target.value,
      email: user.email,
    });
  };

  return (
    <div>
      <PetitionEditForm
        handleClickCancel={handleClickCancel}
        handleComment={handleComment}
        message={message}
        setMessage={setMessage}
        handleClickBranchHeadApprove={handleClickBranchHeadApprove}
        handleClickTeachearApprove={handleClickTeachearApprove}
        handleClickStaffApprove={handleClickStaffApprove}
        signatureTeacher={signatureTeacher}
        setSignatureTeacher={setSignatureTeacher}
        signatureBranchHead={signatureBranchHead}
        setSignatureBranchHead={setSignatureBranchHead}
        values={values}
        setValues={setValues}
        handleChangeSelect={handleChangeSelect}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        prwview={prwview}
        setPreview={setPreview}
        user={user}
        setNameTeacher={setNameTeacher}
        nameTeacher={nameTeacher}
        setNameBranchHead={setNameBranchHead}
        nameBranchHead={nameBranchHead}
        handleCreateAndDownloadPdf={handleCreateAndDownloadPdf}
        openReload={openReload}
        setOpenReload={setOpenReload}
        openModalMessage={openModalMessage}
        setOpenModalMessage={setOpenModalMessage}
        handleClickOpenModal={handleClickOpenModal}
        handleCloseOpenModal={handleCloseOpenModal}
      />
    </div>
  );
};

export default DetailPetition;
