import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import HowToRegIcon from "@mui/icons-material/HowToReg";

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

const RegisterForm = ({
  handleSubmit,
  studentCard,
  setStudentCard,
  password,
  setPassword,
  email,
  setEmail,
  mobile,
  setMobile,
  name,
  setName,
  lastname,
  setLastname,
}) => (
  <form onSubmit={handleSubmit}>
    <CardContent>
      <Typography gutterBottom variant="h4" align="center" component="div">
        ลงทะเบียน
      </Typography>
      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <ValidationTextField
          style={{ marginBottom: "10px" }}
          label="รหัสประจำตัว"
          required
          variant="outlined"
          id="validation-outlined-input"
          value={studentCard}
          onChange={(e) => setStudentCard(e.target.value)}
          inputProps={{ minLength: 14, maxLength: 14 }}
          fullWidth
          helperText="ตัวอย่าง 076150303303-5"
        />
        <ValidationTextField
          style={{ marginBottom: "10px" }}
          label="พาสเวิร์ด"
          type="password"
          required
          variant="outlined"
          id="validation-outlined-input"
          value={password}
          inputProps={{ minLength: 6, maxLength: 50 }}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <ValidationTextField
          style={{ marginBottom: "10px" }}
          label="ชื่อ"
          type="text"
          required
          variant="outlined"
          id="validation-outlined-input"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setLastname(e.target.value)}
        />
        <ValidationTextField
          style={{ marginBottom: "10px" }}
          label="อีเมล"
          type="email"
          required
          variant="outlined"
          id="validation-outlined-input"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <ValidationTextField
          label="เบอร์โทรศัพท์"
          required
          inputProps={{ minLength: 9, maxLength: 10 }}
          variant="outlined"
          id="validation-outlined-input"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          fullWidth
        />
      </Box>
    </CardContent>
    <CardActions
      sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
    >
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          type="submit"
          size="large"
          variant="contained"
          endIcon={<HowToRegIcon />}
          disabled={
            !studentCard || !password || !name || !lastname || !mobile || !email
          }
        >
          ลงทะเบียน
        </Button>
      </Stack>
    </CardActions>
  </form>
);

export default RegisterForm;
