import * as React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import axios from "axios";
import "../components/CreatePetition.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { read, updatePetition } from "../actions/petitions";
import { useParams } from "react-router-dom";
import PetitionEditForm from "../components/PetitionEditForm";

const DetailPetition = () => {
  const match = { params: useParams() };
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const [nameTeacher, setNameTeacher] = useState("");
  const [nameBranchHead, setNameBranchHead] = useState("");
  const [message, setMessage] = useState("");
  const [openReload, setopenReload] = useState(false);
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
  } = values;

  useEffect(() => {
    // console.log(match.params.petitionId);
    loadAllPetitions();
  }, []);

  const loadAllPetitions = async () => {
    setopenReload(true);
    let res = await read(match.params.petitionId);
    await setValues({ ...values, ...res.data });
    await setNameTeacher(
      `${res.data.teacher.teacher.prefix}${res.data.teacher.teacher.name} ${res.data.teacher.teacher.lastname}`
    );
    await setNameBranchHead(
      `${res.data.branchHead.prefix}${res.data.branchHead.name} ${res.data.branchHead.lastname}`
    );
    await setPreview(
      `${process.env.REACT_APP_API}/petition/petitionImage/${res.data._id}`
    );

    await setSignatureTeacher(
      `${process.env.REACT_APP_API}/user/teacherSignature/${res.data.teacher.teacher._id}`
    );
    await setSignatureBranchHead(
      `${process.env.REACT_APP_API}/user/teacherSignature/${res.data.branchHead._id}`
    );
    setTimeout(() => {
      setopenReload(false);
    }, 6000);
  };

  const handleCreateAndDownloadPdf = async (e) => {
    e.preventDefault();
    if (status === "รอการตรวจสอบ") {
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
      var fullnameTeacher = `${teacher.teacher.prefix}${teacher.teacher.name} ${teacher.teacher.lastname}`;
      var dateAppoveTeacher = values.dateAppoveTeacher;
      var dateAppoveBranchHead = "";
      var imageSignatureBranchhead = "";
      var fullnameBranchhead = "";
    }
    if (status === "หัวหน้าสาขาอนุมัติแล้ว") {
      var imageSignatureTeacher = signatureTeacher;
      var imagePetition = prwview;
      var fullnameTeacher = `${teacher.teacher.prefix}${teacher.teacher.name} ${teacher.teacher.lastname}`;
      var imageSignatureBranchhead = signatureBranchHead;
      var dateAppoveTeacher = values.dateAppoveTeacher;
      var dateAppoveBranchHead = values.dateAppoveBranchHead;
      var fullnameBranchhead = `${branchHead.prefix}${branchHead.name} ${branchHead.lastname}`;
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
    let teacherApproveDate = "";
    let branchHeadApproveDate = "";
    let updateStatus = "แบบคำร้องไม่ถูกต้อง";
    handleSubmit(updateStatus, teacherApproveDate, branchHeadApproveDate);
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
    let newComment = {
      messge: message,
      fullname: `${user.prefix}${user.name} ${user.lastname}`,
    };
    oldComment.push(...values.comment, newComment);
    let petitionData = new FormData();
    let jsonFrom = JSON.stringify(from);
    let jsonTeacher = JSON.stringify(teacher);
    let jsonbranchHead = JSON.stringify(branchHead);
    let jsonoldComment = JSON.stringify(oldComment);
    petitionData.append("typePetition", typePetition);
    petitionData.append("email", email);
    petitionData.append("petitionName", petitionName);
    petitionImage && petitionData.append("petitionImage", petitionImage);
    petitionData.append("status", values.status);
    petitionData.append("branchHead", jsonbranchHead);
    petitionData.append("from", jsonFrom);
    petitionData.append("teacher", jsonTeacher);
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
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
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
    let jsonFrom = JSON.stringify(from);
    let jsonTeacher = JSON.stringify(teacher);
    let jsonbranchHead = JSON.stringify(branchHead);
    let jsonoldComment = JSON.stringify(values.comment);

    let petitionData = new FormData();
    petitionData.append("typePetition", typePetition);
    petitionData.append("email", email);
    petitionData.append("petitionName", petitionName);
    petitionImage && petitionData.append("petitionImage", petitionImage);
    petitionData.append("status", updateStatus);
    petitionData.append("branchHead", jsonbranchHead);
    petitionData.append("from", jsonFrom);
    petitionData.append("teacher", jsonTeacher);
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
      console.log(err);
      toast.error(err.response.data.err);
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
        setopenReload={setopenReload}
        openReload={openReload}
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
      />
    </div>
  );
};

export default DetailPetition;
