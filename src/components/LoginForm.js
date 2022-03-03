import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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

const LoginForm = ({
  handleSubmit,
  setEmail,
  email,
  password,
  setPassword,
  open,
}) => (
  <form onSubmit={handleSubmit}>
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <CardContent>
      <Typography gutterBottom variant="h4" align="center" component="div">
        เข้าสู่ระบบ
      </Typography>
      <Typography gutterBottom variant="h6" align="center" component="div">
        ระบบบริหารงานแบบคำร้องทางการศึกษาออนไลน์ สาขาวิชาระบบสารสนเทศ
        คณะบริหารธุรกิจ มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร
      </Typography>
      <Box sx={{ width: 500, maxWidth: "100%", marginTop: 2 }}>
        <ValidationTextField
          style={{ marginBottom: "10px" }}
          label="อีเมล"
          required
          variant="outlined"
          id="validation-outlined-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          endIcon={<LoginIcon />}
          disabled={open || password.length < 6}
        >
          {open ? "Processing. . ." : "เข้าสู่ระบบ"}
        </Button>
      </Stack>
    </CardActions>
  </form>
);

export default LoginForm;
