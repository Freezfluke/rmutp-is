import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import CreatePetition from "../components/CreatePetition";
import moment from "moment";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import data from "../mock.json";
import { nanoid } from "nanoid";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

//import getallapiPetitions
import { useState, useEffect } from "react";
import { allPetitions, deletePetition } from "../actions/petitions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";

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

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  fontSize: 22,
  padding: theme.spacing(0),
}));

const FontDiv = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  fontSize: 14,
  padding: theme.spacing(1),
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
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

const Petition = () => {
  const [open, setOpen] = useState(false);
  const [petitions, setPetitions] = useState([]);
  const [petitionsAppoveEnd, setPetitionsAppoveEnd] = useState([]);
  const [petitionsCancel, setPetitionsCancel] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const [owner, setOwner] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [statusTab, setStatusTab] = useState("ทั้งหมด");
  const [searchName, setSearchName] = useState("");

  const navigate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = petitions.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(petitions.length / postsPerPage); i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    loadAllPetitions();
  }, []);

  const handlePetitionDelete = async (petitionId) => {
    if (!window.confirm("คุณแน่ใจว่าจะลบแบบคำร้องนี้ใช่หรือไม่?")) return;
    deletePetition(auth.token, petitionId).then((res) => {
      toast.success("แบบคำร้องถูกลบเรียบร้อยแล้ว");
      loadAllPetitions();
    });
  };

  const cardCountUser = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          แบบคำร้องทั้งหมด
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {petitions.length}
          <Fab
            style={{
              backgroundColor: "blue",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <DocumentScannerIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );
  const cardCountTeacher = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          แบบคำร้องที่อนุมัติเสร็จสิ้นแล้ว
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {petitionsAppoveEnd.length}
          <Fab
            style={{
              backgroundColor: "green",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <AssignmentTurnedInIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const cardCountStudent = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          แบบคำร้องที่ถูกปฎิเสธ
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {petitionsCancel.length}
          <Fab
            style={{
              backgroundColor: "red",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <DocumentScannerIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const loadAllPetitions = async () => {
    let res = await allPetitions();
    if (user.role === "อาจารย์") {
      var owenTeacher = await res.data.filter((e) => {
        if (e.teacher.teacher === "") {
          return "";
        } else {
          return e.teacher.teacher.email === user.email;
        }
      });
      var filterStatus = await owenTeacher.filter((e) => {
        return (
          e.status === "แบบคำร้องถูกต้อง" ||
          e.status === "ที่ปรึกษาอนุมัติแล้ว" ||
          e.status === "หัวหน้าสาขาอนุมัติแล้ว"
        );
      });
      console.log("filterStatus", filterStatus);
      setPetitions(filterStatus);
      let allPetitionsAppove = await filterStatus.filter((e) => {
        return e.status === "หัวหน้าสาขาอนุมัติแล้ว";
      });
      setPetitionsAppoveEnd(allPetitionsAppove);
      let allPetitionsCancel = await filterStatus.filter((e) => {
        return e.status === "แบบคำร้องไม่ถูกต้อง";
      });
      setPetitionsCancel(allPetitionsCancel);
    }
    if (user.role === "นักศึกษา") {
      let owenRes = await res.data.filter((e) => {
        return e.email === user.email;
      });
      setPetitions(owenRes);
      let allPetitionsAppove = await owenRes.filter((e) => {
        return e.status === "หัวหน้าสาขาอนุมัติแล้ว";
      });
      setPetitionsAppoveEnd(allPetitionsAppove);
      let allPetitionsCancel = await owenRes.filter((e) => {
        return e.status === "แบบคำร้องไม่ถูกต้อง";
      });
      setPetitionsCancel(allPetitionsCancel);
    }
    if (user.role === "หัวหน้าสาขา") {
      let owenBranchhead = await res.data.filter((e) => {
        return e.branchHead.email === user.email;
      });
      var filterStatus = await owenBranchhead.filter((e) => {
        return (
          e.status === "ที่ปรึกษาอนุมัติแล้ว" ||
          e.status === "หัวหน้าสาขาอนุมัติแล้ว"
        );
      });
      setPetitions(filterStatus);
      let allPetitionsAppove = await filterStatus.filter((e) => {
        return e.status === "หัวหน้าสาขาอนุมัติแล้ว";
      });
      setPetitionsAppoveEnd(allPetitionsAppove);
      let allPetitionsCancel = await filterStatus.filter((e) => {
        return e.status === "แบบคำร้องไม่ถูกต้อง";
      });
      setPetitionsCancel(allPetitionsCancel);
    }
    if (user.role === "เจ้าหน้าที่สาขา") {
      let owenStaff = await res.data.filter((e) => {
        return res.data;
      });
      setPetitions(owenStaff);
      let allPetitionsAppove = await owenStaff.filter((e) => {
        return e.status === "หัวหน้าสาขาอนุมัติแล้ว";
      });
      setPetitionsAppoveEnd(allPetitionsAppove);
      let allPetitionsCancel = await owenStaff.filter((e) => {
        return e.status === "แบบคำร้องไม่ถูกต้อง";
      });
      setPetitionsCancel(allPetitionsCancel);
    }
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
                  <Div>{"แบบคำร้องทั้งหมด"}</Div>
                </TableCell>
                <TableCell colSpan={1}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ทังหมด
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
                      <MenuItem value="รอการตรวจสอบ">รอการตรวจสอบ</MenuItem>
                      <MenuItem value="แบบคำร้องถูกต้อง">
                        แบบคำร้องถูกต้อง
                      </MenuItem>
                      <MenuItem value="แบบคำร้องไม่ถูกต้อง">
                        แบบคำร้องไม่ถูกต้อง
                      </MenuItem>
                      <MenuItem value="ที่ปรึกษาอนุมัติแล้ว">
                        ที่ปรึกษาอนุมัติแล้ว
                      </MenuItem>
                      <MenuItem value="หัวหน้าสาขาอนุมัติแล้ว">
                        หัวหน้าสาขาอนุมัติแล้ว
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
                {user.role === "นักศึกษา" ? (
                  <TableCell colSpan={1} align="right">
                    <BootstrapTooltip
                      title="เพิ่มแบบคำร้อง"
                      onClick={handleClickOpen}
                    >
                      <Fab color="primary" aria-label="add">
                        <NoteAddIcon sx={{ fontSize: 30 }} color="white" />
                      </Fab>
                    </BootstrapTooltip>
                  </TableCell>
                ) : (
                  <TableCell colSpan={1} align="right"></TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell width={250} align="center">
                  ชื่อแบบคำร้อง
                </TableCell>
                <TableCell width={150} align="center">
                  วันที่ส่งแบบคำร้อง
                </TableCell>
                <TableCell width={250} align="center">
                  ส่งจาก
                </TableCell>
                <TableCell width={200} align="center">
                  ห้อง/ระดับชั้น
                </TableCell>
                <TableCell width={200} align="center">
                  สถานะ
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
                    val.status.toLowerCase().includes(statusTab.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .filter((value) => {
                  if (
                    value.from.name
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) ||
                    value.from.lastname
                      .toLowerCase()
                      .includes(searchName.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((pettion) => (
                  <TableRow
                    key={pettion._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {pettion.petitionName}
                    </TableCell>
                    <TableCell align="center">
                      {moment(
                        pettion.createdAt,
                        moment.HTML5_FMT.DATETIME_LOCAL_MS
                      )
                        .add(543, "year")
                        .format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {pettion.from.prefix}
                      {pettion.from.name} {pettion.from.lastname}
                    </TableCell>
                    <TableCell align="center">
                      {pettion.from.classRoom.classRoom}
                    </TableCell>
                    {pettion.status === "รอการตรวจสอบ" ? (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#ff9900",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    ) : pettion.status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#009933",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    ) : pettion.status === "แบบคำร้องถูกต้อง" ? (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#ff9900",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    ) : pettion.status === "ที่ปรึกษาอนุมัติแล้ว" ? (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#ff9900",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#ff3300",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    )}

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          sx={{ color: "orange" }}
                          aria-label="delete"
                          onClick={() =>
                            navigate(`/petition/edit/${pettion._id}`)
                          }
                        >
                          <EditIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          aria-label="delete"
                          onClick={() => handlePetitionDelete(pettion._id)}
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
        <CreatePetition handleClose={handleClose} open={open} />
      </div>
    </>
  );
};

export default Petition;
