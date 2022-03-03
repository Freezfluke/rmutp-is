import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import CreateUser from "../components/CreateUser";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

//import getallapiPetitions
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allUser, deleteUser } from "../actions/auth";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  fontSize: 22,
  padding: theme.spacing(0),
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

const UsersList = () => {
  const [open, setOpen] = useState(false);
  const [alluser, setAlluser] = useState([]);
  const [allTeacher, setAllTeacher] = useState([]);
  const [allStudent, setAllStudent] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [statusTab, setStatusTab] = useState("");
  const [searchName, setSearchName] = useState("");
  const [openReload, setOpenReload] = useState(false);

  // const { user } = auth;
  const [owner, setOwner] = useState(false);
  const navigate = useNavigate();

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = alluser.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(alluser.length / postsPerPage); i++) {
    pageNumber.push(i);
  }

  const cardCountUser = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ผู้ใช้งานทั้งหมด
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {alluser.length}
          <Fab
            style={{
              backgroundColor: "blue",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <PeopleIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );
  const cardCountTeacher = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          อาจารย์ทั้งหมด
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {allTeacher.length}
          <Fab
            style={{
              backgroundColor: "green",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const cardCountStudent = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          นักศึกษาทั้งหมด
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {allStudent.length}
          <Fab
            style={{
              backgroundColor: "orange",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    loadAllPetitions();
  }, []);

  const handleUserDelete = async (userId) => {
    if (!window.confirm("คุณแน่ใจว่าจะลบแบบคำร้องนี้ใช่หรือไม่?")) return;
    deleteUser(auth.token, userId).then((res) => {
      toast.success("ผู้ใช้งานถูกลบเรียบร้อยแล้ว");
      loadAllPetitions();
    });
  };

  const loadAllPetitions = async () => {
    setOpenReload(true);
    let res = await allUser();
    console.log("res", res);
    setAlluser(res.data);
    let resTeacher = await res.data.filter((e) => {
      return e.role === "อาจารย์";
    });
    setAllTeacher(resTeacher);
    let resStudent = await res.data.filter((e) => {
      return e.role === "นักศึกษา";
    });
    setAllStudent(resStudent);
    setOpenReload(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openReload}
        >
          {" "}
          <CircularProgress color="inherit" />
        </Backdrop>
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
          <Box
            sx={{
              width: "300px",
              height: "180px",
            }}
          >
            <Card variant="outlined">{cardCountTeacher}</Card>
          </Box>
          <Box
            sx={{
              width: "300px",
              height: "180px",
            }}
          >
            <Card variant="outlined">{cardCountStudent}</Card>
          </Box>
        </div>
        {/* <pre>{JSON.stringify(petitions, null, 4)}</pre> */}
        <TableContainer component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Div>{"ตารางแสดงผู้ใช้งานทั้งหมด"}</Div>
                </TableCell>
                <TableCell colSpan={1}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ทั้งหมด
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={statusTab}
                      defaultValue="ทั้งหมด"
                      label="ทั้งหมด"
                      onChange={(event) => setStatusTab(event.target.value)}
                    >
                      <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
                      <MenuItem value="อาจารย์">อาจารย์</MenuItem>
                      <MenuItem value="นักศึกษา">นักศึกษา</MenuItem>
                      <MenuItem value="หัวหน้าสาขา">หัวหน้าสาขา</MenuItem>
                      <MenuItem value="เจ้าหน้าที่สาขา">
                        เจ้าหน้าที่สาขา
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell colSpan={2}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="ค้นหาชื่อ-นามสกุล"
                      inputProps={{ "aria-label": "search" }}
                      onChange={(event) => {
                        setSearchName(event.target.value);
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
                      <PersonAddIcon sx={{ fontSize: 30 }} color="white" />
                    </Fab>
                  </BootstrapTooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={80} align="center">
                  ลำดับ
                </TableCell>
                <TableCell width={300} align="center">
                  ชื่อ-นามสกุล
                </TableCell>
                <TableCell width={300} align="center">
                  ตำแหน่ง
                </TableCell>
                <TableCell width={200} align="center">
                  ห้อง/ระดับชั้น
                </TableCell>

                <TableCell width={120} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPosts
                .filter((val) => {
                  if (statusTab === "ทั้งหมด") {
                    return val;
                  } else if (
                    val.role.toLowerCase().includes(statusTab.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .filter((value) => {
                  if (
                    value.name
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) ||
                    value.lastname
                      .toLowerCase()
                      .includes(searchName.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((user, index) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {++index}
                    </TableCell>
                    <TableCell align="center">
                      {user.prefix}
                      {user.name} {user.lastname}
                    </TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">
                      {user.classRoom.classRoom ? (
                        <p>{user.classRoom.classRoom}</p>
                      ) : (
                        "-"
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          sx={{ color: "orange" }}
                          aria-label="delete"
                          onClick={() => navigate(`/users/edit/${user._id}`)}
                        >
                          <EditIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          aria-label="delete"
                          onClick={() => handleUserDelete(user._id)}
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
        <CreateUser handleClose={handleClose} open={open} />
      </div>
    </>
  );
};

export default UsersList;
