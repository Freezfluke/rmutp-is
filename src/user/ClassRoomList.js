import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";

import SearchIcon from "@mui/icons-material/Search";

//import getallapiPetitions
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allUser } from "../actions/auth.js";
import { allClassRoom, deleteClassRoom } from "../actions/classRooms.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CreateClassRoom from "../components/CreateClassRoom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import ClassIcon from "@mui/icons-material/Class";
import InputBase from "@mui/material/InputBase";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  fontSize: 22,
  padding: theme.spacing(0),
}));
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ClassRoom = () => {
  const [open, setOpen] = useState(false);
  const [allTeacher, setAllTeacher] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  const [allclassRoom, setAllclassRoom] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchClassRoom, setSearchClassRoom] = useState("");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const { user } = auth;
  const [owner, setOwner] = useState(false);
  const navigate = useNavigate();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allclassRoom.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allclassRoom.length / postsPerPage); i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    loadAllTeacher();
  }, []);

  const cardCountUser = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ห้องทั้งหมด
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {allclassRoom.length}
          <Fab
            style={{
              backgroundColor: "blue",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <ClassIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const loadAllTeacher = async () => {
    let res = await allUser();
    let resRoom = await allClassRoom();
    let allresRoom = [...resRoom.data];
    console.log("res", res);

    let teacher = await res.data.filter((teacher) => {
      return teacher.role === "อาจารย์";
    });
    console.log("teacher", teacher);
    setAllTeacher(teacher);
    let allTeacher = [...teacher];
    await allTeacher.map(async (data) => {
      let dataTeacher;
      dataTeacher = await allresRoom.filter((dataTeacher) => {
        return data.teacher === dataTeacher.email;
      });
      setAllclassRoom(dataTeacher);
      console.log(dataTeacher);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClasRoomDelete = async (classRoomId) => {
    if (!window.confirm("คุณแน่ใจว่าจะลบชั้นเรียนนี้ใช่หรือไม่?")) return;
    deleteClassRoom(auth.token, classRoomId).then((res) => {
      toast.success("ชั้นเรียนถูกลบเรียบร้อยแล้ว");
      loadAllTeacher();
    });
  };

  return (
    <>
      <div
        style={{
          marginLeft: "200px",
          marginTop: "30px",
          display: "block",
          justifyContent: "center",
          width: "75%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              width: "300px",
              height: "180px",
            }}
          >
            <Card variant="outlined">{cardCountUser}</Card>
          </Box>
        </div>
        {/* <pre>{JSON.stringify(petitions, null, 4)}</pre> */}
        <TableContainer component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Div>{"ตารางแสดงห้องเรียนทั้งหมด"}</Div>
                </TableCell>

                <TableCell colSpan={2}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="ค้นหาชื่อห้องระดับชั้น"
                      inputProps={{ "aria-label": "search" }}
                      onChange={(event) => {
                        setSearchClassRoom(event.target.value);
                      }}
                    />
                  </Search>
                </TableCell>
                <TableCell colSpan={1} align="right">
                  <BootstrapTooltip
                    title="เพิ่มแบบคำร้อง"
                    onClick={handleClickOpen}
                  >
                    <Fab color="primary" aria-label="add">
                      <AddIcon sx={{ fontSize: 30 }} color="white" />
                    </Fab>
                  </BootstrapTooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={80} align="center">
                  ลำดับ
                </TableCell>

                <TableCell width={800} align="center">
                  ห้อง/ระดับชั้น
                </TableCell>
                <TableCell width={800} align="center">
                  อาจารย์ประจำชั้น
                </TableCell>

                <TableCell width={800} align="center">
                  {" "}
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPosts
                .filter((val) => {
                  if (searchClassRoom === "ทั้งหมด") {
                    return val;
                  } else if (
                    val.classRoom
                      .toLowerCase()
                      .includes(searchClassRoom.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((classRoom, index) => (
                  <TableRow
                    key={classRoom._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {++index}
                    </TableCell>
                    <TableCell align="center">{classRoom.classRoom}</TableCell>

                    <TableCell align="center">
                      {classRoom.teacher.prefix} {classRoom.teacher.name}{" "}
                      {classRoom.teacher.lastname}
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          sx={{ color: "orange" }}
                          onClick={() =>
                            navigate(`/classrooms/edit/${classRoom._id}`)
                          }
                        >
                          <EditIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          aria-label="delete"
                          onClick={() => handleClasRoomDelete(classRoom._id)}
                        >
                          <DeleteIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <nav style={{ marginTop: 10 }}>
          <ul className="pagination">
            {pageNumber.map((number) => (
              <li
                style={{ marginRight: 10 }}
                key={number}
                className="page-item"
              >
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <CreateClassRoom
          loadAllTeacher={loadAllTeacher}
          handleClose={handleClose}
          open={open}
          allTeacher={allTeacher}
        />
      </div>
    </>
  );
};

export default ClassRoom;
