import * as React from "react";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Card from "@mui/material/Card";
import "./CreatePetition.css";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@material-ui/core";

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

const UserEditPasswordForm = (props) => {
  const {
    values,
    setValues,
    handleChangeSelect,
    handleSubmit,
    handleImageChange,
    prwview,
    setPreview,
    handleChange,
    setNewpassword,
    signature,
    teacherSignature,
    setPreviewSignature,
    previewSignature,
    handleSignatureChange,
    allClass,
    setAllClass,
    user,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
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
          <CardHeader title="แก้ไขรหัสผ่านผู้ใช้" subheader="ข้อมูลส่วนบุคคล" />
          <CardContent>
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                {" "}
                <Box
                  sx={{
                    width: "100%",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
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
                    disabled
                  />

                  <ValidationTextField
                    label="พาสเวริด์ใหม่"
                    required
                    type="password"
                    variant="outlined"
                    id="validation-outlined-input"
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                        // disabled={!password || !confirmPassword}
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
      </div>
      <br />
    </form>
  );
};
export default UserEditPasswordForm;
