import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Card from "@mui/material/Card";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import "./CreatePetition.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Avatar from "@material-ui/core/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

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

const UserEditForm = (props) => {
  const {
    values,
    setValues,
    handleChangeSelect,
    handleSubmit,
    handleImageChange,
    prwview,
    setPreview,
    handleChange,
    password,
    setPassword,
    newPassword,
    setNewpassword,
    signature,
    teacherSignature,
    setPreviewSignature,
    previewSignature,
    handleSignatureChange,
    allClass,
    setAllClass,
  } = props;

  var {
    name,
    studentCard,
    lastname,
    email,
    mobile,
    prefix,
    status,
    position,
    image,
    classRoom,
    role,
  } = values;

  const roleStudent = () => (
    <div>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="อีเมล"
        type="email"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={email}
        name="email"
        onChange={handleChange}
      />

      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="รหัสประจำตัวนักศึกษา"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={studentCard}
        name="studentCard"
        onChange={handleChange}
        helperText="ตัวอย่าง 076150303303-5"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> คำนำหน้า</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="คำนำหน้า"
          name="prefix"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={prefix}
        >
          <MenuItem value="นาย">
            <em>นาย</em>
          </MenuItem>
          <MenuItem value="นางสาว">
            <em>นางสาว</em>
          </MenuItem>
          <MenuItem value="นาง">
            <em>นาง</em>
          </MenuItem>
          <MenuItem value="ผศ.ดร">
            <em>ผศ.ดร.</em>
          </MenuItem>
          <MenuItem value="ดร.">
            <em>ดร.</em>
          </MenuItem>
        </Select>
      </FormControl>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="ชื่อ"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={name}
        name="name"
        onChange={handleChange}
      />
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="นามสกุล"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={lastname}
        onChange={handleChange}
        name="lastname"
      />

      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="เบอร์โทรศัพท์"
        required
        inputProps={{ minLength: 9, maxLength: 10 }}
        variant="outlined"
        id="validation-outlined-input"
        value={mobile}
        name="mobile"
        onChange={handleChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> ห้อง</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="ห้อง"
          name="classRoom"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={classRoom}
        >
          {allClass.map((teacher, index) => (
            <MenuItem key={index} value={teacher}>
              {teacher.classRoom}
            </MenuItem>
          ))}
          <MenuItem hidden value={classRoom}>
            {classRoom.classRoom}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );

  const roleTeacher = () => (
    <div>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="อีเมล"
        type="email"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={email}
        name="email"
        onChange={handleChange}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> คำนำหน้า</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="คำนำหน้า"
          name="prefix"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={prefix}
        >
          <MenuItem value="นาย">
            <em>นาย</em>
          </MenuItem>
          <MenuItem value="นางสาว">
            <em>นางสาว</em>
          </MenuItem>
          <MenuItem value="นาง">
            <em>นาง</em>
          </MenuItem>
          <MenuItem value="ผศ.ดร">
            <em>ผศ.ดร.</em>
          </MenuItem>
          <MenuItem value="ดร.">
            <em>ดร.</em>
          </MenuItem>
        </Select>
      </FormControl>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="ชื่อ"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={name}
        name="name"
        onChange={handleChange}
      />
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="นามสกุล"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={lastname}
        onChange={handleChange}
        name="lastname"
      />
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="เบอร์โทรศัพท์"
        required
        inputProps={{ minLength: 9, maxLength: 10 }}
        variant="outlined"
        id="validation-outlined-input"
        value={mobile}
        name="mobile"
        onChange={handleChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> ห้อง</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="ห้อง"
          name="classRoom"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={classRoom}
        >
          {allClass.map((teacher, index) => (
            <MenuItem key={index} value={teacher}>
              {teacher.classRoom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

  const roleBranchhead = () => (
    <div>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="อีเมล"
        type="email"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={email}
        name="email"
        onChange={handleChange}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> คำนำหน้า</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="คำนำหน้า"
          name="prefix"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={prefix}
        >
          <MenuItem value="นาย">
            <em>นาย</em>
          </MenuItem>
          <MenuItem value="นางสาว">
            <em>นางสาว</em>
          </MenuItem>
          <MenuItem value="นาง">
            <em>นาง</em>
          </MenuItem>
          <MenuItem value="ผศ.ดร">
            <em>ผศ.ดร.</em>
          </MenuItem>
          <MenuItem value="ดร.">
            <em>ดร.</em>
          </MenuItem>
        </Select>
      </FormControl>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="ชื่อ"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={name}
        name="name"
        onChange={handleChange}
      />
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="นามสกุล"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={lastname}
        onChange={handleChange}
        name="lastname"
      />

      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="เบอร์โทรศัพท์"
        required
        inputProps={{ minLength: 9, maxLength: 10 }}
        variant="outlined"
        id="validation-outlined-input"
        value={mobile}
        name="mobile"
        onChange={handleChange}
        fullWidth
      />
    </div>
  );

  const roleStaff = () => (
    <div>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="อีเมล"
        type="email"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={email}
        name="email"
        onChange={handleChange}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> คำนำหน้า</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="คำนำหน้า"
          name="prefix"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={prefix}
        >
          <MenuItem value="นาย">
            <em>นาย</em>
          </MenuItem>
          <MenuItem value="นางสาว">
            <em>นางสาว</em>
          </MenuItem>
          <MenuItem value="นาง">
            <em>นาง</em>
          </MenuItem>
          <MenuItem value="ผศ.ดร">
            <em>ผศ.ดร.</em>
          </MenuItem>
          <MenuItem value="ดร.">
            <em>ดร.</em>
          </MenuItem>
        </Select>
      </FormControl>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="ชื่อ"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={name}
        name="name"
        onChange={handleChange}
      />
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="นามสกุล"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={lastname}
        onChange={handleChange}
        name="lastname"
      />

      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="เบอร์โทรศัพท์"
        required
        inputProps={{ minLength: 9, maxLength: 10 }}
        variant="outlined"
        id="validation-outlined-input"
        value={mobile}
        name="mobile"
        onChange={handleChange}
        fullWidth
      />
    </div>
  );

  const previewImage = () => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
    >
      {" "}
      <Avatar
        src={prwview}
        sx={{ width: 240, height: 240, alignItems: "center" }}
      />
    </Stack>
  );

  console.log("classRoom", classRoom);

  console.log("classRoom", classRoom);

  console.log("Classroom", classRoom);
  const Input = styled("input")({
    display: "none",
  });

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

  const previewPetition = () => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
    >
      {" "}
      <Avatar
        src={prwview}
        sx={{ width: 240, height: 240, alignItems: "center" }}
      />
    </Stack>
  );

  const previewSignuture = () => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        display: "block",
        justifyContent: "center",
        mt: 2,
      }}
    >
      {" "}
      <Avatar
        variant="square"
        src={previewSignature}
        sx={{ width: 150, height: "auto", alignItems: "center" }}
      />
    </Stack>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          height: "auto",
          width: "80%",
          marginLeft: "220px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "90%",
            mt: 3,
          }}
        >
          <CardHeader title="แก้ไขบัญชีผู้ใช้" subheader="ข้อมูลส่วนบุคคล" />
          <CardContent>
            <Grid container>
              <Grid xs={5}>
                <Typography
                  textAlign="center"
                  variant="h5"
                  component="div"
                  gutterBottom
                >
                  รูปโปรไฟล์
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleImageChange}
                    />
                    <Button variant="contained" component="span">
                      <PhotoCamera sx={{ mr: 1 }} />
                      Upload
                    </Button>
                  </label>
                </Stack>
                {previewPetition()}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <Box sx={{ width: "100%", alignContent: "center" }}>
                  {role === "นักศึกษา" ? roleStudent() : <div></div>}
                  {role === "อาจารย์" ? roleTeacher() : <div></div>}
                  {role === "เจ้าหน้าที่สาขา" ? roleStaff() : <div></div>}
                  {role === "หัวหน้าสาขา" ? roleBranchhead() : <div></div>}
                  {role === "อาจารย์" ? previewSignuture() : <div></div>}
                  {role === "หัวหน้าสาขา" ? previewSignuture() : <div></div>}
                  {role === "อาจารย์" ? (
                    <>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                      >
                        <DriveFileRenameOutlineIcon sx={{ mr: 1 }} />
                        อัพโหลดลายเซ็น
                        <input
                          type="file"
                          accept=".png"
                          hidden
                          onChange={handleSignatureChange}
                        />
                      </Button>
                    </>
                  ) : (
                    <div></div>
                  )}

                  {role === "หัวหน้าสาขา" ? (
                    <>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                      >
                        <DriveFileRenameOutlineIcon sx={{ mr: 1 }} />
                        อัพโหลดลายเซ็น
                        <input
                          type="file"
                          accept=".png"
                          hidden
                          onChange={handleSignatureChange}
                        />
                      </Button>
                    </>
                  ) : (
                    <div></div>
                  )}

                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: 2,
                      marginTop: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={2}
                    >
                      <Button
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                        endIcon={<HowToRegIcon />}
                        disabled={
                          !name ||
                          !lastname ||
                          !mobile ||
                          !email ||
                          !prefix ||
                          !role
                        }
                      >
                        ยืนยัน
                      </Button>
                    </Stack>
                  </CardActions>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
      </div>
      <br />
    </form>
  );
};
export default UserEditForm;
