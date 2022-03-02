import * as React from "react";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import { Button, CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Card from "@mui/material/Card";
import "./CreatePetition.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

import { allUser } from "../actions/auth";

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

const ClassRoomEditForm = (props) => {
  const [allTeacher, setAllTeacher] = useState([0]);
  const {
    teacher,
    setTeacher,
    classRoom,
    setClassRoom,
    handleChangeSelect,
    handleSubmit,
  } = props;

  useEffect(() => {
    // console.log(match.params.petitionId);
    loadAllTeacher();
  }, []);

  const loadAllTeacher = async () => {
    const user = await allUser();
    console.log("user", user);
    let teacher = await user.data.filter((teacher) => {
      return teacher.role === "อาจารย์";
    });
    console.log("teacher", teacher);
    setAllTeacher(teacher);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "1000px",
          marginLeft: "220px",
        }}
      >
        <Card
          sx={{
            width: "100%",
            mt: 5,
          }}
        >
          <CardHeader title="แก้ไขชั้นเรียน" subheader="ข้อมูลชั้นเรียน" />
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
                      value={teacher}
                    >
                      {allTeacher.map((datateacher, index) => (
                        <MenuItem key={index} value={datateacher}>
                          {datateacher.name} {datateacher.lastname}
                        </MenuItem>
                      ))}
                      <MenuItem
                        disabled
                        hidden
                        value={teacher}
                        key={teacher._id}
                      >
                        {teacher.name} {teacher.lastname}
                      </MenuItem>
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
      <br />
    </form>
  );
};
export default ClassRoomEditForm;
