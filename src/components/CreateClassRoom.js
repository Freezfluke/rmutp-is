import * as React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

//Materail Design
import Card from "@mui/material/Card";

//Npm
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createClassRoom } from "../actions/classRooms";
import CreateClassRoomForm from "./CreateClassRoomForm";

const CreateClassRoom = (props) => {
  const [open, setOpen] = useState(props.open);
  const [classRoom, setClassRoom] = useState("");
  const [teacher, setTeacher] = useState({});
  const [Nameteacher, setNameTeacher] = useState("");
  const [allTeacher, setAllTeacher] = useState("");
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const { user } = auth;

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  //   const handleChange = (e) => {
  //     setValues({ ...values, [e.target.name]: e.target.value });
  //   };

  const handleChangeSelect = async (e) => {
    setTeacher(e.target.value);
    setNameTeacher();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await createClassRoom(token, {
        classRoom,
        teacher,
      });
      toast.success("สร้างชั้นเรียนเรียบร้อยแล้ว");
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
        <CreateClassRoomForm
          handleSubmit={handleSubmit}
          open={props.open}
          setOpen={props.setOpen}
          handleClose={props.handleClose}
          setClassRoom={setClassRoom}
          classRoom={classRoom}
          teacher={teacher}
          setTeacher={setTeacher}
          loadAllTeacher={props.loadAllTeacher}
          allTeacher={props.allTeacher}
          setAllTeacher={props.setAllTeacher}
          handleChangeSelect={handleChangeSelect}

          //   handleChangeSelect={handleChangeSelect}
        />
      </Card>
    </>
  );
};

export default CreateClassRoom;
