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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

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
    setSelectClassRoom,
    selectClassRoom,
    handleChangeClassRoom,
  } = props;

  const navigate = useNavigate();

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
        label="???????????????"
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
        label="????????????????????????????????????????????????????????????"
        type="text"
        required
        variant="outlined"
        id="validation-outlined-input"
        fullWidth
        value={studentCard}
        name="studentCard"
        onChange={handleChange}
        helperText="???????????????????????? 076150303303-5"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> ????????????????????????</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="????????????????????????"
          name="prefix"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={prefix}
        >
          <MenuItem value="?????????">
            <em>?????????</em>
          </MenuItem>
          <MenuItem value="??????????????????">
            <em>??????????????????</em>
          </MenuItem>
          <MenuItem value="?????????">
            <em>?????????</em>
          </MenuItem>
          <MenuItem value="??????.??????">
            <em>??????.??????.</em>
          </MenuItem>
          <MenuItem value="??????.">
            <em>??????.</em>
          </MenuItem>
        </Select>
      </FormControl>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="????????????"
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
        label="?????????????????????"
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
        label="???????????????????????????????????????"
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
        <InputLabel id="demo-simple-select-label"> ????????????</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="????????????"
          name="classRoom"
          style={{ marginBottom: "10px" }}
          onChange={handleChange}
          value={classRoom}
        >
          {allClass.map((teacher, index) => (
            <MenuItem key={index} value={teacher._id}>
              {teacher.classRoom}
            </MenuItem>
          ))}
          <MenuItem hidden value={classRoom._id}>
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
        label="???????????????"
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
        <InputLabel id="demo-simple-select-label"> ????????????????????????</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="????????????????????????"
          name="prefix"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={prefix}
        >
          <MenuItem value="?????????">
            <em>?????????</em>
          </MenuItem>
          <MenuItem value="??????????????????">
            <em>??????????????????</em>
          </MenuItem>
          <MenuItem value="?????????">
            <em>?????????</em>
          </MenuItem>
          <MenuItem value="??????.??????">
            <em>??????.??????.</em>
          </MenuItem>
          <MenuItem value="??????.">
            <em>??????.</em>
          </MenuItem>
        </Select>
      </FormControl>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="????????????"
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
        label="?????????????????????"
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
        label="???????????????????????????????????????"
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
        label="???????????????"
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
        <InputLabel id="demo-simple-select-label"> ????????????????????????</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="????????????????????????"
          name="prefix"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={prefix}
        >
          <MenuItem value="?????????">
            <em>?????????</em>
          </MenuItem>
          <MenuItem value="??????????????????">
            <em>??????????????????</em>
          </MenuItem>
          <MenuItem value="?????????">
            <em>?????????</em>
          </MenuItem>
          <MenuItem value="??????.??????">
            <em>??????.??????.</em>
          </MenuItem>
          <MenuItem value="??????.">
            <em>??????.</em>
          </MenuItem>
        </Select>
      </FormControl>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="????????????"
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
        label="?????????????????????"
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
        label="???????????????????????????????????????"
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
        label="???????????????"
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
        <InputLabel id="demo-simple-select-label"> ????????????????????????</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="????????????????????????"
          name="prefix"
          style={{ marginBottom: "10px" }}
          onChange={handleChangeSelect}
          value={prefix}
        >
          <MenuItem value="?????????">
            <em>?????????</em>
          </MenuItem>
          <MenuItem value="??????????????????">
            <em>??????????????????</em>
          </MenuItem>
          <MenuItem value="?????????">
            <em>?????????</em>
          </MenuItem>
          <MenuItem value="??????.??????">
            <em>??????.??????.</em>
          </MenuItem>
          <MenuItem value="??????.">
            <em>??????.</em>
          </MenuItem>
        </Select>
      </FormControl>
      <ValidationTextField
        style={{ marginBottom: "10px" }}
        label="????????????"
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
        label="?????????????????????"
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
        label="???????????????????????????????????????"
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
        sx={{ width: 220, height: 300, alignItems: "center" }}
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
          marginTop: "20px",
          marginLeft: "220px",
          marginBottom: "0px",
          display: "block",
          justifyContent: "center",
        }}
      >
        <Typography
          style={{ cursor: "pointer" }}
          variant="h5"
          gutterBottom
          component="div"
          onClick={() => navigate(`/users`)}
        >
          <ArrowBackIcon style={{ fontSize: 50, marginRight: 20 }} />
          ??????????????????????????????????????????????????????????????????????????????
        </Typography>
        <b>
          <hr></hr>
        </b>
      </div>
      <div
        style={{
          height: "auto",
          width: "80%",
          marginLeft: "220px",
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Card
          sx={{
            width: "90%",
          }}
        >
          <CardHeader title="????????????????????????????????????????????????" subheader="?????????????????????????????????????????????" />
          <CardContent>
            <Grid container>
              <Grid xs={5}>
                <Typography
                  textAlign="center"
                  variant="h5"
                  component="div"
                  gutterBottom
                >
                  ??????????????????????????????
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
                  {role === "????????????????????????" ? roleStudent() : <div></div>}
                  {role === "?????????????????????" ? roleTeacher() : <div></div>}
                  {role === "?????????????????????????????????????????????" ? roleStaff() : <div></div>}
                  {role === "?????????????????????????????????" ? roleBranchhead() : <div></div>}
                  {role === "?????????????????????" ? previewSignuture() : <div></div>}
                  {role === "?????????????????????????????????" ? previewSignuture() : <div></div>}
                  {role === "?????????????????????" ? (
                    <>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                      >
                        <DriveFileRenameOutlineIcon sx={{ mr: 1 }} />
                        ??????????????????????????????????????????
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

                  {role === "?????????????????????????????????" ? (
                    <>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                      >
                        <DriveFileRenameOutlineIcon sx={{ mr: 1 }} />
                        ??????????????????????????????????????????
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
                        ??????????????????
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
