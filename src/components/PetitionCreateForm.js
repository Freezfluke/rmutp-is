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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePetitionForm = (props) => {
  const {
    values,
    setValues,
    handleChangeSelect,
    handleSubmit,
    handleImageChange,
    prwview,
    setPreview,
  } = props;
  const { petitionName, typePetition } = values;

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
    <Card sx={{ width: 600 }}>
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
        <Button variant="contained" component="label">
          อัพโหลดไฟล์ PNG
          <input
            type="file"
            name="petitionImage"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </Button>
        {/* <div>
          <pre>{JSON.stringify(values, null, 4)}</pre>
        </div> */}
      </CardContent>
    </Card>
  );

  const previewPetition = () => (
    <Card sx={{ width: 670 }}>
      <CardContent style={{ background: "#008acd" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ color: "white" }}
        >
          ตัวอย่างใบคำร้อง
        </Typography>
      </CardContent>
      <div className="pdf-container">
        <img className="img-pettion" src={prwview} alt="preview_image" />
        <div className="float-sigture">
          {/* <img className="img-signuture" src={Singnuture} alt="" /> */}
        </div>
      </div>
    </Card>
  );

  const SignaturePetiton = () => (
    <Card sx={{ width: 600 }}>
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
          ระบุผู้ลงนามเอกสาร
        </Typography>
        <BootstrapTooltip title="เพิ่มผู้ลงนามเอกสาร">
          <Fab color="primary" aria-label="add">
            <AddIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </BootstrapTooltip>
      </CardContent>
      <div style={{ height: "280px", width: "100%" }}>
        <DataGrid pageSize={3} rowsPerPageOptions={[5]} />
      </div>
    </Card>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              เพิ่มแบบคำร้อง
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              <SaveIcon fontSize="large" />
              <Typography sx={{ ml: 1, flex: 1 }} variant="h6" component="div">
                บันทึก
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <div
          style={{
            height: "auto",
            margin: "10px ",
            display: "flex",
            float: "left",
          }}
        >
          <div style={{ marginRight: "50px" }}>{petitionDetail()}</div>
          <div>{previewPetition()}</div>
        </div>

        <br />
        <Divider />
      </Dialog>
    </form>
  );
};
export default CreatePetitionForm;
