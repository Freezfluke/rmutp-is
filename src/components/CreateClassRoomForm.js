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
import Slide from "@mui/material/Slide";
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
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

const Input = styled("input")({
  display: "none",
});

const CreateClassRoomForm = (props) => {
  const {
    handleSubmit,
    handleChangeSelect,
    setClassRoom,
    classRoom,
    teacher,
    allTeacher,
    loadAllTeacher,
  } = props;
  console.log(allTeacher);
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
              สร้างชั้นเรียนใหม่
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ width: "60%", mt: 5 }}>
            <CardHeader
              title="สร้างชั้นเรียนใหม่"
              subheader="ข้อมูลชั้นเรียน"
            />
            <CardContent>
              <Grid container>
                <Grid item xs={11}>
                  {" "}
                  <Box sx={{ width: "100%", alignContent: "center" }}>
                    <ValidationTextField
                      style={{ marginBottom: "10px" }}
                      label="ชั้นเรียน"
                      type="text"
                      required
                      variant="outlined"
                      id="validation-outlined-input"
                      fullWidth
                      value={classRoom}
                      name="classRoom"
                      onChange={(e) => setClassRoom(e.target.value)}
                    />

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {" "}
                        อาจารย์ประจำชั้น
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="อาจารย์"
                        name="teacher"
                        style={{ marginBottom: "10px" }}
                        onChange={handleChangeSelect}
                        value={teacher._id}
                      >
                        {allTeacher.map((teacher) => (
                          <MenuItem key={teacher._id} value={teacher._id}>
                            {teacher.prefix}
                            {teacher.name} {teacher.lastname}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

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
      </Dialog>
    </form>
  );
};

export default CreateClassRoomForm;
