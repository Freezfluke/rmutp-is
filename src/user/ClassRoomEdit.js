import * as React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { readClassroom, updateClassRoom } from "../actions/classRooms";
import { allUser } from "../actions/auth";

import { useParams } from "react-router-dom";
import ClassRoomEditForm from "../components/ClassRoomEditForm";

const ClassRoomEdit = (props) => {
  const match = { params: useParams() };
  // redux
  const [classRoom, setClassRoom] = useState("");
  const [teacher, setTeacher] = useState({});
  const [allTeacher, setAllTeacher] = useState("");
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const { user } = auth;

  useEffect(() => {
    // console.log(match.params.petitionId);
    loadAllClassRoom();
  }, []);

  const loadAllClassRoom = async () => {
    console.log("classRoom", match);
    let res = await readClassroom(match.params.classRoomId);
    let user = await allUser();
    setTeacher(res.data.teacher);
    setClassRoom(res.data.classRoom);
    let teacher = await user.data.filter((teacher) => {
      return teacher.role === "อาจารย์";
    });
    setAllTeacher(teacher);
  };

  const handleChangeSelect = async (e) => {
    setTeacher(e.target.value);
    console.log(teacher);
  };

  const handleSubmit = async (e) => {
    console.log(classRoom, teacher);
    e.preventDefault();
    try {
      let res = await updateClassRoom(
        token,
        {
          classRoom,
          teacher,
        },
        match.params.classRoomId
      );
      console.log("Update ClassRoom", res);
      toast.success(`ชั้นเรียน ${res.data.classRoom} ถูกอัพเดตเรียบร้อยแล้ว`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  return (
    <div>
      <ClassRoomEditForm
        teacher={teacher}
        setTeacher={setTeacher}
        handleSubmit={handleSubmit}
        handleChangeSelect={handleChangeSelect}
        classRoom={classRoom}
        setClassRoom={setClassRoom}
      />
    </div>
  );
};

export default ClassRoomEdit;
