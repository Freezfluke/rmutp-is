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
import { allUser, deleteUser, read } from "../actions/auth";
import { allClassRoom, readClassroom } from "../actions/classRooms.js";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
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
  const [openReload, setOpenReload] = useState(false);
  const [alluser, setAlluser] = useState([]);
  const [allclassRoom, setAllclassRoom] = useState([]);
  const [allTeacher, setAllTeacher] = useState([]);
  const [allStudent, setAllStudent] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [statusTab, setStatusTab] = useState("");
  const [searchName, setSearchName] = useState("");

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
          ????????????????????????????????????????????????
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
          ??????????????????????????????????????????
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
          ?????????????????????????????????????????????
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
    loadAllUsers();
  }, []);

  const handleUserDelete = async (userId) => {
    if (!window.confirm("????????????????????????????????????????????????????????????????????????????????????????????????????????????????")) return;
    deleteUser(auth.token, userId).then((res) => {
      toast.success("?????????????????????????????????????????????????????????????????????????????????");
      loadAllUsers();
    });
  };

  const loadAllUsers = async () => {
    setOpenReload(true);
    var setupUsers = [];
    let resUsers = await allUser();
    let resClassRoom = await allClassRoom();
    let desResUsers = [...resUsers.data];
    let desResRoom = [...resClassRoom.data];
    desResUsers.map(async (user) => {
      let _itemTeacher = await desResRoom.filter((e) => {
        return user._id === e.teacher;
      })[0];
      let _itemStudent = await desResRoom.filter((e) => {
        return user.classRoom === e._id;
      })[0];
      let ReloadItemTeacher = await _itemTeacher;
      let ReloadItemStudent = await _itemStudent;
      console.log("ReloadItemStudent", ReloadItemStudent);
      console.log("reloadItem", ReloadItemTeacher);
      setupUsers.push({
        _id: user._id,
        email: user.email,
        studentCard: user.studentCard ? user.studentCard : "",
        password: user.password,
        name: user.name,
        lastname: user.lastname,
        mobile: user.mobile,
        role: user.role,
        prefix: user.prefix,
        class: user.classRoom ? ReloadItemStudent : ReloadItemTeacher,
      });
      let ReloadAlluser = await setupUsers.filter((e) => {
        return e;
      });
      setAlluser(ReloadAlluser);
      let resTeacher = await ReloadAlluser.filter((e) => {
        return e.role === "?????????????????????";
      });
      setAllTeacher(resTeacher);
      let resStudent = await ReloadAlluser.filter((e) => {
        return e.role === "????????????????????????";
      });
      setAllStudent(resStudent);
      setOpenReload(false);
    });
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
                  <Div>{"??????????????????????????????????????????????????????"}</Div>
                </TableCell>
                <TableCell colSpan={1}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ?????????????????????
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={statusTab}
                      defaultValue="?????????????????????"
                      label="?????????????????????"
                      onChange={(event) => setStatusTab(event.target.value)}
                    >
                      <MenuItem value="?????????????????????">?????????????????????</MenuItem>
                      <MenuItem value="?????????????????????">?????????????????????</MenuItem>
                      <MenuItem value="????????????????????????">????????????????????????</MenuItem>
                      <MenuItem value="?????????????????????????????????">?????????????????????????????????</MenuItem>
                      <MenuItem value="?????????????????????????????????????????????">
                        ?????????????????????????????????????????????
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell colSpan={1}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="???????????????????????????-?????????????????????"
                      inputProps={{ "aria-label": "search" }}
                      onChange={(event) => {
                        setSearchName(event.target.value);
                      }}
                    />
                  </Search>
                </TableCell>
                <TableCell colSpan={1} align="right">
                  <BootstrapTooltip
                    title="??????????????????????????????????????????"
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
                  ???????????????
                </TableCell>
                <TableCell width={300} align="center">
                  ????????????-?????????????????????
                </TableCell>
                <TableCell width={300} align="center">
                  ?????????????????????
                </TableCell>
                <TableCell width={200} align="center">
                  ???????????????????????????
                </TableCell>

                <TableCell width={120} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPosts
                .filter((val) => {
                  if (statusTab === "?????????????????????") {
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
                      {user.class ? <span>{user.class.classRoom}</span> : "-"}
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          sx={{ color: "orange" }}
                          aria-label="edit"
                          onClick={() => navigate(`/users/edit/${user._id}`)}
                        >
                          <EditIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                        {/* <IconButton
                          sx={{ color: "red" }}
                          aria-label="delete"
                          onClick={() => handleUserDelete(user._id)}
                        >
                          <DeleteIcon sx={{ fontSize: 30 }} />
                        </IconButton> */}
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
