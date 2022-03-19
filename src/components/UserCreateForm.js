import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import "./CreatePetition.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Avatar from "@material-ui/core/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const ValidationTextField = styled(TextField)({
  "& input + fieldset": {
    borderColor: "black",
    borderWidth: 2,
  },
  "& input:valid + fieldset": {
    borderColor: "green",
    borderWidth: 2,
  },

  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled("input")({
  display: "none",
});

const UserCreateForm = (props) => {
  const {
    values,
    setValues,
    handleSubmit,
    handleImageChange,
    prwview,
    setPreview,
    handleChange,
    handleChangeSelect,
    allClass,
    setAllClass,
    setSelectClassRoom,
    selectClassRoom,
    handleChangeClassRoom,
  } = props;

  const {
    name,
    studentCard,
    password,
    lastname,
    email,
    mobile,
    prefix,
    status,
    position,
    image,
    role,
    classRoom,
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
        label="พาสเวิร์ด"
        type="password"
        required
        variant="outlined"
        id="validation-outlined-input"
        value={password}
        name="password"
        inputProps={{ minLength: 6, maxLength: 50 }}
        onChange={handleChange}
        fullWidth
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
          <MenuItem value="ผศ.ดร.">
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
          onChange={handleChangeClassRoom}
          value={selectClassRoom}
        >
          {allClass.map((teacher, index) => (
            <MenuItem key={index} value={teacher._id}>
              {teacher.classRoom}
            </MenuItem>
          ))}
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
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="พาสเวิร์ด"
        type="password"
        required
        variant="outlined"
        id="validation-outlined-input"
        value={password}
        name="password"
        inputProps={{ minLength: 6, maxLength: 50 }}
        onChange={handleChange}
        fullWidth
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
          <MenuItem value="ผศ.ดร.">
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
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="พาสเวิร์ด"
        type="password"
        required
        variant="outlined"
        id="validation-outlined-input"
        value={password}
        name="password"
        inputProps={{ minLength: 6, maxLength: 50 }}
        onChange={handleChange}
        fullWidth
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
          <MenuItem value="ผศ.ดร.">
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
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="พาสเวิร์ด"
        type="password"
        required
        variant="outlined"
        id="validation-outlined-input"
        value={password}
        name="password"
        inputProps={{ minLength: 6, maxLength: 50 }}
        onChange={handleChange}
        fullWidth
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
          <MenuItem value="ผศ.ดร.">
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
              เพิ่มผู้ใช้งาน
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ width: "80%", mt: 5 }}>
            <CardHeader
              title="สร้างบัญชีผู้ใช้ใหม่"
              subheader="ข้อมูลส่วนบุคคล"
            />
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
                  {previewImage()}
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {" "}
                      ตำแหน่ง
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="role"
                      label="ตำแหน่ง"
                      style={{ marginBottom: "10px" }}
                      onChange={handleChangeSelect}
                      value={role}
                    >
                      <MenuItem value="นักศึกษา">
                        <em>นักศึกษา</em>
                      </MenuItem>
                      <MenuItem value="อาจารย์">
                        <em>อาจารย์</em>
                      </MenuItem>
                      <MenuItem value="หัวหน้าสาขา">
                        <em>หัวหน้าสาขา</em>
                      </MenuItem>
                      <MenuItem value="เจ้าหน้าที่สาขา">
                        <em>เจ้าหน้าที่สาขา</em>
                      </MenuItem>
                    </Select>
                  </FormControl>{" "}
                  <Box sx={{ width: "100%", alignContent: "center" }}>
                    {role === "นักศึกษา" ? roleStudent() : <div></div>}
                    {role === "อาจารย์" ? roleTeacher() : <div></div>}
                    {role === "เจ้าหน้าที่สาขา" ? roleStaff() : <div></div>}
                    {role === "หัวหน้าสาขา" ? roleBranchhead() : <div></div>}
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 2,
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
                            !password ||
                            !name ||
                            !lastname ||
                            !mobile ||
                            !email ||
                            !prefix ||
                            !role
                          }
                        >
                          สร้างผู้ใช้งาน
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
      </Dialog>
    </form>
  );
};

export default UserCreateForm;
