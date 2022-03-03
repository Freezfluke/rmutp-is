import * as React from "react";
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
import "./CreatePetition.css";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckIcon from "@mui/icons-material/Check";
import DownloadIcon from "@mui/icons-material/Download";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PetitionEditForm = (props) => {
  const {
    handleComment,
    handleClickCancel,
    setMessage,
    message,
    values,
    setValues,
    handleChangeSelect,
    handleSubmit,
    handleImageChange,
    prwview,
    setPreview,
    signatureTeacher,
    setSignatureBranchHead,
    signatureBranchHead,
    setSignatureTeacher,
    user,
    nameTeacher,
    handleCreateAndDownloadPdf,
    handleClickTeachearApprove,
    handleClickBranchHeadApprove,
    nameBranchHead,
    setNameBranchHead,
    handleClickStaffApprove,
    setopenReload,
    openReload,
  } = props;
  const {
    petitionName,
    typePetition,
    status,
    teacher,
    dateAppoveTeacher,
    dateAppoveBranchHead,
    comment,
  } = values;

  const myArrayDayTeacher = dateAppoveTeacher.split("/");
  const dayTeacher = myArrayDayTeacher[0];
  const monthTeacher = myArrayDayTeacher[1];
  const yearTeacher = myArrayDayTeacher[2];
  const myArrayDayBranchHead = dateAppoveBranchHead.split("/");
  const dayBranchhead = myArrayDayBranchHead[0];
  const monthBranchhead = myArrayDayBranchHead[1];
  const yearBranchhead = myArrayDayBranchHead[2];

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: "16px",
    },
  }));

  const ValidationTextField = styled(TextField)({
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },

    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },

    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  });

  const petitionDetail = () => (
    <Card sx={{ width: 370 }}>
      <CardContent style={{ background: "#008acd" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ color: "white" }}
        >
          ระบุรายละเอียดแบบคำร้อง
        </Typography>
      </CardContent>
      <CardContent>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {" "}
            ประเภทแบบคำร้อง
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ประเภทแบบคำร้อง"
            style={{ marginBottom: "10px" }}
            onChange={handleChangeSelect}
            value={typePetition || ""}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="แบบขอเพิ่ม/เปลื่ยน/ถอนการลงทะเบียน">
              แบบขอเพิ่ม/เปลื่ยน/ถอนการลงทะเบียน
            </MenuItem>
          </Select>
        </FormControl>
        <ValidationTextField
          style={{ marginBottom: "10px" }}
          label="ชื่อเอกสาร"
          type="text"
          name="petitionName"
          value={petitionName}
          required
          variant="outlined"
          id="validation-outlined-input"
          inputProps={{ minLength: 14, maxLength: 14 }}
          fullWidth
        />

        {status === "แบบคำร้องถูกต้อง" ||
        "ที่ปรึกษาอนุมัติแล้ว" ||
        "หัวหน้าสาขาอนุมัติแล้ว" ? (
          <div></div>
        ) : (
          <Button sx={{ mb: 1 }} variant="contained" component="label">
            อัพโหลดไฟล์ PNG
            <input
              type="file"
              name="petitionImage"
              onChange={handleImageChange}
              accept="image/*"
              hidden
            />
          </Button>
        )}

        <hr></hr>
        {user.role === "อาจารย์" ? (
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="อนุมัติ"
              icon={<CheckIcon fontSize="large" style={{ color: "green" }} />}
              onClick={handleClickTeachearApprove}
            />
          </BottomNavigation>
        ) : (
          <div></div>
        )}
        {user.role === "หัวหน้าสาขา" ? (
          <BottomNavigation showLabels>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                label="อนุมัติ"
                icon={<CheckIcon fontSize="large" style={{ color: "green" }} />}
                onClick={handleClickBranchHeadApprove}
              />
            </BottomNavigation>
          </BottomNavigation>
        ) : (
          <div></div>
        )}
        {user.role === "เจ้าหน้าที่สาขา" ? (
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="อนุมัติ"
              icon={<CheckIcon fontSize="large" style={{ color: "green" }} />}
              onClick={handleClickStaffApprove}
            />

            <BottomNavigationAction
              label="ไม่อนุมัติ"
              icon={<CancelIcon fontSize="large" style={{ color: "red" }} />}
              onClick={handleClickCancel}
            />
          </BottomNavigation>
        ) : (
          <div></div>
        )}
      </CardContent>
    </Card>
  );
  const commentDetail = () => (
    <Card sx={{ width: 370, marginTop: 3 }}>
      <CardContent style={{ background: "#008acd" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ color: "white" }}
        >
          แสดงความคิดเห็น
        </Typography>
      </CardContent>
      <CardContent>
        <div style={{ width: "100%" }}>
          {comment.map((data, index) => (
            <div
              style={{
                backgroundColor: "#f2f2f2",
                borderRadius: 20,
                marginBottom: "10px",
              }}
            >
              <b>
                {" "}
                <p style={{ margin: "0px 15px 0px 15px" }}>{data.fullname}</p>
              </b>

              <p style={{ margin: "0px 15px 5px 15px" }}>{data.messge}</p>
            </div>
          ))}
        </div>
        <br></br>
        <hr></hr>
        <div style={{ display: "flex" }}>
          <div style={{ width: "85%" }}>
            <TextField
              id="outlined-basic"
              label="แสดงความคิดเห็น"
              variant="outlined"
              size="small"
              fullWidth
              fontSize="10px"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div style={{ width: "10%" }}>
            <Button
              onClick={handleComment}
              style={{ height: 40 }}
              variant="contained"
              endIcon={<SendIcon />}
            ></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const previewPetition = () => (
    <Card sx={{ width: 690 }}>
      <CardContent
        style={{
          background: "#008acd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ color: "white" }}
        >
          ตัวอย่างใบคำร้อง
        </Typography>
        <BootstrapTooltip
          title="ดาวน์โหลดแบบคำร้อง"
          onClick={handleCreateAndDownloadPdf}
        >
          <Fab color="primary" aria-label="add">
            <DownloadIcon sx={{ fontSize: 30 }} color="white" />
          </Fab>
        </BootstrapTooltip>
      </CardContent>
      <div className="pdf-container">
        <img className="img-pettion" src={prwview} alt="preview_image" />
        <div className="float-sigture">
          {status === "รอการตรวจสอบ" ? (
            <img className="img-signuture" src="" alt="" />
          ) : (
            <img className="img-signuture" src="" alt="" />
          )}
        </div>
        <div className="float-name">
          {status === "รอการตรวจสอบ" ? <div></div> : <div></div>}
        </div>
        <div className="float-div-checkbox">
          {status === "รอการตรวจสอบ" ? <div></div> : <div></div>}
        </div>
        <div className="float-approve-day0">
          {status === "รอการตรวจสอบ" ? <div></div> : <div></div>}
        </div>
        <div className="float-sigture">
          {status === "ที่ปรึกษาอนุมัติแล้ว" ? (
            <img className="img-signuture" src={signatureTeacher} alt="" />
          ) : (
            <img className="img-signuture" src="" alt="" />
          )}
        </div>
        <div className="float-name">
          {status === "ที่ปรึกษาอนุมัติแล้ว" ? (
            <div className="float-fname">{nameTeacher}</div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="float-div-checkbox">
          {status === "ที่ปรึกษาอนุมัติแล้ว" ? (
            <div className="float-checkbox">
              <span style={{ fontSize: 25 }}>
                <b>&#10003;</b>
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="float-approve-day0">
          {status === "ที่ปรึกษาอนุมัติแล้ว" ? (
            <div className="float-approve-day1">
              <span style={{ fontSize: 13, marginRight: "30px" }}>
                {dayTeacher}
              </span>
              <span style={{ fontSize: 13, marginRight: "20px" }}>
                {monthTeacher}
              </span>
              <span style={{ fontSize: 13 }}>{yearTeacher}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="float-sigtureBranchHead">
          {status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
            <img
              className="img-sigtureBranchHead"
              src={signatureBranchHead}
              alt=""
            />
          ) : (
            <img className="img-signuture" src="" alt="" />
          )}
        </div>
        <div className="float-nameBranchHead">
          {status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
            <div className="float-fnameBranchHead">{nameBranchHead}</div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="float-div-checkbox2">
          {status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
            <div className="float-checkbox2">
              <span style={{ fontSize: 25 }}>
                <b>&#10003;</b>
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="float-div-checkbox">
          {status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
            <div className="float-checkbox">
              <span style={{ fontSize: 25 }}>
                <b>&#10003;</b>
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="float-sigture">
          {status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
            <img className="img-signuture" src={signatureTeacher} alt="" />
          ) : (
            <img className="img-signuture" src="" alt="" />
          )}
        </div>
        <div className="float-name">
          {status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
            <div className="float-fname">{nameTeacher}</div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="float-approve-day0">
          {status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
            <div className="float-approve-day1">
              <span style={{ fontSize: 13, marginRight: "30px" }}>
                {dayTeacher}
              </span>
              <span style={{ fontSize: 13, marginRight: "20px" }}>
                {monthTeacher}
              </span>
              <span style={{ fontSize: 13 }}>{yearTeacher}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="float-approve-branchhead0">
          {status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
            <div className="float-approve-branchhead1">
              <span style={{ fontSize: 13, marginRight: "30px" }}>
                {dayBranchhead}
              </span>
              <span style={{ fontSize: 13, marginRight: "20px" }}>
                {monthBranchhead}
              </span>
              <span style={{ fontSize: 13 }}>{yearBranchhead}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          height: "auto",
          width: "80%",
          marginLeft: "230px",
          display: "flex",
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openReload}
        >
          {" "}
          <CircularProgress color="inherit" />
        </Backdrop>
        <div
          style={{
            height: "auto",
            margin: "10px ",
            display: "block",
          }}
        >
          {petitionDetail()}
          {commentDetail()}
        </div>
        <div
          style={{
            height: "auto",
            margin: "10px ",
            display: "block",
          }}
        >
          {previewPetition()}
        </div>
      </div>
      <br />
    </form>
  );
};
export default PetitionEditForm;
